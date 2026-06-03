const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const { createInquiry, getInquiries, deleteInquiry } = require('../controllers/inquiryController');

const router = express.Router();

router.post('/', [
  body('customerName').trim().notEmpty().withMessage('Customer name is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
], createInquiry);

router.get('/', protect, getInquiries);
router.delete('/:id', protect, deleteInquiry);

module.exports = router;
