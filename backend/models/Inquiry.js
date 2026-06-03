const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  address: {
    type: String,
    trim: true,
  },
  plantName: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    min: [1, 'Quantity must be at least 1'],
    default: 1,
  },
  message: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
