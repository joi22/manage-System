import React from 'react';
import { FaBars, FaSearch, FaBell, FaMoon, FaUserCircle } from 'react-icons/fa';

const Topbar = ({ toggleSidebar }) => {
  return (
    <div className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 z-10">
      {/* Left: Menu toggle & search */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="text-gray-600 lg:hidden">
          <FaBars size={20} />
        </button>
        <input
          type="text"
          placeholder="Search or type command..."
          className="hidden md:block w-72 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-6">
        <button className="text-gray-600 hover:text-blue-600">
          <FaMoon size={18} />
        </button>
        <button className="text-gray-600 hover:text-blue-600 relative">
          <FaBell size={18} />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaUserCircle size={28} className="text-blue-600" />
          <span className="font-medium text-gray-800">Musharof</span>
          <span className="text-sm text-gray-500">▼</span>
        </div>
        
      </div>
    </div>
  );
};

export default Topbar;
