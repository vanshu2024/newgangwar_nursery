const { validationResult } = require('express-validator');
const Inquiry = require('../models/Inquiry');
const { sendInquiryEmail } = require('../config/nodemailer');

const createInquiry = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { customerName, phone, email, address, plantName, quantity, message } = req.body;

    const inquiry = await Inquiry.create({
      customerName,
      phone,
      email,
      address,
      plantName,
      quantity: quantity || 1,
      message,
    });

    try {
      await sendInquiryEmail({ customerName, phone, email, address, plantName, quantity, message });
    } catch (emailError) {
      console.error('Email sending failed:', emailError.message);
    }

    res.status(201).json({
      message: 'Thank you. Your plant request has been submitted successfully.',
      inquiry,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getInquiries = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Inquiry.countDocuments();

    const inquiries = await Inquiry.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      inquiries,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createInquiry, getInquiries, deleteInquiry };
