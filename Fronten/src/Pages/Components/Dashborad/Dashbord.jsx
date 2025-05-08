import React, { useState } from 'react';


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex">
      
      <div className="flex-1 min-h-screen">
       
        <main className="p-4 mt-4">
          <h2 className="text-2xl font-semibold">Dashboard Content</h2>
          {/* Your main dashboard content goes here */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
