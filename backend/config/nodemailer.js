const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendInquiryEmail = async ({ customerName, phone, email, address, plantName, quantity, message }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Plant Inquiry - ${plantName || 'General Inquiry'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f0fdf4;">
        <div style="background: #166534; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">New Gangwar Nursery</h1>
          <p style="margin: 5px 0 0; opacity: 0.9;">New Customer Inquiry</p>
        </div>
        <div style="background: white; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #166534; border-bottom: 2px solid #166534; padding-bottom: 10px;">Customer Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Name:</td><td style="padding: 8px;">${customerName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Phone:</td><td style="padding: 8px;">${phone}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Email:</td><td style="padding: 8px;">${email || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Address:</td><td style="padding: 8px;">${address || 'N/A'}</td></tr>
          </table>
          <h2 style="color: #166534; border-bottom: 2px solid #166534; padding-bottom: 10px; margin-top: 20px;">Inquiry Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Plant Name:</td><td style="padding: 8px;">${plantName || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Quantity:</td><td style="padding: 8px;">${quantity || 'Not specified'}</td></tr>
          </table>
          ${message ? `<h2 style="color: #166534; border-bottom: 2px solid #166534; padding-bottom: 10px; margin-top: 20px;">Message</h2><p style="padding: 8px; color: #374151;">${message}</p>` : ''}
          <p style="margin-top: 20px; padding: 10px; background: #fef3c7; border-radius: 5px; color: #92400e; text-align: center;">
            Please contact the customer at the earliest.
          </p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { transporter, sendInquiryEmail };
