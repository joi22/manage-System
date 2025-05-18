import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-[#14121F] text-white py-16 px-6 md:px-16" style={{
                 backgroundImage: 'url("/media/her-1.jpg")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height :'550px',
        }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left" >
          {/* Badge */}
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <img src="/apple-icon.svg" alt="Apple Icon" className="w-6 h-6" />
            <span className="text-sm font-semibold">Editor’s Choice</span>
            <span className="text-pink-500 text-sm">250,000+ Reviews</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Effortless Workout <br className="hidden sm:block" />
            <span className="text-pink-500">Planning</span>
          </h1>

          {/* Description */}
          <p className="text-gray-300">
            Fitbod builds custom-fit workouts, designed to meet your goals on your terms.
            <br />
            Available on iOS and Android.
          </p>

          {/* CTA Button */}
          <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition">
            START NOW
          </button>
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 flex justify-center relative">
          {/* <img
            src="/media/hero-2.jpg"
            alt="App screen 1"
            className="w-[220px] md:w-[260px] z-10 relative"
          />
          <img
            src="/media/her-1.jpg"
            alt="App screen 2"
            className="w-[220px] md:w-[260px] absolute top-10 left-20 hidden sm:block"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
