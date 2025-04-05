import React, { useState } from 'react';
import { FaUser, FaHistory, FaFileUpload, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import { MdLocalPharmacy, MdMedicalServices } from 'react-icons/md';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      date: '2023-05-15',
      doctor: 'Dr. Smith',
      file: 'prescription_1.pdf',
      status: 'Processed'
    },
    {
      id: 2,
      date: '2023-06-20',
      doctor: 'Dr. Johnson',
      file: 'prescription_2.pdf',
      status: 'Pending'
    }
  ]);

  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical St, Health City, HC 12345'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPrescription = {
        id: prescriptions.length + 1,
        date: new Date().toISOString().split('T')[0],
        doctor: 'New Prescription',
        file: file.name,
        status: 'Pending'
      };
      setPrescriptions([...prescriptions, newPrescription]);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-blue-600 text-white flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                  <FaUser size={20} />
                </div>
                <div>
                  <h2 className="font-bold">{userData.name}</h2>
                  <p className="text-sm text-blue-100">{userData.email}</p>
                </div>
              </div>
              <nav className="p-4">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left py-3 px-4 rounded-lg mb-2 flex items-center ${activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <FaUser className="mr-3" /> Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left py-3 px-4 rounded-lg mb-2 flex items-center ${activeTab === 'orders' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <FaHistory className="mr-3" /> Order History
                </button>
                <button
                  onClick={() => setActiveTab('prescriptions')}
                  className={`w-full text-left py-3 px-4 rounded-lg mb-2 flex items-center ${activeTab === 'prescriptions' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <MdMedicalServices className="mr-3" /> My Prescriptions
                </button>
                <button className="w-full text-left py-3 px-4 rounded-lg text-red-600 hover:bg-red-50 flex items-center">
                  <FaSignOutAlt className="mr-3" /> Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center">
                    <FaUser className="mr-2" /> Personal Information
                  </h2>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <FaEdit className="mr-1" /> {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded">{userData.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <p className="px-4 py-2 bg-gray-50 rounded">{userData.email}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Phone</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded">{userData.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Address</label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded whitespace-pre-line">{userData.address}</p>
                    )}
                  </div>

                  {isEditing && (
                    <div className="pt-4">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <FaHistory className="mr-2" /> Order History
                </h2>
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MdLocalPharmacy className="text-gray-400 text-3xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h3>
                  <p className="text-gray-500">Your order history will appear here</p>
                </div>
              </div>
            )}

            {activeTab === 'prescriptions' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center">
                    <MdMedicalServices className="mr-2" /> My Prescriptions
                  </h2>
                  <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer flex items-center">
                    <FaFileUpload className="mr-2" /> Upload Prescription
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.jpg,.png" 
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {prescriptions.map(prescription => (
                        <tr key={prescription.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prescription.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prescription.doctor}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                            <a href="#" className="hover:underline">{prescription.file}</a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${prescription.status === 'Processed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {prescription.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;