import React from 'react';
import { Link } from 'react-router-dom';
import { FaPills, FaStethoscope, FaFileMedical, FaCommentMedical } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Trusted Online Pharmacy</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get genuine medicines delivered to your doorstep with expert healthcare support
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/products" 
              className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-blue-50 transition-colors"
            >
              Shop Medicines
            </Link>
            <Link 
              to="/symptom-checker" 
              className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-white hover:text-blue-600 transition-colors"
            >
              Symptom Checker
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaPills className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Medicine Delivery</h3>
              <p className="text-gray-600">
                Get prescribed medicines delivered quickly and safely to your home
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaStethoscope className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Symptom Checker</h3>
              <p className="text-gray-600">
                Get preliminary health assessments based on your symptoms
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaFileMedical className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prescription Scan</h3>
              <p className="text-gray-600">
                Upload your prescription and we'll prepare your medicines
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaCommentMedical className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Chat with our healthcare experts anytime for advice
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product cards will be added here */}
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/products" 
              className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;