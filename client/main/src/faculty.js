// src/Lead.js
import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Importing user logo

const Lead = () => {
  // Array for the four functionality boxes
  const functionalities = [
    { id: 1, name: 'Change Lead', description: 'Click here to change the lead' },
    { id: 2, name: 'Change Co-Lead', description: 'Click here to change the co-lead' },
    { id: 3, name: 'Approve Events', description: 'Click here to approve events' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* Top bar with user logo */}
      <div className="w-full py-4 px-8 flex justify-end bg-gray-800">
      <a href='/profile'><FaUserCircle className="text-3xl text-gray-300 hover:text-white transition duration-200 ease-in-out cursor-pointer" /></a>
      </div>

      {/* Main content wrapper */}
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
      </div>
    </div>
  );
};

export default Lead;
