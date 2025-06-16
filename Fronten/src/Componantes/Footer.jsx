// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Fitness Tracker. All rights reserved.
        </div>
        <div className="flex gap-4 text-sm">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/aboutus" className="hover:underline">About</Link>
          <Link to="/Support" className="hover:underline">Contact</Link>
          <Link to="/blog" className="hover:underline">Blog</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
