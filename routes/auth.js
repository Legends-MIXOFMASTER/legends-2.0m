const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Replace with your actual MongoDB connection logic
const { getUserByEmail, createUser } = require('../db/user');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    // Block unverified users
    const isVerified = await require('../db/user').isUserVerified(email);
    if (!isVerified) return res.status(403).json({ error: 'Please verify your email before logging in.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
});

// Register route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const existing = await getUserByEmail(email);
    if (existing) return res.status(400).json({ error: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await createUser({ email, password: hashed, verified: false });
    // Send verification email
    await require('./email').sendVerificationEmail(email);
    res.json({ id: user._id, email: user.email, message: 'Registration successful. Please check your email to verify your account.' });
});

module.exports = router;
