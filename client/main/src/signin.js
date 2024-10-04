// src/SignIn.js
import React, { useState } from 'react';

const SignIn = () => {
  // States for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [club, setClub] = useState(''); // New state for Club

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`Email: ${email}, Password: ${password}, Club: ${club}`);

    const userData = {
      email,
      password,
      club,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/signin', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        alert('Incorrect Credentials!');
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data); // Handle response data as needed
      alert('Sign-in successful!'); // Optional: Update based on your needs
    } catch (error) {
      console.error('Error sending data:', error);
      alert('Sign-in failed. Please try again.'); // Optional: Update based on your needs
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {/* Form container */}
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 fade-in">
        <h2 className="text-3xl font-extrabold text-center">Sign In</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input Field */}
          <div className="relative group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform group-hover:-translate-y-1 group-hover:scale-105"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input Field */}
          <div className="relative group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform group-hover:-translate-y-1 group-hover:scale-105"
              placeholder="Enter your password"
            />
          </div>

          {/* Club Dropdown - New Dropdown */}
          <div className="relative group">
            <label htmlFor="club" className="block text-sm font-medium text-gray-300">
              Club
            </label>
            <select
              id="club"
              name="club"
              value={club}
              onChange={(e) => setClub(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform group-hover:-translate-y-1 group-hover:scale-105"
            >
              <option value="" disabled>
                Select your club
              </option>
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
  );
};

export default SignIn;
