const mongoose = require('mongoose');

const roomDesignSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  roomType: {
    type: String,
    enum: ['living-room', 'bedroom', 'kitchen', 'bathroom', 'office', 'dining-room', 'other'],
    required: true,
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      default: 'feet',
    },
  },
  template: {
    type: String,
    default: 'custom',
  },
  design2D: {
    objects: [{
      type: {
        type: String,
        required: true,
      },
      position: {
        x: Number,
        y: Number,
      },
      rotation: Number,
      dimensions: {
        width: Number,
        height: Number,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      customProperties: mongoose.Schema.Types.Mixed,
    }],
    walls: [{
      color: String,
      texture: String,
    }],
    flooring: {
      type: String,
      color: String,
      texture: String,
    },
  },
  design3D: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  style: {
    type: String,
    enum: ['modern', 'traditional', 'minimalist', 'industrial', 'scandinavian', 'bohemian', 'contemporary'],
  },
  colorPalette: [String],
  totalCost: {
    type: Number,
    default: 0,
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: Number,
  }],
  thumbnail: String,
  snapshots: [String],
  isPublic: {
    type: Boolean,
    default: false,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  designer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('RoomDesign', roomDesignSchema);
