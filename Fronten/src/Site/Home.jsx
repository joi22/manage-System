import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import Counter from "./comp/Counter";
import HeroSection from "./comp/HeroSection";


const Home = () => {
  const { user } = useContext(UserContext);
  const userId = user?._id;



  return (
    <><HeroSection />
      <Counter />
      <section className="bg-[#14121F] text-white py-10">
        <div className="container  mx-auto justify-center px-6 flex flex-col-reverse lg:flex-row items-center">
          {/* Text Content */}
          <div className="lg:w-1/2  text-center px-20 lg:text-left space-y-6">
            <p className="text-pink-500 font-semibold uppercase tracking-wide flex items-center justify-center lg:justify-start">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0L9.19 7.62H.62l7.5 5.46-2.86 8.92L12 17.26l7.5 5.74-2.86-8.92 7.5-5.46h-8.57z" />
              </svg>
              How Fitbod Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Take the guesswork out of <span className="text-white">strength training.</span>
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto lg:mx-0">
              Always know what to train, when. Fitbod removes the pain of planning to let you focus on making progress.
            </p>
          </div>

          {/* Image Area */}


          <img
          
            src="/media/sec-1.png"
            alt="Back squat input"
            className="sm:w-100  z-10 rounded-xl  ml-[-40px] relative"
          />

        </div>
      </section>

      <section className="bg-[#14121F] text-white py-10">
        <div className="container justify-center mx-auto px-6 flex flex-col-reverse lg:flex-row items-center">

          {/* Image Area */}
        
            <img
              src="/media/std-2.png"
              alt="Back squat input"
              className="sm:w-100  z-10 rounded-xl  ml-[-40px] relative"
            />
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center px-20 lg:text-left space-y-6">
            <p className="text-pink-500 font-semibold uppercase tracking-wide flex items-center justify-center lg:justify-start">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0L9.19 7.62H.62l7.5 5.46-2.86 8.92L12 17.26l7.5 5.74-2.86-8.92 7.5-5.46h-8.57z" />
              </svg>
              Smart Tracking
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Track your progress every step of the way.
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto lg:mx-0">
              Fitbod uses your training history to adapt your recommendations every day you train.
            </p>
          </div>


        </div>
      </section>

      <section className="bg-[#14121F] text-white py-10">
        <div className="container mx-auto justify-center px-6 flex flex-col-reverse lg:flex-row items-center">


          {/* Text Content */}
          <div className="lg:w-1/2 text-center px-20 lg:text-left space-y-6">
            <p className="text-pink-500 font-semibold uppercase tracking-wide flex items-center justify-center lg:justify-start">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0L9.19 7.62H.62l7.5 5.46-2.86 8.92L12 17.26l7.5 5.74-2.86-8.92 7.5-5.46h-8.57z" />
              </svg>
              Custom-Fit Workouts
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Personalized workouts that adapt to your life.
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto lg:mx-0">
              Fitbod designs each workout around your equipment, preferences, and availability—without sacrificing progress.
            </p>
          </div>

          {/* Image Area */}
      
            <img
              src="/media/std-1.png"
              alt="Back squat input"
              className="sm:w-100  z-10 rounded-xl  ml-[-40px] relative"
            />
          
        </div>
      </section>

      <section className="bg-[#14121F] text-white py-10">
        <div className="container mx-auto justify-center px-6 flex flex-col-reverse lg:flex-row items-center">

          {/* Image Area */}
      

            <img
              src="/media/std-3.png"
              alt="Back squat input"
              className="sm:w-100 z-10 rounded-xl  ml-[-40px] relative"
            />
        
          {/* Text Content */}
          <div className="lg:w-1/2 text-center px-20 lg:text-left space-y-6">
            <p className="text-pink-500 font-semibold uppercase tracking-wide flex items-center justify-center lg:justify-start">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0L9.19 7.62H.62l7.5 5.46-2.86 8.92L12 17.26l7.5 5.74-2.86-8.92 7.5-5.46h-8.57z" />
              </svg>
              Monitored Recovery
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Always know which muscles to train next.
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto lg:mx-0">
              Fitbod analyzes your recovery and training to optimize performance and prevent injury.
            </p>
          </div>


        </div>
      </section>



    </>
  );
};

export default Home;
