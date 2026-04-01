const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['sofa', 'chair', 'table', 'bed', 'cabinet', 'lighting', 'decor', 'rug', 'other'],
  },
  subCategory: String,
  style: {
    type: String,
    enum: ['modern', 'traditional', 'minimalist', 'industrial', 'scandinavian', 'bohemian', 'contemporary'],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discountPrice: {
    type: Number,
    min: 0,
  },
  images: [{
    type: String,
    required: true,
  }],
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      default: 'cm',
    },
  },
  colors: [String],
  materials: [String],
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
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
  brand: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  tags: [String],
}, {
  timestamps: true,
});

// Index for search
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
