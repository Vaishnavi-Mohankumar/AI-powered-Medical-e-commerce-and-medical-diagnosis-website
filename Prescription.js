const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorName: {
    type: String,
    required: [true, 'Please provide doctor name']
  },
  doctorLicense: {
    type: String
  },
  patientName: {
    type: String,
    required: [true, 'Please provide patient name']
  },
  dateIssued: {
    type: Date,
    required: [true, 'Please provide issue date']
  },
  fileUrl: {
    type: String,
    required: [true, 'Please provide file URL']
  },
  fileKey: {
    type: String,
    required: [true, 'Please provide file key']
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'approved', 'rejected'],
    default: 'pending'
  },
  medicines: [{
    name: {
      type: String,
      required: true
    },
    dosage: {
      type: String,
      required: true
    },
    frequency: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    notes: String
  }],
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  processedAt: {
    type: Date
  },
  rejectionReason: {
    type: String
  },
  extractedText: {
    type: String
  }
}, {
  timestamps: true
});

// Text index for search
prescriptionSchema.index({
  'doctorName': 'text',
  'patientName': 'text',
  'medicines.name': 'text',
  'extractedText': 'text'
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;