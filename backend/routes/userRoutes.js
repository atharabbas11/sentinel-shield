// routes/useRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { registerUser, authUser, getUserProfile, getUserId, updateBackgroundImage} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const asyncHandler = require('express-async-handler');


// Register, login, profile routes
router.post('/', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.get('/userid', protect, getUserId);


/* forgot password and reset password */

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    // user: 'testingmyproject101@gmail.com',
    // pass: 'avsx wcuv vxln ommq',  // Replace with your app-specific password
  },
});


router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' }); // if user not found 

    const otp = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false });
    user.resetPasswordToken = crypto.createHash('sha256').update(otp).digest('hex');
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // basic code for testing
    // const mailOptions = {
    //   to: user.email,
    //   from: process.env.FROM_EMAIL,
    //   subject: 'Password Reset OTP',
    //   text: `Your OTP for password reset is ${otp}. It is valid for 15 minutes.`,
    // };

    // with logo in text and added html format
    const mailOptions = {
      to: user.email,
      from: process.env.FROM_EMAIL,
      subject: 'Password Reset OTP',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 2px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
              <div style="text-align: center; padding-bottom: 20px;">
                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold cursor-pointer">Sentinel Shield</h1>
                <hr style="border: 0; height: 1px; background: #ddd; margin: 20px auto; max-width: 50%;">
              </div>
              <div style="text-align: center;">
                <h2 style="color: #4CAF50; font-size: 20px; margin-top: 0;">Password Reset Request</h2>
                <p style="font-size: 16px; line-height: 1.5;">Hello &#128075;,</p>
                <p style="font-size: 16px; line-height: 1.5;">Your OTP for password reset is <br><span style="font-size: 24px; font-weight: bold; color: #333;">${otp}</span><br>It is valid for 15 minutes.</p>
                <p style="font-size: 16px; line-height: 1.5; color: gray;">If you didn't request a password reset, you can safely ignore this email.</p>
              </div>
              <div style="text-align: center; padding-top: 20px; font-size: 14px; color: #777;">
                <hr style="border: 0; height: 1px; background: #ddd; margin: 20px auto; max-width: 90%; width: 90%;">
                <p style="margin: 10px 0;">Best regards,</p>
                <p style="margin: 10px 0;">Sentinel Shield Team</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('Failed to send OTP:', err);
        return res.status(500).json({ message: 'Failed to send OTP' }); // if failed to send otp 
      }
      res.status(200).json({ message: 'OTP sent successfully' }); // if otp deliverd succesfully
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' }); // if server error 500 internal server error, 503 service unavailable, 502 bad gateway
  }
});


