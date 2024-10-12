// src/Member.js
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Importing user logo
import Lottie from 'lottie-react'; // Importing Lottie for animations
import animationData from "./assets/pages.json"; // Animation data file
import GradientBackground from './gradientBackground'; // Gradient background component
import { motion } from 'framer-motion';   

const buttonVariants = {
  initial: { 
    scale: 1, 
    borderColor: 'transparent', 
    boxShadow: '0 0 0 rgba(255, 255, 255, 0)' 
  },
  hover: { 
    scale: 1.05, 
    borderColor: '#ffffff', // Change border color on hover
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)', // Add shadow on hover
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 20 // Adjust damping for smoother return to the original state
    }
  },
  tap: { 
    scale: 0.95, 
    transition: { 
      type: 'spring', 
      stiffness: 300,
      damping: 20 // Maintain damping for smooth tap response
    }
  },
};

const Member = () => {
  // Array for the functionality box
  const functionalities = [
    { id: 1, name: 'View Events', description: 'Click here to view all events' },
  ];

  // State to manage loading animation visibility
  const [loading, setLoading] = useState(false);

  const [authenticate, setAuthenticate] = useState(false)


  useEffect(() => {
    setLoading(true);
    // Simulate loading animation for 3.5 seconds
    setTimeout(() => {
      setLoading(false);
    }, 3500);
    if(localStorage.getItem('userRole') == "Member"){
      setAuthenticate(true)
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center overflow-hidden">
      {/* Gradient background component */}
      <div className="absolute inset-0 -z-10">
        <GradientBackground />
      </div>

      {/* Loading animation section */}
      {authenticate ? (
      <>
        {loading ? (
          <div className="absolute inset-0 flex justify-center items-center z-50">
            <div className="relative flex items-center justify-center p-6 rounded-full z-50">
              <Lottie className="h-64 w-64" animationData={animationData} />
            </div>
          </div>
        ) : (
          <>
            {/* Header Section with Profile Icon */}
            <div className="w-full py-4 px-8 flex justify-end bg-gray-800 z-20">
              <a href='/profile'>
                <FaUserCircle className="text-3xl text-gray-300 hover:text-white transition duration-200 ease-in-out cursor-pointer" />
              </a>
            </div>

            {/* Main content with functionality box for viewing events */}
            <div className="w-full max-w-md mt-20 p-4 z-20"> {/* Adjusted width and padding */}
              {functionalities.map((func) => (
                <a href='/memberEvents' key={func.id}>
                  <div
                    className="relative group p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer shadow-lg flex items-center justify-center"
                  >
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold mb-4">{func.name}</h3> {/* Reduced text size */}
                      <p className="text-gray-400">{func.description}</p> {/* Reduced text size */}
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-30 transition duration-300 ease-in-out rounded-lg"></div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </>
      ):(
        <main class="h-screen flex flex-col items-center justify-center space-y-8">
          <p class="text-4xl font-bold text-white">Please Sign In</p>
          
          <a href='/signin'>
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="relative p-4 rounded-lg cursor-pointer overflow-hidden border-2 border-transparent w-52"
            >
              <motion.span 
                className="absolute inset-0 border-2 border-gray-400 rounded-lg" 
                variants={buttonVariants}
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10 bg-gray-700 hover:bg-gray-600 transition duration-200 ease-in-out p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-center">Sign In</h2>
              </div>
            </motion.div>
          </a>
        </main>

      )}
    </div>
  );
};

export default Member;
