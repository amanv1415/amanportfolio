const RoomDesign = require('../models/RoomDesign');

// @desc    Create room design
// @route   POST /api/designs
// @access  Private
exports.createDesign = async (req, res) => {
  try {
    const designData = {
      ...req.body,
      user: req.user.id,
    };

    const design = await RoomDesign.create(designData);

    res.status(201).json({
      success: true,
      data: design,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all designs for current user
// @route   GET /api/designs
// @access  Private
exports.getMyDesigns = async (req, res) => {
  try {
    const designs = await RoomDesign.find({ user: req.user.id })
      .populate('products.product')
      .sort('-updatedAt');

    res.status(200).json({
      success: true,
      data: designs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single design
// @route   GET /api/designs/:id
// @access  Private
exports.getDesign = async (req, res) => {
  try {
    const design = await RoomDesign.findById(req.params.id)
      .populate('products.product')
      .populate('user', 'name avatar')
      .populate('designer', 'name avatar');

    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design not found',
      });
    }

    // Check if user owns the design or it's public
    if (design.user._id.toString() !== req.user.id && !design.isPublic && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this design',
      });
    }

    res.status(200).json({
      success: true,
      data: design,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update design
// @route   PUT /api/designs/:id
// @access  Private
exports.updateDesign = async (req, res) => {
  try {
    let design = await RoomDesign.findById(req.params.id);

    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design not found',
      });
    }

    // Check ownership
    if (design.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this design',
      });
    }

    design = await RoomDesign.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: design,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete design
// @route   DELETE /api/designs/:id
// @access  Private
exports.deleteDesign = async (req, res) => {
  try {
    const design = await RoomDesign.findById(req.params.id);

    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design not found',
      });
    }

    // Check ownership
    if (design.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this design',
      });
    }

    await design.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Design deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get public designs (feed)
// @route   GET /api/designs/public
// @access  Public
exports.getPublicDesigns = async (req, res) => {
  try {
    const { page = 1, limit = 12, style, roomType } = req.query;

    const query = { isPublic: true };
    if (style) query.style = style;
    if (roomType) query.roomType = roomType;

    const designs = await RoomDesign.find(query)
      .populate('user', 'name avatar')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await RoomDesign.countDocuments(query);

    res.status(200).json({
      success: true,
      data: designs,
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

// @desc    Like/Unlike design
// @route   POST /api/designs/:id/like
// @access  Private
exports.toggleLike = async (req, res) => {
  try {
    const design = await RoomDesign.findById(req.params.id);

    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design not found',
      });
    }

    const likeIndex = design.likes.indexOf(req.user.id);

    if (likeIndex > -1) {
      design.likes.splice(likeIndex, 1);
    } else {
      design.likes.push(req.user.id);
    }

    await design.save();

    res.status(200).json({
      success: true,
      data: design,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
