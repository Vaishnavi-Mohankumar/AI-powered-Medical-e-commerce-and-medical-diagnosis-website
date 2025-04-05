const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { check } = require('express-validator');

// @route   GET api/medicines
// @desc    Get all medicines
// @access  Public
router.get('/', medicineController.getMedicines);

// @route   GET api/medicines/search
// @desc    Search medicines
// @access  Public
router.get('/search', medicineController.searchMedicines);

// @route   GET api/medicines/:id
// @desc    Get medicine by ID
// @access  Public
router.get('/:id', medicineController.getMedicineById);

// @route   GET api/medicines/category/:category
// @desc    Get medicines by category
// @access  Public
router.get('/category/:category', medicineController.getMedicinesByCategory);

// @route   POST api/medicines
// @desc    Create a medicine
// @access  Private/Admin
router.post(
  '/',
  [
    auth,
    admin,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
      check('price', 'Price is required and must be positive').isFloat({ min: 0 }),
      check('stock', 'Stock is required and must be positive').isInt({ min: 0 })
    ]
  ],
  medicineController.createMedicine
);

// @route   PUT api/medicines/:id
// @desc    Update a medicine
// @access  Private/Admin
router.put(
  '/:id',
  [
    auth,
    admin,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
      check('price', 'Price is required and must be positive').isFloat({ min: 0 }),
      check('stock', 'Stock is required and must be positive').isInt({ min: 0 })
    ]
  ],
  medicineController.updateMedicine
);

// @route   DELETE api/medicines/:id
// @desc    Delete a medicine
// @access  Private/Admin
router.delete('/:id', [auth, admin], medicineController.deleteMedicine);

// @route   GET api/medicines/top
// @desc    Get top medicines
// @access  Public
router.get('/top', medicineController.getTopMedicines);

module.exports = router;