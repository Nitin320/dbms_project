// src/GradientBackground.js
import React from 'react';

const GradientBackground = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* First Layer: Diagonal Gradient Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-gray-800 to-blue-900 opacity-40 animate-diagonal-slow"></div>
      
      {/* Second Layer: Circular Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-800 via-gray-900 to-black opacity-60 animate-rotate-scale"></div>

      {/* Third Layer: Horizontal Movement */}
      <div className="absolute inset-0 bg-gradient-to-l from-black via-gray-900 to-gray-800 opacity-30 animate-horizontal-move"></div>
    </div>
  );
};

export default GradientBackground;
