const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email transporter configuration
// For Gmail: You'll need to generate an App Password (not your regular password)
// For other emails: Update with your email service credentials
const transporter = nodemailer.createTransport({
  service: 'gmail', // Change if using different email service
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

// Test email connection
transporter.verify((error, success) => {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email service ready');
  }
});

// Submit entry endpoint
app.post('/api/submit-entry', async (req, res) => {
  try {
    const { date, country, topic, description, significance, imageUrl } = req.body;

    // Validate required fields
    if (!date || !country || !topic || !description || !significance) {
      return res.status(400).json({ 
        message: 'Missing required fields' 
      });
    }

    // Format the email content
    const emailContent = `
      <h2>New History Tree Entry Submission</h2>
      <hr />
      
      <h3>Entry Details:</h3>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Topic:</strong> ${topic}</p>
      
      <h3>Description:</h3>
      <p>${description}</p>
      
      <h3>Historical Significance:</h3>
      <p>${significance}</p>
      
      ${imageUrl ? `<h3>Image Source:</h3><p><a href="${imageUrl}">${imageUrl}</a></p>` : '<h3>Image:</h3><p>No image provided</p>'}
      
      <hr />
      <p><em>Submitted via History Tree Calendar - ${new Date().toLocaleString()}</em></p>
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@historytree.com',
      to: process.env.SUBMISSION_EMAIL || 'example@duck.com',
      subject: `New submission - ${date}`,
      html: emailContent,
      replyTo: process.env.REPLY_EMAIL || process.env.EMAIL_USER
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: 'Entry submitted successfully',
      submittedDate: new Date()
    });

  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ 
      message: 'Failed to submit entry',
      error: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Backend is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`History Tree Backend running on http://localhost:${PORT}`);
  console.log(`Email submissions will be sent to: ${process.env.SUBMISSION_EMAIL || 'example@duck.com'}`);
});
