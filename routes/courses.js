const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

// Admin middleware
function isAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });
  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// POST /api/courses/enroll
router.post('/enroll', async (req, res) => {
  const { email, course } = req.body;
  if (!email || !course) return res.status(400).json({ error: 'Missing fields' });
  // Save enrollment (mock/db)
  await require('../db/courses').enrollUser(email, course);
  res.json({ success: true });
});

// GET /api/courses/enrollments (admin)
router.get('/enrollments', isAdmin, async (req, res) => {
  try {
    const enrollments = await require('../db/courses').getAllEnrollments();
    res.json(enrollments);
  } catch {
    res.status(500).json({ error: 'Could not fetch enrollments' });
  }
});

// POST /api/courses/certificate
router.post('/certificate', async (req, res) => {
  const { email, course } = req.body;
  if (!email || !course) return res.status(400).json({ error: 'Missing fields' });
  // Send certificate email (mock)
  // await sendCertificateEmail(email, course);
  res.json({ success: true, message: 'Certificate sent (mock)' });
});

module.exports = router;
