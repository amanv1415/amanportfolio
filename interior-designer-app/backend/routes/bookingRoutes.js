const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus,
  addReview,
  cancelBooking,
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post(protect, authorize('client'), createBooking)
  .get(protect, getBookings);

router.get('/:id', protect, getBooking);
router.put('/:id/status', protect, authorize('designer', 'admin'), updateBookingStatus);
router.post('/:id/review', protect, authorize('client'), addReview);
router.put('/:id/cancel', protect, cancelBooking);

module.exports = router;
