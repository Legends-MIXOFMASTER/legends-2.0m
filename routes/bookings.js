const express = require('express');
const router = express.Router();
// Replace with your actual MongoDB connection logic
const { createBooking, getBookingsByDate } = require('../db/booking');

// For demo: define time slots (e.g., every hour 12:00-20:00)
const TIME_SLOTS = [
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

// GET /api/bookings/slots?date=YYYY-MM-DD
router.get('/slots', async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: 'Missing date param' });
  try {
    const bookings = await getBookingsByDate(date); // [{time: '14:00', ...}]
    const bookedTimes = bookings.map(b => b.time);
    const available = TIME_SLOTS.filter(slot => !bookedTimes.includes(slot));
    res.json({ available });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch slots' });
  }
});

// POST /api/bookings
router.post('/', async (req, res) => {
  try {
    const booking = await createBooking(req.body); // expects {name, email, phone, date, time, service}
    // Send confirmation email
    try {
      await require('./email').sendBookingConfirmation(booking);
    } catch {}
    res.status(201).send('Booking successful!');
  } catch (err) {
    res.status(500).send('Booking failed.');
  }
});

// Admin middleware (JWT)
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

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

// GET /api/bookings/all (admin)
router.get('/all', isAdmin, async (req, res) => {
  try {
    const all = await require('../db/booking').getAllBookings();
    res.json(all);
  } catch {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// GET /api/bookings/calendar (admin)
router.get('/calendar', isAdmin, async (req, res) => {
  try {
    const all = await require('../db/booking').getAllBookings();
    // Group by date: { 'YYYY-MM-DD': [booking, ...], ... }
    const grouped = {};
    all.forEach(b => {
      if (!grouped[b.date]) grouped[b.date] = [];
      grouped[b.date].push(b);
    });
    res.json(grouped);
  } catch {
    res.status(500).json({ error: 'Failed to fetch calendar' });
  }
});

// GET /api/bookings/export (admin)
router.get('/export', isAdmin, async (req, res) => {
  try {
    const all = await require('../db/booking').getAllBookings();
    const header = 'Date,Time,Name,Email,Phone,Service\n';
    const rows = all.map(b => [b.date, b.time, b.name, b.email, b.phone, b.service].map(x => `"${x||''}"`).join(',')).join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=bookings.csv');
    res.send(header + rows);
  } catch {
    res.status(500).send('Failed to export CSV');
  }
});

// DELETE /api/bookings/:id (admin)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    await require('../db/booking').deleteBooking(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
