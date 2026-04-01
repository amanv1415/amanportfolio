const express = require('express');
const router = express.Router();
const {
  getDesigners,
  getDesigner,
  createOrUpdateProfile,
  getMyProfile,
  addPortfolioItem,
  approveDesigner,
} = require('../controllers/designerController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getDesigners);
router.get('/me', protect, authorize('designer'), getMyProfile);
router.post('/profile', protect, authorize('designer'), createOrUpdateProfile);
router.post('/portfolio', protect, authorize('designer'), addPortfolioItem);
router.get('/:id', getDesigner);
router.put('/:id/approve', protect, authorize('admin'), approveDesigner);

module.exports = router;
