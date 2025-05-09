import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">TailAdmin</h2>
          <button className="lg:hidden" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        {/* Sidebar content */}
        <nav className="p-4 space-y-4">
          <a href="#" className="block  text-gray-700 hover:text-blue-600">Dashboard</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Orders</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Products</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Settings</a>
          
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
