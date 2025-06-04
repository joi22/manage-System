import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';

const Dashboard_Layout = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-gray-800 text-white p-4 flex space-x-6">
        <Link to="/" className="hover:text-blue-300">Home</Link>
        <Link to="/profile" className="hover:text-blue-300">Profile</Link>
        {user?.role === 'admin' && (
          <Link to="/dashboard" className="hover:text-blue-300">Admin Dashboard</Link>
        )}
      </nav>

      {/* Main content */}
      <main className="p-6 bg-gray-100 flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard_Layout;
