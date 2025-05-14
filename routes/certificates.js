const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const { getEnrollment, markCertified } = require('../db/courses');

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@houselegends.com';
const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS }
});

// POST /api/certificates/request
router.post('/request', async (req, res) => {
    const { email, course, answers } = req.body;
    // Check enrollment
    const enrollment = await getEnrollment(email, course);
    if (!enrollment) return res.status(400).json({ error: 'Not enrolled' });
    // Simple quiz check (mock)
    if (!answers || !Array.isArray(answers) || answers.some(a => !a.correct)) {
        return res.status(400).json({ error: 'Quiz not passed' });
    }
    // Generate PDF certificate
    const doc = new PDFDocument();
    let pdfBuffer = Buffer.from([]);
    doc.on('data', chunk => pdfBuffer = Buffer.concat([pdfBuffer, chunk]));
    doc.on('end', async () => {
        // Send email with PDF
        await transporter.sendMail({
            from: EMAIL_FROM,
            to: email,
            subject: `Your House Legends Certificate (${course})`,
            text: `Congratulations! Attached is your certificate for completing the ${course} course.`,
            attachments: [{ filename: `Certificate-${course}.pdf`, content: pdfBuffer }]
        });
        await markCertified(email, course);
        res.json({ success: true });
    });
    // PDF content
    doc.fontSize(28).fillColor('#8d153a').text('House Legends', { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).fillColor('black').text(`Certificate of Completion`, { align: 'center' });
    doc.moveDown(2);
    doc.fontSize(14).text(`This certifies that`, { align: 'center' });
    doc.fontSize(20).fillColor('#1a237e').text(email, { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).fillColor('black').text(`has successfully completed the`, { align: 'center' });
    doc.fontSize(16).fillColor('#8d153a').text(`${course} Course`, { align: 'center' });
    doc.moveDown(2);
    doc.fontSize(12).fillColor('black').text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' });
    doc.end();
});

module.exports = router;
