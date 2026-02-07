import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Transporter configuration
// Replace these with your actual email credentials in .env
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your preferred service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // 1. Send notification email to the portfolio owner
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Your email address
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #00f0ff;">New Message Received</h2>
          <p><strong>From:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    });

    // 2. Send professional auto-reply message to the visitor
    await transporter.sendMail({
      from: `"Your Name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for reaching out!`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; line-height: 1.6; color: #333;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00f0ff; margin: 0;">Thank You!</h1>
          </div>
          <p>Hello <strong>${name}</strong>,</p>
          <p>Thank you for reaching out through my portfolio. I've received your message regarding <strong>"${subject}"</strong> and I'm looking forward to reading it.</p>
          <p>This is an automated confirmation to let you know that your message is safely in my inbox. I typically respond to all inquiries within 24-48 hours.</p>
          <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <p style="margin: 0; font-size: 0.9em; color: #666;">
              <strong>A quick recap of your message:</strong><br>
              ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}
            </p>
          </div>
          <p>In the meantime, feel free to check out my latest projects or connect with me on LinkedIn.</p>
          <p>Best regards,<br><strong>Your Professional Name</strong></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 0.8em; color: #999; text-align: center;">
            This is an automated response. Please do not reply directly to this email.
          </p>
        </div>
      `,
    });

    res.status(200).json({ message: 'Messages sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
