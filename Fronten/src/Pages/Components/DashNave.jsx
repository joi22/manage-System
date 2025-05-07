import { Link } from "react-router-dom";

const DashNave = ({ isOpen }) => {
  return (
    <div className={`bg-gray-800 text-white h-full fixed top-0 left-0 w-64 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-40`}>
      <div className="p-4 text-xl font-semibold border-b border-gray-700">EventManager</div>
      <nav className="flex flex-col gap-4 p-4">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/events" className="hover:bg-gray-700 p-2 rounded">Events</Link>
        <Link to="/create" className="hover:bg-gray-700 p-2 rounded">Create Event</Link>
        <Link to="/profile" className="hover:bg-gray-700 p-2 rounded">Profile</Link>
        <button className="hover:bg-gray-700 p-2 rounded">Login</button>
        <button className="hover:bg-gray-700 p-2 rounded">Logout</button>
      </nav>
    </div>
  );
};

export default DashNave;
