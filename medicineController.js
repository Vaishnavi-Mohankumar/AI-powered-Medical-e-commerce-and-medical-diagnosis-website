const Medicine = require('../models/Medicine');
const { validationResult } = require('express-validator');

// @desc    Get all medicines
// @route   GET /api/medicines
// @access  Public
exports.getMedicines = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i'
          }
        }
      : {};

    const count = await Medicine.countDocuments({ ...keyword });
    const medicines = await Medicine.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      medicines,
      page,
      pages: Math.ceil(count / pageSize),
      count
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Search medicines
// @route   GET /api/medicines/search
// @access  Public
exports.searchMedicines = async (req, res) => {
  try {
    const { query } = req.query;
    const medicines = await Medicine.find({
      $text: { $search: query }
    }).limit(10);

    res.json(medicines);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get single medicine
// @route   GET /api/medicines/:id
// @access  Public
exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ msg: 'Medicine not found' });
    }

    res.json(medicine);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Medicine not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Get medicines by category
// @route   GET /api/medicines/category/:category
// @access  Public
exports.getMedicinesByCategory = async (req, res) => {
  try {
    const medicines = await Medicine.find({ category: req.params.category });
    res.json(medicines);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a medicine
// @route   POST /api/medicines
// @access  Private/Admin
exports.createMedicine = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const medicine = new Medicine({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      requiresPrescription: req.body.requiresPrescription || false,
      activeIngredients: req.body.activeIngredients || [],
      dosage: req.body.dosage,
      sideEffects: req.body.sideEffects || [],
      manufacturer: req.body.manufacturer,
      image: req.body.image || 'default.jpg'
    });

    const createdMedicine = await medicine.save();
    res.status(201).json(createdMedicine);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a medicine
// @route   PUT /api/medicines/:id
// @access  Private/Admin
exports.updateMedicine = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ msg: 'Medicine not found' });
    }

    medicine.name = req.body.name;
    medicine.description = req.body.description;
    medicine.category = req.body.category;
    medicine.price = req.body.price;
    medicine.stock = req.body.stock;
    medicine.requiresPrescription = req.body.requiresPrescription;
    medicine.activeIngredients = req.body.activeIngredients;
    medicine.dosage = req.body.dosage;
    medicine.sideEffects = req.body.sideEffects;
    medicine.manufacturer = req.body.manufacturer;
    medicine.image = req.body.image || medicine.image;

    const updatedMedicine = await medicine.save();
    res.json(updatedMedicine);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Medicine not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a medicine
// @route   DELETE /api/medicines/:id
// @access  Private/Admin
exports.deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ msg: 'Medicine not found' });
    }

    await medicine.remove();
    res.json({ msg: 'Medicine removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Medicine not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Get top medicines
// @route   GET /api/medicines/top
// @access  Public
exports.getTopMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({}).sort({ rating: -1 }).limit(5);
    res.json(medicines);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};