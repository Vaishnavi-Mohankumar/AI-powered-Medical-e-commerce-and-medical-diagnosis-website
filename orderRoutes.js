const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// @route   POST api/orders
// @desc    Create new order
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('orderItems', 'Order items are required').not().isEmpty(),
      check('shippingAddress', 'Shipping address is required').not().isEmpty(),
      check('paymentMethod', 'Payment method is required').not().isEmpty()
    ]
  ],
  orderController.createOrder
);

// @route   GET api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.get('/myorders', auth, orderController.getMyOrders);

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, orderController.getOrderById);

// @route   PUT api/orders/:id/pay
// @desc    Update order to paid
// @access  Private
router.put('/:id/pay', auth, orderController.updateOrderToPaid);

// @route   PUT api/orders/:id/deliver
// @desc    Update order to delivered
// @access  Private/Admin
router.put('/:id/deliver', auth, orderController.updateOrderToDelivered);

// @route   GET api/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/', auth, orderController.getOrders);

module.exports = router;