import React from 'react'
// FitbodNavbar.jsx
import { ChevronDown } from "lucide-react";
const NaveBar = () => {
   return (
    <nav className="bg-[#14141E] text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-tight">
        <span className="text-white">FIT</span>
        <span className="text-white font-extrabold">BOD</span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center space-x-6 text-sm font-semibold">
        <div className="flex items-center space-x-1 cursor-pointer hover:text-pink-500">
          <span>Articles</span>
          <ChevronDown className="w-4 h-4" />
        </div>
        <a href="#" className="hover:text-pink-500">Workouts</a>
        <a href="/blog" className="hover:text-pink-500">Exercises</a>
        
        <div className="border-l h-4 border-gray-600 mx-2" />

        <a href="#" className="hover:text-pink-500">Log In</a>
        
        <div className="flex items-center space-x-1 cursor-pointer hover:text-pink-500">
          <span>More</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {/* CTA Button */}
      <button className="bg-[#F54770] text-white px-4 py-2 rounded-xl font-semibold hover:bg-pink-600 transition">
        Try Fitbod
      </button>
    </nav>
  );
}

export default NaveBar