require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const plantRoutes = require('./routes/plants');
const inquiryRoutes = require('./routes/inquiries');
const uploadRoutes = require('./routes/upload');
const orderRoutes = require('./routes/orders');

connectDB();

const app = express();

app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'https://newgangwar-nursery.vercel.app'
  ],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'New Gangwar Nursery API is running' });
});

app.get('/api/test-email', async (req, res) => {
  try {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: process.env.ADMIN_EMAIL,
      from: process.env.EMAIL_USER,
      subject: 'Test Email from New Gangwar Nursery',
      html: '<h2>Test Email</h2><p>If you see this, SendGrid is working!</p>',
    };
    await sgMail.send(msg);
    res.json({ success: true, message: 'Test email sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'SendGrid failed', error: error.message });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
