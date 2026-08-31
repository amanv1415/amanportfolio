const mongoose = require('mongoose');

const designerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    maxlength: 1000,
  },
  specialization: [{
    type: String,
    enum: ['residential', 'commercial', 'hospitality', 'office', 'retail', 'other'],
  }],
  experience: {
    type: Number,
    default: 0,
  },
  hourlyRate: {
    type: Number,
    required: true,
    min: 0,
  },
  consultationFee: {
    type: Number,
    default: 0,
  },
  portfolio: [{
    title: String,
    description: String,
    images: [String],
    category: String,
    completedDate: Date,
  }],
  education: [{
    degree: String,
    institution: String,
    year: Number,
  }],
  certifications: [{
    name: String,
    issuer: String,
    year: Number,
  }],
  availability: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    },
    slots: [{
      start: String,
      end: String,
    }],
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  totalEarnings: {
    type: Number,
    default: 0,
  },
  completedProjects: {
    type: Number,
    default: 0,
  },
  socialLinks: {
    website: String,
    instagram: String,
    pinterest: String,
    linkedin: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('DesignerProfile', designerProfileSchema);
