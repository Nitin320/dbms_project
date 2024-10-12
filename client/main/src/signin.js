import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from "./assets/search.json";
import GradientBackground from './gradientBackground';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
  // States for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [club, setClub] = useState(''); // New state for Club
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`Email: ${email}, Password: ${password}, Club: ${club}`);

    // Fetch club ID based on the selected club
    const clubId = await getClubId(club);

    const userData = {
      email,
      password,
      club,
      club_id: clubId, // Add club_id to userData
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/signin', {
        method: 'POST',
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
      
      console.log("User role:", data.data.role);

      alert('Sign-in successful!'); // Optional: Update based on your needs

      // Navigate immediately based on the response's role value
      console.log(data.data.club)
      localStorage.setItem('userRole', data.data.role);
      localStorage.setItem('club', data.data.club);
      localStorage.setItem('mail', data.data.email);
      localStorage.setItem('name', data.data.name);
      localStorage.setItem('uid', data.data.uid);

      if (data.data.pfp) {
        localStorage.setItem('pfp', data.data.pfp);
      }

      if (data.data.role === "Lead") {
        navigate('/lead');
      } else if (data.data.role === "Co-Lead") {
        navigate('/colead');
      } else if (data.data.role === "Faculty") {
        navigate('/faculty');
      } else if (data.data.role === "Member") {
        navigate('/member');
      }
      
    } catch (error) {
      console.error('Error sending data:', error);
      alert('Sign-in failed. Please try again.'); // Optional: Update based on your needs
    }
  };

  const getClubId = async (clubName) => {
    // You might want to store club names and IDs in an array
    const clubs = {
      "GDSC": 1,
      "Media Club": 2,
      "Coding Club": 3,
    };
    return clubs[clubName] || null; // Return the corresponding club ID
};

  return (
    <div className="relative min-h-screen text-white">
      <GradientBackground /> {/* Include the moving gradient background */}
      
      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center z-50">
          {/* Background Overlay */}
          <div className="relative flex items-center justify-center p-6 rounded-full z-50">
            <Lottie className="h-32 w-32" animationData={animationData} />
          </div>
        </div>
      ) : (
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

              {/* Signup Link */}
              <div className="text-center text-sm mt-4">
                <span className="text-gray-300">Don't have an account? </span>
                <a href="/signup" className="text-blue-400 hover:underline">Sign up</a>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;