import React, { useState } from 'react';
import { FaSearch, FaFilter, FaShoppingCart } from 'react-icons/fa';
import { MdLocalPharmacy } from 'react-icons/md';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Sample product data - will be replaced with API data
  const products = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'pain-relief',
      price: 5.99,
      image: 'https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg',
      description: 'For relief of mild to moderate pain and fever'
    },
    {
      id: 2,
      name: 'Ibuprofen 200mg',
      category: 'pain-relief',
      price: 7.49,
      image: 'https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg',
      description: 'For relief of pain, inflammation and fever'
    },
    {
      id: 3,
      name: 'Cetirizine 10mg',
      category: 'allergy',
      price: 8.99,
      image: 'https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg',
      description: 'For relief of allergy symptoms'
    },
    {
      id: 4,
      name: 'Omeprazole 20mg',
      category: 'digestive',
      price: 12.99,
      image: 'https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg',
      description: 'For treatment of heartburn and acid reflux'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'pain-relief', label: 'Pain Relief' },
    { value: 'allergy', label: 'Allergy' },
    { value: 'digestive', label: 'Digestive Health' },
    { value: 'cold-flu', label: 'Cold & Flu' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <MdLocalPharmacy className="mr-2" /> Our Medicines
        </h1>
        
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search medicines..."
              className="w-full py-3 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-4 text-gray-400" />
          </div>
          
          <div className="relative w-full md:w-64">
            <select
              className="w-full py-3 px-4 pr-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <FaFilter className="absolute right-3 top-4 text-gray-400" />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">${product.price.toFixed(2)}</span>
                    <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600">No products found matching your criteria</h3>
            <button 
              className="mt-4 text-blue-600 hover:text-blue-800"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;