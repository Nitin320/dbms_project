// src/Lead.js
import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Importing user logo

const Lead = () => {
  // Array for the functionality boxes
  const functionalities = [
    { id: 1, name: 'View Events', description: 'Click here to view all events' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Top bar with user logo */}
      <div className="w-full py-4 px-8 flex justify-end bg-gray-800">
      <a href='/profile'><FaUserCircle className="text-3xl text-gray-300 hover:text-white transition duration-200 ease-in-out cursor-pointer" /></a>
      </div>

      {/* Main content wrapper with flexbox to centralize content */}
      <div className="flex-grow flex items-center justify-center">
        {/* Content grid for the functionality box */}
        <div className="w-full max-w-md p-8">
          {functionalities.map((func) => (
            <a href='/memberEvents'><div
              key={func.id}
              className="relative group p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer shadow-lg flex items-center justify-center"
            >
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">{func.name}</h3>
                <p className="text-gray-400">{func.description}</p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-30 transition duration-300 ease-in-out rounded-lg"></div>
            </div></a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lead;
