// src/Lead.js
// src/Lead.js
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Importing user logo
import Lottie from 'lottie-react';
import animationData from "./assets/pages.json";
import GradientBackground from './gradientBackground';

const Lead = () => {
  // Array for the four functionality boxes
  const functionalities = [
    { id: 1, name: 'Change Lead', description: 'Click here to change the lead' },
    { id: 2, name: 'Change Co-Lead', description: 'Click here to change the co-lead' },
    { id: 3, name: 'Approve Events', description: 'Click here to approve events' },
  ];

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulate loading animation for 3.5 seconds
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* Top bar with user logo */}
      <div className="absolute inset-0 -z-10">
        <GradientBackground />
      </div>

      <div className="w-full py-4 px-8 flex justify-end bg-gray-800">
      <a href='/profile'><FaUserCircle className="text-3xl text-gray-300 hover:text-white transition duration-200 ease-in-out cursor-pointer" /></a>
      </div>
      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center z-50">
          <div className="relative flex items-center justify-center p-6 rounded-full z-50">
            <Lottie className="h-64 w-64" animationData={animationData} />
          </div>
        </div>
      ) : (
      <>
      <div className="flex-grow flex items-center justify-center w-full">
        {/* Grid layout for the boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {functionalities.slice(0, 2).map((func) => (
            <div
              key={func.id}
              className="relative group p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4">{func.name}</h3>
              <p className="text-gray-400">{func.description}</p>
              {/* Hover effect */}
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-30 transition duration-300 ease-in-out rounded-lg"></div>
            </div>
          ))}
          
          {/* Third box centralized under the first two */}
          <div
            key={functionalities[2].id}
            className="relative group md:col-span-2 flex items-center justify-center p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer shadow-lg"
          >
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">{functionalities[2].name}</h3>
              <p className="text-gray-400">{functionalities[2].description}</p>
            </div>
            {/* Hover effect */}
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-30 transition duration-300 ease-in-out rounded-lg"></div>
          </div>
        </div>
      </div></>
      )}
    </div>
  );
};

export default Lead;
