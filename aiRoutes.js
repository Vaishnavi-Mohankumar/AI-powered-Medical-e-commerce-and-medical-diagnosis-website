const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// @route   POST api/ai/symptoms
// @desc    Analyze symptoms and suggest possible conditions
// @access  Private
router.post(
  '/symptoms',
  [
    auth,
    [
      check('symptoms', 'Symptoms are required').not().isEmpty(),
      check('age', 'Age is required').isInt({ min: 1, max: 120 }),
      check('gender', 'Gender is required').isIn(['male', 'female', 'other'])
    ]
  ],
  aiController.analyzeSymptoms
);

// @route   POST api/ai/prescription
// @desc    Extract medicines from prescription image
// @access  Private
router.post(
  '/prescription',
  [
    auth,
    upload.single('prescription')
  ],
  aiController.processPrescription
);

// @route   POST api/ai/report
// @desc    Analyze medical report (PDF/image)
// @access  Private
router.post(
  '/report',
  [
    auth,
    upload.single('report')
  ],
  aiController.analyzeMedicalReport
);

// @route   POST api/ai/chat
// @desc    Chat with medical AI assistant
// @access  Private
router.post(
  '/chat',
  [
    auth,
    [
      check('message', 'Message is required').not().isEmpty()
    ]
  ],
  aiController.chatWithAI
);

// @route   GET api/ai/recommendations
// @desc    Get personalized medicine recommendations
// @access  Private
router.get('/recommendations', auth, aiController.getRecommendations);

module.exports = router;