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

// GET /api/gallery (public)
router.get('/', async (req, res) => {
  try {
    // Only approved images for public
    const images = (await require('../db/gallery').getAllImages()).filter(img => img.approved);
    res.json(images);
  } catch {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// GET /api/gallery/all (admin)
router.get('/all', isAdmin, async (req, res) => {
  try {
    const all = await require('../db/gallery').getAllImages();
    res.json(all);
  } catch {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// POST /api/gallery/upload (admin)
router.post('/upload', isAdmin, async (req, res) => {
  const { src, alt } = req.body;
  if (!src || !alt) return res.status(400).json({ error: 'Missing fields' });
  await require('../db/gallery').addImage({ src, alt, approved: false });
  res.json({ success: true });
});

// POST /api/gallery/bulk-upload (admin)
router.post('/bulk-upload', isAdmin, async (req, res) => {
  // Accept multiple images in req.files or req.body.images
  // For simplicity, assume req.body.images: [{src, alt, tags}]
  const images = req.body.images || [];
  const saved = [];
  for (const img of images) {
    const newImg = await require('../db/gallery').addImage({
      src: img.src,
      alt: img.alt || '',
      tags: img.tags || [],
      approved: false
    });
    saved.push(newImg);
  }
  res.json({ success: true, images: saved });
});

// PATCH /api/gallery/:id (admin) - edit caption/tags
router.patch('/:id', isAdmin, async (req, res) => {
  const { alt, tags } = req.body;
  try {
    const updated = await require('../db/gallery').updateImage(req.params.id, { alt, tags });
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update image' });
  }
});

// POST /api/gallery/approve/:id (admin) - approve image
router.post('/approve/:id', isAdmin, async (req, res) => {
  try {
    const updated = await require('../db/gallery').updateImage(req.params.id, { approved: true });
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to approve image' });
  }
});

// DELETE /api/gallery/:id (admin)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    await require('../db/gallery').deleteImage(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
