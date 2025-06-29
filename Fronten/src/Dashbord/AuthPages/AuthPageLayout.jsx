import React from "react";
import GridShape from "../../common/Gridshape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../common/ThemeTogglerTwo";

export default function AuthLayout({ children }) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 lg:grid">
          <div className="relative flex items-center justify-center w-full h-full">
            <img
              src="/media/12.jpg"
              alt="Side Visual"
              className="w-full h-full object-cover"
            />
            {/* Optional overlay or design */}
            <div className="absolute inset-0 bg-black/20 z-10" />
            <GridShape />
          </div>
        </div>
        {/* <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div> */}
      </div>
    </div>
  );
}
