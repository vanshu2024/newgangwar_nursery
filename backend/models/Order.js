const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    plantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant', required: true },
    nameHindi: String,
    nameEnglish: String,
    price: Number,
    quantity: { type: Number, required: true, min: 1 },
    image: String,
  }],
  customerName: { type: String, required: [true, 'Name is required'], trim: true },
  phone: { type: String, required: [true, 'Phone is required'], trim: true },
  email: { type: String, trim: true },
  address: { type: String, required: [true, 'Address is required'], trim: true },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
