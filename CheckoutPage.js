import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaArrowLeft, FaMapMarkerAlt, FaCreditCard, FaUser } from 'react-icons/fa';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep === 1) {
      setActiveStep(2);
    } else {
      // Process payment and place order
      console.log('Order placed:', formData);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Link to="/cart" className="text-blue-600 hover:text-blue-800 mr-4">
            <FaArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex mb-6">
                <div className={`flex-1 text-center border-b-2 ${activeStep >= 1 ? 'border-blue-600' : 'border-gray-300'} pb-2`}>
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${activeStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    1
                  </div>
                  <p className={`mt-2 ${activeStep >= 1 ? 'text-blue-600' : 'text-gray-600'}`}>Shipping</p>
                </div>
                <div className={`flex-1 text-center border-b-2 ${activeStep >= 2 ? 'border-blue-600' : 'border-gray-300'} pb-2`}>
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${activeStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    2
                  </div>
                  <p className={`mt-2 ${activeStep >= 2 ? 'text-blue-600' : 'text-gray-600'}`}>Payment</p>
                </div>
                <div className="flex-1 text-center border-b-2 border-gray-300 pb-2">
                  <div className="w-8 h-8 mx-auto rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                    3
                  </div>
                  <p className="mt-2 text-gray-600">Confirmation</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {activeStep === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FaUser className="mr-2" /> Shipping Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 flex items-center">
                        <FaMapMarkerAlt className="mr-1" /> Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">ZIP Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FaCreditCard className="mr-2" /> Payment Method
                    </h2>
                    <div className="space-y-2 mb-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'credit'}
                          onChange={() => setPaymentMethod('credit')}
                          className="text-blue-600"
                        />
                        <span>Credit/Debit Card</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => setPaymentMethod('paypal')}
                          className="text-blue-600"
                        />
                        <span>PayPal</span>
                      </label>
                    </div>

                    {paymentMethod === 'credit' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Name on Card</label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 mb-1">Expiry Date</label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-1">CVV</label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              placeholder="123"
                              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'paypal' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-center">
                        <p>You will be redirected to PayPal to complete your payment</p>
                      </div>
                    )}

                    <div className="bg-gray-100 p-4 rounded">
                      <h3 className="font-semibold mb-2">Order Summary</h3>
                      <div className="flex justify-between mb-1">
                        <span>Subtotal (2 items)</span>
                        <span>$13.48</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Shipping</span>
                        <span>$4.99</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Tax</span>
                        <span>$1.35</span>
                      </div>
                      <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>$19.82</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Flock className="mr-2" />
                    {activeStep === 1 ? 'Continue to Payment' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>Your personal data will be used to process your order and support your experience throughout this website.</p>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Paracetamol 500mg × 2</span>
                  <span>$11.98</span>
                </div>
                <div className="flex justify-between">
                  <span>Ibuprofen 200mg × 1</span>
                  <span>$7.49</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                  <span>Subtotal</span>
                  <span>$13.48</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$4.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$1.35</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>$19.82</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;