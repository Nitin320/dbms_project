// src/Lead.js
import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Importing user logo

const Lead = () => {
  // Array for the four functionality boxes
  const functionalities = [
    { id: 1, name: 'Functionality 1', description: 'Description for Functionality 1' },
    { id: 2, name: 'Functionality 2', description: 'Description for Functionality 2' },
    { id: 3, name: 'Functionality 3', description: 'Description for Functionality 3' },
    { id: 4, name: 'Functionality 4', description: 'Description for Functionality 4' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* Top bar with user logo */}
      <div className="w-full py-4 px-8 flex justify-end bg-gray-800">
        <FaUserCircle className="text-3xl text-gray-300 hover:text-white transition duration-200 ease-in-out cursor-pointer" />
      </div>

      {/* Main content with four boxes */}
      <div className="w-full max-w-6xl mt-12 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {functionalities.map((func) => (
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
      </div>
    </div>
  );
};

export default Lead;
