import React, { useState } from 'react';
import DashNave from '../DashNave';
import TopNavbar from '../TopNavbar';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex">
      <DashNave isOpen={setIsSidebarOpen} />
      <div className="flex-1 min-h-screen">
        <TopNavbar toggleSidebar={toggleSidebar} />
        <main className="p-4 mt-4">
          <h2 className="text-2xl font-semibold">Dashboard Content</h2>
          {/* Your main dashboard content goes here */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
