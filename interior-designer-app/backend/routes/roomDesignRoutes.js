const express = require('express');
const router = express.Router();
const {
  createDesign,
  getMyDesigns,
  getDesign,
  updateDesign,
  deleteDesign,
  getPublicDesigns,
  toggleLike,
} = require('../controllers/roomDesignController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(protect, createDesign)
  .get(protect, getMyDesigns);

router.get('/public', getPublicDesigns);

router.route('/:id')
  .get(protect, getDesign)
  .put(protect, updateDesign)
  .delete(protect, deleteDesign);

router.post('/:id/like', protect, toggleLike);

module.exports = router;