router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    if (hashedOtp !== user.resetPasswordToken || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


/* account info update profile, update image, email change */

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Add 'protect' middleware to authenticate the user
router.post('/upload-profile-image', protect, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Ensure 'req.user' is populated from the 'protect' middleware
    const userId = req.user._id;

    // Update user's profile image path in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user already has a profile image and delete it
    if (user.profileImage) {
      const oldImagePath = path.join(__dirname, '..', user.profileImage);
      // Debugging 
      // console.log('Attempting to delete old image at path:', oldImagePath);

      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error('Error deleting old profile image:', err);
        } else {
          // Debugging 
          // console.log('Successfully deleted old profile image');
        }
      });
    }

    // Update the user's profile image path and save
    user.profileImage = req.file.path;
    await user.save();

    res.json({ profileImage: req.file.path });
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.put('/update-name', protect, async (req, res) => {
  const { name } = req.body; // Get the new name from the request body

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Invalid name' });
  }

  try {
    // Ensure 'req.user' is populated from the 'protect' middleware
    const userId = req.user._id;

    // Find the user by ID and update the name
    const user = await User.findByIdAndUpdate(userId, { name: name.trim() }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Name updated successfully', user });
  } catch (error) {
    console.error('Error updating name:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Send OTP email
const sendOtpEmail = async (to, otp) => {

  // basic code for testing
  // const mailOptions = {
  //   to,
  //   from: process.env.FROM_EMAIL,
  //   subject: 'Email Change OTP',
  //   text: `Your OTP for changing email is ${otp}. It is valid for 15 minutes.`,
  // };

 
  // with logo in text and added html format
  const mailOptions = {
    to,
    from: process.env.FROM_EMAIL, // Use environment variable for the from email address
    subject: 'Email Change OTP',
    html: `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 2px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
          <div style="text-align: center; padding-bottom: 20px;">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold cursor-pointer">Sentinel Shield</h1>
            <hr style="border: 0; height: 1px; background: #ddd; margin: 20px auto; max-width: 50%;">
          </div>
          <div style="text-align: center;">
            <h2 style="color: #4CAF50; font-size: 20px; margin-top: 0;">Email Change Request</h2>
            <p style="font-size: 16px; line-height: 1.5;">Hello &#128075;,</p>
            <p style="font-size: 16px; line-height: 1.5;">Your OTP for changing email is <br><span style="font-size: 24px; font-weight: bold; color: #333;">${otp}</span><br>It is valid for 15 minutes.</p>
            <p style="font-size: 16px; line-height: 1.5; color: gray;">If you didn't request a email change, you can safely ignore this email.</p>
          </div>
          <div style="text-align: center; padding-top: 20px; font-size: 14px; color: #777;">
            <hr style="border: 0; height: 1px; background: #ddd; margin: 20px auto; max-width: 90%; width: 90%;">
            <p style="margin: 10px 0;">Best regards,</p>
            <p style="margin: 10px 0;">Sentinel Shield Team</p>
          </div>
        </div>
      </body>
    </html>
    `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully');
  } catch (error) {
    console.error('Failed to send OTP:', error);
    throw new Error('Failed to send OTP');
  }
};


// Request email change
router.post('/request-email-change', protect, async (req, res) => {
  const { newEmail } = req.body;

  if (!newEmail || !/^\S+@\S+\.\S+$/.test(newEmail)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate OTP for old email
    const otp = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false });
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    console.log('Received OTP:', otp);
    console.log('Hashed OTP:', hashedOtp);

    user.emailChangeToken = hashedOtp;
    user.emailChangeExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    user.newEmail = newEmail; // Store new email temporarily

    console.log('Before saving:', user); // to understand any errors
    await user.save();
    console.log('After saving:', user); // to understand any errors

    // Send OTP to old email
    await sendOtpEmail(user.email, otp);

    res.status(200).json({ message: 'OTP sent to old email address for verification' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Verify OTP and update email
router.post('/verify-email-change', protect, async (req, res) => {
  const { otp } = req.body;

  try {
    if (!otp) return res.status(400).json({ message: 'OTP is required' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    console.log('Received OTP:', otp);
    console.log('Hashed OTP:', hashedOtp);
    console.log('Stored OTP:', user.emailChangeToken);

    if (hashedOtp !== user.emailChangeToken || user.emailChangeExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Check if new email is already in use
    const emailInUse = await User.findOne({ email: user.newEmail });
    if (emailInUse) return res.status(400).json({ message: 'Email address is already in use' });

    user.email = user.newEmail; // Update to new email
    user.emailChangeToken = undefined;
    user.emailChangeExpires = undefined;
    user.newEmail = undefined; // Clear the new email field
    await user.save();

    res.status(200).json({ message: 'Email updated successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Sign-out route
router.post('/signout', asyncHandler(async (req, res) => {
  try {
    // Token to be invalidated can be sent in the request headers or body
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null;

    if (token) {
      console.log('Token to be blacklisted:', token);
    }
    res.status(200).json({ message: 'Sign-out successful' });
  } catch (error) {
    console.error('Error during sign-out:', error);
    res.status(500).json({ message: 'Server error' });
  }
}));

// Route to update background image
router.post('/update-background-image', protect, updateBackgroundImage);

module.exports = router;
