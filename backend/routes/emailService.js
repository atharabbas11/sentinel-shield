// emailService.js

const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
const sendRegistrationEmail = async (user) => {
    const mailOptions = {
        to: user.email,
        from: process.env.FROM_EMAIL,
        subject: 'Registration Successful',
        html: `
             <html>
                <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 2px; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
                        <div style="text-align: center; padding-bottom: 20px;">
                            <h1 style="text-xl md:text-3xl lg:text-4xl font-bold cursor-pointer">Sentinel Shield</h1>
                            <hr style="border: 0; height: 1px; background: #ddd; margin: 20px auto; max-width: 50%;">
                        </div>
                        <div style="text-align: center;">
                            <h2 style="color: #4CAF50; font-size: 20px; margin-top: 0;">Registration Successful</h2>
                            <p style="font-size: 16px; line-height: 1.5;">Hello ${user.name} &#128075;,</p>
                            <p style="font-size: 16px; line-height: 1.5;">Thank you for registering with Sentinel Shield.</p>
                            <p style="font-size: 16px; line-height: 1.5;">You can now log in using your credentials by clicking the button below:</p>
                            <a href="https://sentinel-shield.onrender.com/login" style="display: inline-block; padding: 10px 20px; font-size: 16px; font-weight: bold; color: #ffffff; background-color: #1a73e8; text-decoration: none; border-radius: 5px; text-align: center;">Log In</a>
                            <p style="font-size: 16px; line-height: 1.5; color: gray;">If you did not register for this service, please ignore this email.</p>
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
        // console.log('Registration email sent successfully');
    } catch (error) {
        // console.error('Failed to send registration email:', error);
        throw new Error('Failed to send registration email');
    }
};

module.exports = { sendRegistrationEmail };
