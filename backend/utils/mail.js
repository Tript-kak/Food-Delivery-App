import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtpMail = async ({to,otp}) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Your OTP for Password Reset",
    text: `Your OTP for password reset is: ${otp}. It is valid for 5 minutes. If you did not request this, please ignore this email.`,
    html: `<p>Your OTP for password reset is: <b>${otp}</b>. It is valid for 5 minutes. If you did not request this, please ignore this email.</p>`,
  })
}