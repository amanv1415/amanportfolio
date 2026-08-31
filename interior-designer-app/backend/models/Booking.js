const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  designer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  serviceType: {
    type: String,
    enum: ['consultation', 'full-design', 'renovation', 'styling'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 60,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rejected'],
    default: 'pending',
  },
  projectDetails: {
    roomType: String,
    budget: Number,
    requirements: String,
    attachments: [String],
  },
  meetingType: {
    type: String,
    enum: ['video', 'in-person', 'chat'],
    default: 'video',
  },
  meetingLink: String,
  price: {
    type: Number,
    required: true,
  },
  payment: {
    status: {
      type: String,
      enum: ['pending', 'completed', 'refunded'],
      default: 'pending',
    },
    transactionId: String,
    method: String,
  },
  notes: String,
  cancellationReason: String,
  review: {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: String,
    createdAt: Date,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);
