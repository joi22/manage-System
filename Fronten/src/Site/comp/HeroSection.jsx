import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-[#14121F] text-white py-16 px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          {/* Badge */}
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <img src="/media/apple-icon.svg" alt="Apple Icon" className="w-6 h-6" />
            <span className="text-sm font-semibold">Editor’s Choice</span>
            <span className="text-pink-500 text-sm">250,000+ Reviews</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Effortless Workout <br className="hidden sm:block" />
            <span className="text-pink-500">Planning</span>
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-base sm:text-lg">
            Fitbod builds custom-fit workouts, designed to meet your goals on your terms.
            <br />
            Available on iOS and Android.
          </p>

          {/* CTA */}
          <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition">
            START NOW
          </button>
        </div>

        {/* Right Content - Phones */}
        <div className="w-full md:w-1/2 relative flex justify-center items-center">
          {/* Mobile Stack */}
          <div className="flex md:hidden flex-col items-center gap-6">
            <img src="/media/hero-2.jpg" alt="Phone Front" className="w-[240px]" />
            <img src="/media/hero-3.jpg" alt="Phone Back" className="w-[240px]" />
          </div>

          {/* Desktop Overlap */}
          <div className="hidden md:block relative">
            <img
              src="/media/hero-2.jpg"
              alt="Phone Front"
              className="w-[240px] z-10 relative"
            />
            <img
              src="/media/hero-3.jpg"
              alt="Phone Back"
              className="w-[220px] absolute top-10 -left-16 z-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
