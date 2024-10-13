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
    borderColor: '#ffffff', 
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)', 
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 20 
    }
  },
  tap: { 
    scale: 0.95, 
    transition: { 
      type: 'spring', 
      stiffness: 300,
      damping: 20 
    }
  },
};

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 relative">
      {/* ClubSync Animation */}
      
        

      {/* Transition "ClubSync" to the top after conjoining in the center */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: '-40vh' }}
        transition={{ duration: 0.8, delay: 1.5, ease: 'easeInOut' }} // Delay added to hold in the center before moving up
        className="absolute text-4xl font-bold text-center flex"
      >
        <span className="text-blue-400">Club</span>
        <span className="text-pink-400">Sync</span>
      </motion.div>

      {/* Main Lottie Animation Placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.8 }} // Adjusted delay to start after "ClubSync" moves up
        className="mb-8"
      >
        <Lottie animationData={animationData} className="h-64 w-64" />
      </motion.div>

      {/* Buttons Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.8 }} // Adjusted delay for buttons too
        className="flex space-x-8"
      >
        {/* Signup Button */}
        <a href='/signup'>
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
              <h2 className="text-lg font-semibold text-center">Sign Up</h2>
            </div>
          </motion.div>
        </a>

        {/* Sign In Button */}
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
      </motion.div>
    </div>
  );
};

export default Home;
