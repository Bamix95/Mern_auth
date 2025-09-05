import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col">
      <h1 className="text-gray-700 text-base">
        <span className="font-semibold text-2xl text-black">404 </span>| Page
        Not Found
      </h1>

      <Link
        to="/"
        className="mt-8 py-2.5 px-8 border border-gray-300 rounded-lg outline-none cursor-pointer hover:bg-gray-100 
        hover:shadow-md transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
