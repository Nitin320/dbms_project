// src/home.js
import React from 'react';
import { motion } from 'framer-motion'; // Importing from Framer Motion
import Lottie from 'lottie-react'; // Importing Lottie for animations
import animationData from "./assets/home.json"; // Placeholder for Lottie animation

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

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      {/* Main Lottie Animation Placeholder */}
      <div className="mb-8">
        <Lottie animationData={animationData} className="h-80 w-80" />
      </div>

      {/* Buttons Row */}
      <div className="flex space-x-8">
        {/* Signup Button */}
        <a href='/signup'><motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="relative p-4 rounded-lg cursor-pointer overflow-hidden border-2 border-transparent w-52" // Increase width here
        >
          <motion.span 
            className="absolute inset-0 border-2 border-gray-400 rounded-lg" 
            variants={buttonVariants}
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }} // Grow border on hover
            transition={{ duration: 0.3 }} // Smooth transition
          />
          <div className="relative z-10 bg-gray-700 hover:bg-gray-600 transition duration-200 ease-in-out p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-center">Sign Up</h2> {/* Centered text */}
          </div>
        </motion.div></a>

        {/* Sign In Button */}
        <a href='/signin'><motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="relative p-4 rounded-lg cursor-pointer overflow-hidden border-2 border-transparent w-52" // Increase width here
        >
          <motion.span 
            className="absolute inset-0 border-2 border-gray-400 rounded-lg" 
            variants={buttonVariants}
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }} // Grow border on hover
            transition={{ duration: 0.3 }} // Smooth transition
          />
          <div className="relative z-10 bg-gray-700 hover:bg-gray-600 transition duration-200 ease-in-out p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-center">Sign In</h2> {/* Centered text */}
          </div>
        </motion.div></a>
      </div>
    </div>
  );
};

export default Home;
