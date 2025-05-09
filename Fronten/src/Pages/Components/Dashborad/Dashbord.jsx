import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex">
      <div className="flex-1 min-h-screen">
       
       
        <main className="p-4 mt-4">
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
