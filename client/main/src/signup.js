// src/Signup.js
import React, { useState, useEffect } from 'react';
import GradientBackground from './gradientBackground'; // Import the GradientBackground component
import Lottie from 'lottie-react';
import animationData from "./assets/search.json";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  // States for form fields
  const [name, setName] = useState(''); // New state for name input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [club, setClub] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2600);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`Name: ${name}, Email: ${email}, Password: ${password}, Role: ${role}, Club: ${club}`);
    navigate('/signin');
    alert(`Email: ${email}, Password: ${password}, Role: ${role}, Club: ${club}`);

    const userData = {
      name, 
      email,
      password,
      club,
      role,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/signup', {
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
      alert('Sign-up successful!'); // Optional: Update based on your needs
    } catch (error) {
      console.error('Error sending data:', error);
      alert('Sign-up failed. Please try again.'); // Optional: Update based on your needs
    }
  };

  return (
    <div className="relative min-h-screen overflow-y-auto overflow-x-hidden text-white">
      <GradientBackground /> {/* Include the moving gradient background */}
      
      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center z-50">
          {/* Background Overlay */}
          <div className="relative flex items-center justify-center p-6 rounded-full z-50">
            <Lottie className="h-32 w-32" animationData={animationData} />
          </div>
        </div>
      ) : (
        <>
          {/* Form Container */}
          <div className="absolute inset-0 flex items-center justify-center overflow-y-auto pb-12 pt-[25vh]"> {/* Added py-12 for top and bottom margin */}
            <div className="w-full max-w-md p-4 space-y-8 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 mt-10"> {/* Added mt-10 for top margin */}
              <h2 className="text-3xl font-extrabold text-center">Sign Up</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input Field */}
                <div className="relative group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 mt-1 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform group-hover:-translate-y-1 group-hover:scale-105"
                    placeholder="Enter your name"
                  />
                </div>

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

                {/* Role Dropdown */}
                <div className="relative group">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-200">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 mt-1 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform group-hover:-translate-y-1 group-hover:scale-105"
                  >
                    <option value="" disabled>Select your role</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Lead">Lead</option>
                    <option value="Member">Member</option>
                  </select>
                </div>

                {/* Club Dropdown */}
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
                  Sign Up
                </button>

                <div className="text-center text-sm mt-4">
                  <span className="text-gray-300">Already have an account? </span>
                  <a href="/signin" className="text-blue-400 hover:underline">Sign In</a>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Signup;
