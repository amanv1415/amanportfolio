const Booking = require('../models/Booking');
const DesignerProfile = require('../models/DesignerProfile');

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private/Client
exports.createBooking = async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      client: req.user.id,
    };

    const booking = await Booking.create(bookingData);

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'client') {
      query.client = req.user.id;
    } else if (req.user.role === 'designer') {
      query.designer = req.user.id;
    }

    const bookings = await Booking.find(query)
      .populate('client', 'name email avatar')
      .populate('designer', 'name email avatar')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('client', 'name email avatar phone')
      .populate('designer', 'name email avatar phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check authorization
    if (
      req.user.role !== 'admin' &&
      booking.client._id.toString() !== req.user.id &&
      booking.designer._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Designer
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check if designer owns the booking
    if (booking.designer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking',
      });
    }

    booking.status = status;

    // Update designer stats if completed
    if (status === 'completed') {
      const designerProfile = await DesignerProfile.findOne({ user: booking.designer });
      if (designerProfile) {
        designerProfile.completedProjects += 1;
        designerProfile.totalEarnings += booking.price;
        await designerProfile.save();
      }
    }

    await booking.save();

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add review to booking
// @route   POST /api/bookings/:id/review
// @access  Private/Client
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check if client owns the booking
    if (booking.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to review this booking',
      });
    }

    // Check if booking is completed
    if (booking.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot review incomplete booking',
      });
    }

    booking.review = {
      rating,
      comment,
      createdAt: Date.now(),
    };

    await booking.save();

    // Update designer rating
    const designerProfile = await DesignerProfile.findOne({ user: booking.designer });
    if (designerProfile) {
      const totalRating = designerProfile.rating * designerProfile.reviewCount + rating;
      designerProfile.reviewCount += 1;
      designerProfile.rating = totalRating / designerProfile.reviewCount;
      await designerProfile.save();
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    const { cancellationReason } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    booking.status = 'cancelled';
    booking.cancellationReason = cancellationReason;

    await booking.save();

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
