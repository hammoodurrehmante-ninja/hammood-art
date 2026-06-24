require('dotenv').config();
const express = require('express');
const helmet  = require('helmet');
const cors    = require('cors');
const rateLimit = require('express-rate-limit');
const path    = require('path');
const contactRouter = require('./routes/contact');

const app  = express();
const PORT = process.env.PORT || 3000;

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'"],
      styleSrc:   ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc:    ["'self'", 'https://fonts.gstatic.com'],
      imgSrc:     ["'self'", 'data:'],
      connectSrc: ["'self'"],
      frameSrc:   ["'none'"],
      objectSrc:  ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS — only allow the actual site origin in production
const allowedOrigins = [
  'http://localhost:3000',
  process.env.SITE_ORIGIN,
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // Allow non-browser requests (Postman, curl) only in dev
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
}));

// Body size limit — prevent oversized payloads
app.use(express.json({ limit: '16kb' }));

// Rate limit the contact API
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                    // max 5 submissions per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages sent. Please wait 15 minutes and try again.' },
});

// Block internal sketches from public access
app.use('/assets/sketches', (_req, res) => res.status(403).end());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes
app.use('/api/contact', contactLimiter, contactRouter);

// Catch-all
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Export for Vercel serverless; listen only when run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Portfolio running at http://localhost:${PORT}`);
  });
}

module.exports = app;
