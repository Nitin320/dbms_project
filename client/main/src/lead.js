// src/Lead.js
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Lottie from 'lottie-react';
import animationData from "./assets/search.json";
import GradientBackground from './gradientBackground';

const Lead = () => {
  const functionalities = [
    { id: 1, name: 'Create Event', description: 'Click here to create an event' },
    { id: 2, name: 'Delete Event', description: 'Click here to delete an event' },
    { id: 3, name: 'Add Members', description: 'Click here to add a member' },
    { id: 4, name: 'Delete Members', description: 'Click here to remove a member' },
  ];

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center overflow-hidden">
      {/* Adjusted position and z-index of GradientBackground */}
      <div className="absolute inset-0 -z-10">
        <GradientBackground />
      </div>

      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center z-50">
          <div className="relative flex items-center justify-center p-6 rounded-full z-50">
            <Lottie className="h-32 w-32" animationData={animationData} />
          </div>
        </div>
      ) : (
        <>
          {/* Header Section */}
          <div className="w-full py-4 px-8 flex justify-end bg-gray-800 z-20">
            <FaUserCircle className="text-3xl text-gray-300 hover:text-white transition duration-200 ease-in-out cursor-pointer" />
          </div>

          {/* Main content with four functionality boxes */}
          <div className="w-full max-w-6xl mt-16 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 z-20">
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
        </>
      )}
    </div>
  );
};

export default Lead;
