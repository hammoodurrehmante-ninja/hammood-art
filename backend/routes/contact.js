const express = require('express');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');

const router = express.Router();
const pool   = new Pool({ connectionString: process.env.DATABASE_URL });

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = { name: 120, email: 254, subject: 200, message: 4000 };

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// POST /api/contact save submission + optionally email
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Length validation
  for (const [field, max] of Object.entries(LIMITS)) {
    const val = req.body[field];
    if (typeof val !== 'string' || val.trim().length === 0) {
      return res.status(400).json({ error: `${field} is required.` });
    }
    if (val.length > max) {
      return res.status(400).json({ error: `${field} must be under ${max} characters.` });
    }
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const clean = {
    name:    name.trim(),
    email:   email.trim().toLowerCase(),
    subject: subject.trim(),
    message: message.trim(),
  };

  // Save to Neon DB
  try {
    await pool.query(
      'INSERT INTO contact_submissions (name, email, subject, message) VALUES ($1, $2, $3, $4)',
      [clean.name, clean.email, clean.subject, clean.message]
    );
  } catch (err) {
    console.error('DB error:', err.message);
    return res.status(500).json({ error: 'Failed to save message. Please try again.' });
  }

  // Send email notification only if Gmail credentials are configured
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS &&
      process.env.EMAIL_USER !== 'your-gmail@gmail.com') {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
      await transporter.sendMail({
        from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        replyTo: clean.email,
        to:      process.env.EMAIL_USER,
        subject: `[Portfolio] ${clean.subject}`,
        // Sanitize all user values before inserting into HTML
        html: `
          <h2 style="color:#BC79E1">New message from your portfolio</h2>
          <p><strong>Name:</strong> ${esc(clean.name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${esc(clean.email)}">${esc(clean.email)}</a></p>
          <p><strong>Subject:</strong> ${esc(clean.subject)}</p>
          <hr style="border-color:#333" />
          <p style="white-space:pre-line">${esc(clean.message)}</p>
        `,
      });
    } catch (err) {
      console.error('Mail error:', err.message);
      // DB already saved still return success
    }
  }

  res.json({ success: true });
});

// GET /api/contact/submissions protected by API key
router.get('/submissions', async (req, res) => {
  const key = req.headers['x-api-key'];
  if (!key || key !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  try {
    const { rows } = await pool.query(
      'SELECT id, name, email, subject, message, submitted_at FROM contact_submissions ORDER BY submitted_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
