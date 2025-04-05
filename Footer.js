import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdLocalHospital, MdEmail, MdPhone } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <MdLocalHospital className="text-3xl mr-2" />
              <h3 className="text-xl font-bold">MediCare</h3>
            </div>
            <p className="text-gray-400">
              Your trusted online pharmacy providing quality medicines and healthcare solutions.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shop</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Prescription</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">OTC Medicines</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Wellness</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Personal Care</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <MdEmail className="mr-2" />
                <span>support@medicare.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MdPhone className="mr-2" />
                <span>+1 (800) 123-4567</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} MediCare. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;