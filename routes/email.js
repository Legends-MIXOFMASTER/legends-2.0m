const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@houselegends.com';
const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';

// Configure Nodemailer (use ethereal for dev or real SMTP for prod)
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your SMTP provider
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

// Send verification email
router.post('/verify', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Missing email' });
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
    const link = `${process.env.BASE_URL || 'http://localhost:3000'}/api/email/confirm?token=${token}`;
    await transporter.sendMail({
        from: EMAIL_FROM,
        to: email,
        subject: 'Verify your House Legends account',
        html: `<p>Click <a href="${link}">here</a> to verify your account.</p>`
    });
    res.json({ success: true });
});

// Confirm verification
router.get('/confirm', async (req, res) => {
    const { token } = req.query;
    try {
        const { email } = jwt.verify(token, JWT_SECRET);
        // Mark user as verified in DB
        await require('../db/user').verifyUser(email);
        res.send('Email verified! You can now log in.');
    } catch {
        res.status(400).send('Invalid or expired token.');
    }
});

// Request password reset
router.post('/reset-request', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Missing email' });
    // Check user exists
    const user = await require('../db/user').getUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    const link = `${process.env.BASE_URL || 'http://localhost:3000'}/reset-password.html?token=${token}`;
    await transporter.sendMail({
        from: EMAIL_FROM,
        to: email,
        subject: 'Reset your House Legends password',
        html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`
    });
    res.json({ success: true });
});

// Reset password
router.post('/reset', async (req, res) => {
    const { token, password } = req.body;
    try {
        const { email } = jwt.verify(token, JWT_SECRET);
        const hashed = await require('bcryptjs').hash(password, 10);
        await require('../db/user').setUserPassword(email, hashed);
        res.json({ success: true });
    } catch {
        res.status(400).json({ error: 'Invalid or expired token' });
    }
});

module.exports = router;
