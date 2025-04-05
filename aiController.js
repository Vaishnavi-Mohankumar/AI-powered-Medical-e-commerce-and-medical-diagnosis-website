const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const Prescription = require('../models/Prescription');
const User = require('../models/User');
const config = require('config');

// @desc    Analyze symptoms and suggest possible conditions
// @route   POST /api/ai/symptoms
// @access  Private
exports.analyzeSymptoms = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { symptoms, age, gender, duration } = req.body;

    // Call external AI service (example using Infermedica API)
    const response = await axios.post('https://api.infermedica.com/v3/diagnosis', {
      sex: gender,
      age: { value: age },
      evidence: symptoms.split(',').map(symptom => ({
        id: symptom.trim(),
        choice_id: 'present'
      })),
      extras: {
        disable_groups: true
      }
    }, {
      headers: {
        'App-Id': config.get('infermedicaAppId'),
        'App-Key': config.get('infermedicaAppKey'),
        'Content-Type': 'application/json'
      }
    });

    res.json({
      conditions: response.data.conditions,
      suggestedMedicines: [] // Would be populated based on conditions
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Process prescription image and extract medicines
// @route   POST /api/ai/prescription
// @access  Private
exports.processPrescription = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'Please upload a file' });
    }

    // Call OCR service (example using Google Cloud Vision)
    const formData = new FormData();
    formData.append('image', fs.createReadStream(req.file.path));

    const ocrResponse = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${config.get('googleCloudAPIKey')}`,
      {
        requests: [{
          image: { content: fs.readFileSync(req.file.path, 'base64') },
          features: [{ type: 'TEXT_DETECTION' }]
        }]
      }
    );

    const extractedText = ocrResponse.data.responses[0].fullTextAnnotation.text;

    // Process text with NLP to extract medicines
    const medicines = extractedText
      .split('\n')
      .filter(line => line.match(/(tablet|capsule|syrup|injection)\s*\d+mg?/i))
      .map(line => {
        const match = line.match(/(\w+)\s*(\d+mg?)/i);
        return match ? { name: match[1], dosage: match[2] } : null;
      })
      .filter(Boolean);

    // Save prescription to database
    const prescription = new Prescription({
      user: req.user.id,
      doctorName: 'Dr. Unknown',
      patientName: req.user.name,
      dateIssued: new Date(),
      fileUrl: req.file.path,
      fileKey: req.file.filename,
      medicines,
      extractedText
    });

    await prescription.save();

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      medicines,
      prescriptionId: prescription._id
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Analyze medical report (PDF/image)
// @route   POST /api/ai/report
// @access  Private
exports.analyzeMedicalReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'Please upload a file' });
    }

    // Call OCR service
    const formData = new FormData();
    formData.append('image', fs.createReadStream(req.file.path));

    const ocrResponse = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${config.get('googleCloudAPIKey')}`,
      {
        requests: [{
          image: { content: fs.readFileSync(req.file.path, 'base64') },
          features: [{ type: 'TEXT_DETECTION' }]
        }]
      }
    );

    const extractedText = ocrResponse.data.responses[0].fullTextAnnotation.text;

    // Call NLP service to analyze report
    const nlpResponse = await axios.post('https://api.monkeylearn.com/v3/classifiers/cl_pi3C7JiL/classify/', {
      data: [extractedText]
    }, {
      headers: {
        'Authorization': `Token ${config.get('monkeyLearnAPIKey')}`,
        'Content-Type': 'application/json'
      }
    });

    const keyFindings = nlpResponse.data[0].classifications
      .filter(item => item.confidence > 0.7)
      .map(item => item.tag_name);

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      keyFindings,
      recommendations: [] // Would be populated based on findings
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Chat with medical AI assistant
// @route   POST /api/ai/chat
// @access  Private
exports.chatWithAI = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { message, history = [] } = req.body;

    // Call OpenAI API for medical chat
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful medical assistant. Provide accurate health information and medicine recommendations when appropriate. Always remind users to consult with a doctor for serious concerns."
        },
        ...history,
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${config.get('openaiAPIKey')}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      reply: response.data.choices[0].message.content
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get personalized medicine recommendations
// @route   GET /api/ai/recommendations
// @access  Private
exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('prescriptions')
      .populate('orders');

    // Analyze user history to generate recommendations
    const frequentlyOrdered = {};
    user.orders.forEach(order => {
      order.orderItems.forEach(item => {
        frequentlyOrdered[item.medicine] = (frequentlyOrdered[item.medicine] || 0) + item.quantity;
      });
    });

    const topMedicines = Object.entries(frequentlyOrdered)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id]) => id);

    // Get complementary medicines based on prescriptions
    const prescribedCategories = new Set();
    user.prescriptions.forEach(prescription => {
      prescription.medicines.forEach(med => {
        prescribedCategories.add(med.category);
      });
    });

    const complementaryMeds = await Medicine.find({
      category: { $in: [...prescribedCategories] },
      _id: { $nin: topMedicines }
    }).limit(5);

    res.json({
      frequentlyOrdered: await Medicine.find({ _id: { $in: topMedicines } }),
      complementaryMeds,
      wellnessRecommendations: await Medicine.find({ category: 'wellness' }).limit(3)
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};