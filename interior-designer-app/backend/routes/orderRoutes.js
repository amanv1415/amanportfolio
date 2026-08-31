const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post(protect, createOrder)
  .get(protect, getMyOrders);

router.get('/all', protect, authorize('admin'), getAllOrders);

router.get('/:id', protect, getOrder);
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus);
router.put('/:id/payment', protect, updatePaymentStatus);

module.exports = router;
