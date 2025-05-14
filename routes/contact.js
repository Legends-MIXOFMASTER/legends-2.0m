const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');
const EMAIL_TO = process.env.CONTACT_EMAIL || 'info@houselegends.com';
const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL_USER, pass: EMAIL_PASS }
});

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message, website } = req.body; // 'website' is honeypot
  if (website) return res.status(400).json({ error: 'Spam detected' });
  if (!name || !email || !message) return res.status(400).json({ error: 'All fields required' });
  // Store in DB
  await require('../db/contact').saveMessage({ name, email, message, date: new Date() });
  // Send email
  await transporter.sendMail({
    from: EMAIL_USER,
    to: EMAIL_TO,
    subject: `Contact Form: ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`
  });
  res.json({ success: true });
});

module.exports = router;
