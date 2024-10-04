// src/SignIn.js
import React, { useState } from 'react';
import ShootingStars from './ShootingStars'; // Import the ShootingStars component

const SignIn = () => {
  // States for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [club, setClub] = useState(''); // New state for Club

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}, Password: ${password}, Club: ${club}`);
  };

  return (
    <div className="relative min-h-screen text-white">
      <ShootingStars />
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Form container with adjusted background color */}
        <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 bg-opacity-90 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-3xl font-extrabold text-center">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input Field */}
            <div className="relative group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform group-hover:-translate-y-1 group-hover:scale-105"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input Field */}
            <div className="relative group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform group-hover:-translate-y-1 group-hover:scale-105"
                placeholder="Enter your password"
              />
            </div>

            {/* Club Dropdown - New Dropdown */}
            <div className="relative group">
              <label htmlFor="club" className="block text-sm font-medium text-gray-200">
                Club
              </label>
              <select
                id="club"
                name="club"
                value={club}
                onChange={(e) => setClub(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform group-hover:-translate-y-1 group-hover:scale-105"
              >
                <option value="" disabled>Select your club</option>
                <option value="GDSC">GDSC</option>
                <option value="Media Club">Media Club</option>
                <option value="Coding Club">Coding Club</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 text-lg font-semibold text-gray-900 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
