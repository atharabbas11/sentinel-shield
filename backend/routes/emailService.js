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
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            margin: 0;
                            padding: 2px;
                            background-color: #f4f4f4;
                        }
                        
                        .div-main {
                            max-width: 600px;
                            margin: 20px auto;
                            background: #fff;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            padding: 20px;
                        }
                        
                        .div-1 {
                            text-align: center;
                            padding-bottom: 20px;
                            .hr1 {
                                border: 0;
                                height: 1px;
                                background: #ddd;
                                margin: 20px auto;
                                max-width: 50%;
                            }
                        }
                        
                        .h11 {
                            font-size: 1.25rem;
                            font-weight: 700;   
                            cursor: pointer;    
                        }
                        
                        @media (min-width: 768px) {
                            .h11 {
                                font-size: 1.875rem; 
                            }
                        }
                        
                        @media (min-width: 1024px) {
                            .h11 {
                                font-size: 2.25rem; 
                            }
                        }

                        
                        .div-2 {
                            text-align: center;
                            .h22 {
                                color: #4CAF50;
                                font-size: 20px;
                                margin-top: 0;
                            }
                            .p2 {
                                font-size: 16px;
                                line-height: 1.5;
                            }
                            .p22 {
                                font-size: 16px;
                                line-height: 1.5;
                                color: gray;
                            }
                            .a2{
                                display: inline-block;
                                padding: 10px 20px;
                                font-size: 16px;
                                font-weight: bold;
                                color: #ffffff;
                                background-color: #1a73e8;
                                text-decoration: none;
                                border-radius: 5px;
                                text-align: center;
                            }
                        }
                        
                        .div-3 {
                            text-align: center;
                            padding-top: 20px;
                            font-size: 14px;
                            color: #777;
                            .hr3 {
                                border: 0;
                                height: 1px;
                                background: #ddd;
                                margin: 20px auto;
                                max-width: 90%;
                                width: 90%;
                            }
                            .p3 {
                                margin: 10px 0;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="div-main">
                        <div class="div-1">
                            <h1 class="h11">Sentinel Shield</h1>
                            <hr class="hr1">
                        </div>
                        <div class="div-2">
                            <h2 class="h22">Registration Successful</h2>
                            <p class="p2">Hello ${user.name} &#128075;,</p>
                            <p class="p2">Thank you for registering with Sentinel Shield.</p>
                            <p class="p2">You can now log in using your credentials by clicking the button below:</p>
                            <a href="https://sentinel-shield.onrender.com/login" class="a2">Log In</a>
                            <p class="p22">If you did not register for this service, please ignore this email.</p>
                        </div>
                        <div class="div-3"v>
                            <hr class="hr3">
                            <p class="p3">Best regards,</p>
                            <p class="p3">Sentinel Shield Team</p>
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
