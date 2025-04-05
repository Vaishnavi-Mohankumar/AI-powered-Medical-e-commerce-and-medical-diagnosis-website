const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide medicine name'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    enum: [
      'pain-relief',
      'allergy',
      'digestive',
      'cold-flu',
      'vitamins',
      'skincare',
      'first-aid',
      'other'
    ]
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: [0, 'Price must be positive']
  },
  image: {
    type: String,
    default: 'default.jpg'
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: [0, 'Stock cannot be negative']
  },
  requiresPrescription: {
    type: Boolean,
    default: false
  },
  activeIngredients: [{
    name: String,
    strength: String
  }],
  dosage: {
    type: String,
    required: [true, 'Please provide dosage information']
  },
  sideEffects: [String],
  manufacturer: {
    type: String,
    required: [true, 'Please provide manufacturer']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for faster search
medicineSchema.index({ name: 'text', description: 'text', category: 'text' });

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;