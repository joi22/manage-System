import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Counter = () => {
 return (
    <section className="bg-[#222230] text-white py-7">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center text-center gap-16">
          {/* Rating */}
          <div>
            <div className="flex justify-center mb-2">
              {[...Array(4)].map((_, i) => (
                <FaStar key={i} className="text-pink-500 text-2xl" />
              ))}
              <FaStarHalfAlt className="text-pink-500 text-2xl" />
            </div>
            <p className="text-lg font-semibold">4.8 Rating</p>
          </div>

          {/* Downloads */}
          <div>
            <h2 className="text-3xl font-bold">15M+</h2>
            <p className="text-lg font-medium">Downloads</p>
          </div>

          {/* Workouts Logged */}
          <div>
            <h2 className="text-3xl font-bold">120M+</h2>
            <p className="text-lg font-medium">Workouts logged</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Counter