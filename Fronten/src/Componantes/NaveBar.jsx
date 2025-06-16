import React, { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { UserContext } from "../context/UserContextProvider"; // adjust path if needed

const Navbar = () => {
  const { user, logout } = useContext(UserContext); // ✅ Actual context
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const ProfileIcon = () => (
    <svg
      className="w-6 h-6 fill-current text-white"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2a5 5 0 0 0 0 10 5 5 0 0 0 0-10Zm0 12c-5 0-9 2.5-9 5.5V22h18v-2.5c0-3-4-5.5-9-5.5Z" />
    </svg>
  );

  return (
    <header style={{ position: "relative" }} className="bg-[#14121F] position-relative text-white px-4 sm:px-6 md:px-12 lg:px-16 py-4 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">


        {/* Logo */}
        <div className="text-xl md:text-2xl font-bold">
          <a href="/">Fitbod</a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6  font-medium">
          <a href="/" className="hover:text-pink-500 transition">Home</a>
          <a href="/exercises" className="hover:text-pink-500 transition">Exercises</a>
          <a href="/blog" className="hover:text-pink-500 transition">Blog</a>
          <a href="/aboutus" className="hover:text-pink-500 transition">About</a>
          <a href="/contact" className="hover:text-pink-500 transition">Contact Us</a>
        </nav>
        {/* Left side - Login/Profile */}
        <div className="flex items-center justify-center gap-4">
          {user ? (
            <a href="/profile" className="p-2  rounded-full text-center transition">
               <img
              src={user?.profile_img ? `/upload/${user.profile_img}` : "/default-profile.png"}
              alt="Profile"
              className="w-15 h-15 rounded-full object-cover border-4 border-white"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-profile.png";
              }}
            />
            {/* <p>{user.lastname}</p> */}
            </a>
          ) : (
            <a
              href="/login"
              className="text-sm font-semibold hover:text-pink-500 transition"
            >
              Login
            </a>
          )}
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-[#1a1828] rounded-lg shadow-md p-4 space-y-4 text-sm font-medium">
          <a href="/" className="block hover:text-pink-500">Home</a>
          <a href="/exercises" className="block hover:text-pink-500">Exercises</a>
          <a href="/blog" className="block hover:text-pink-500">Blog</a>
          <a href="/aboutus" className="block hover:text-pink-500">About</a>
          <a href="/contact" className="block hover:text-pink-500">Contact Us</a>
          {!user && (
            <a
              href="/login"
              className="block bg-pink-500 hover:bg-pink-600 text-center py-2 rounded-lg font-semibold transition"
            >
              Login
            </a>
          )}
        </div>
      )}


    </header>
  );
};

export default Navbar;
