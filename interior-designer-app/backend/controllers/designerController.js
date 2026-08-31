const DesignerProfile = require('../models/DesignerProfile');
const User = require('../models/User');

// @desc    Get all designers
// @route   GET /api/designers
// @access  Public
exports.getDesigners = async (req, res) => {
  try {
    const { specialization, minRate, maxRate, rating, page = 1, limit = 12 } = req.query;

    const query = { isApproved: true };

    if (specialization) query.specialization = specialization;
    if (minRate || maxRate) {
      query.hourlyRate = {};
      if (minRate) query.hourlyRate.$gte = Number(minRate);
      if (maxRate) query.hourlyRate.$lte = Number(maxRate);
    }
    if (rating) query.rating = { $gte: Number(rating) };

    const designers = await DesignerProfile.find(query)
      .populate('user', 'name email avatar')
      .sort('-rating')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await DesignerProfile.countDocuments(query);

    res.status(200).json({
      success: true,
      data: designers,
      pagination: {
        page: Number(page),
        pages: Math.ceil(count / limit),
        total: count,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single designer
// @route   GET /api/designers/:id
// @access  Public
exports.getDesigner = async (req, res) => {
  try {
    const designer = await DesignerProfile.findById(req.params.id).populate('user', 'name email avatar');

    if (!designer) {
      return res.status(404).json({
        success: false,
        message: 'Designer not found',
      });
    }

    res.status(200).json({
      success: true,
      data: designer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create or update designer profile
// @route   POST /api/designers/profile
// @access  Private/Designer
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const profileData = { ...req.body, user: req.user.id };

    let profile = await DesignerProfile.findOne({ user: req.user.id });

    if (profile) {
      profile = await DesignerProfile.findOneAndUpdate(
        { user: req.user.id },
        profileData,
        { new: true, runValidators: true }
      );
    } else {
      profile = await DesignerProfile.create(profileData);
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get my designer profile
// @route   GET /api/designers/me
// @access  Private/Designer
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await DesignerProfile.findOne({ user: req.user.id }).populate('user');

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add portfolio item
// @route   POST /api/designers/portfolio
// @access  Private/Designer
exports.addPortfolioItem = async (req, res) => {
  try {
    const profile = await DesignerProfile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    profile.portfolio.push(req.body);
    await profile.save();

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Approve designer
// @route   PUT /api/designers/:id/approve
// @access  Private/Admin
exports.approveDesigner = async (req, res) => {
  try {
    const profile = await DesignerProfile.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Designer not found',
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
