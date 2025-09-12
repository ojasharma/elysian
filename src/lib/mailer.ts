// lib/mailer.ts

import nodemailer from 'nodemailer';

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER, // Your email user
        pass: process.env.SMTP_PASS, // Your email password
    },
});

export const sendOtpEmail = async (email: string, otp: string) => {
     console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('SMTP_USER:', process.env.SMTP_USER);
    try {
        const mailOptions = {
            from: `Your App Name <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Your Verification Code',
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
                    <h2>Email Verification</h2>
                    <p>Thank you for registering. Please use the following One-Time Password (OTP) to complete your sign up process.</p>
                    <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; background: #f2f2f2; padding: 10px; border-radius: 5px;">${otp}</p>
                    <p>This OTP is valid for 10 minutes.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully');
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email.');
    }
};