const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  nameHindi: {
    type: String,
    required: [true, 'Hindi name is required'],
    trim: true,
  },
  nameEnglish: {
    type: String,
    required: [true, 'English name is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Indoor Plants',
      'Outdoor Plants',
      'Flowering Plants',
      'Fruit Plants',
      'Medicinal Plants',
      'Decorative Plants',
      'Bonsai Plants',
      'Seasonal Plants',
      'Shade Trees',
      'Hedge Plants',
    ],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  imagePublicId: {
    type: String,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  stockStatus: {
    type: String,
    enum: ['in-stock', 'out-of-stock'],
    default: 'in-stock',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  bestseller: {
    type: Boolean,
    default: false,
  },
  newArrival: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

plantSchema.index({ category: 1, price: 1, nameEnglish: 1 });

module.exports = mongoose.model('Plant', plantSchema);
