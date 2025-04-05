import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { MdLocalPharmacy } from 'react-icons/md';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <MdLocalPharmacy className="text-3xl mr-2" />
            <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
              MediCare
            </Link>
          </div>
          
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search medicines..."
              className="w-full py-2 px-4 pr-10 rounded-full text-gray-800 focus:outline-none"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>

          <nav className="flex items-center space-x-6">
            <Link to="/products" className="hover:text-blue-200 transition-colors flex items-center">
              <span className="hidden md:inline">Shop</span>
              <MdLocalPharmacy className="md:hidden text-xl" />
            </Link>
            <Link to="/cart" className="hover:text-blue-200 transition-colors flex items-center">
              <FaShoppingCart className="mr-1" />
              <span className="hidden md:inline">Cart</span>
            </Link>
            <Link to="/profile" className="hover:text-blue-200 transition-colors flex items-center">
              <FaUser className="mr-1" />
              <span className="hidden md:inline">Account</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;