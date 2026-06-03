const express = require('express');
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', createOrder);
router.get('/', protect, getOrders);
router.put('/:id', protect, updateOrderStatus);

module.exports = router;
