import React from 'react'

const Dashbord = () => {
   return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="1024" />
        <StatCard title="Workouts Logged" value="8376" />
        <StatCard title="Nutrition Entries" value="5219" />
        <StatCard title="Progress Updates" value="1987" />
      </div>
    </div>
  );
}

export default Dashbord