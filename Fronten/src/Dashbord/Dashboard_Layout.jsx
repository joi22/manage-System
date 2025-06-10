import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
// import { FiMenu, FiX, FiActivity, FiNutrition, FiDumbbell, FiBell } from 'react-icons/fi';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-30 w-64 bg-gray-800 text-white flex flex-col`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Fitness Dashboard</h1>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-400 hover:text-white"
          >
          
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/dashboard/analytics"
            className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            {/* <FiActivity className="mr-3" /> */}
            Analytics
          </Link>
          <Link
            to="/dashboard/nutrition"
            className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            {/* <FiNutrition className="mr-3" /> */}
            Nutrition Log
          </Link>
          <Link
            to="/dashboard/workouts"
            className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            {/* <FiDumbbell className="mr-3" /> */}
            Workouts
          </Link>
          <Link
            to="/notifications"
            className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            {/* <FiBell className="mr-3" /> */}
            Notifications
            <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              3
            </span>
          </Link>
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-gray-700">
          <div className="text-sm text-gray-400">Fitness App v1.0</div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden bg-gray-800 text-white p-4 flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white mr-4"
          >
            {/* <FiMenu size={24} /> */}
          </button>
          <h1 className="text-xl font-bold">Dashboard</h1>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;