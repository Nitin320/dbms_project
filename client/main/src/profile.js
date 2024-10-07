// src/Profile.js
import React from 'react';

const Profile = () => {
  const role = localStorage.getItem('userRole') || 'No Role Found';
  const club = localStorage.getItem('club') || 'No Club Found';
  const mail = localStorage.getItem('mail') || 'No Email Found';
  const name = localStorage.getItem('name') || 'No Name Found';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      {/* Profile Container */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg text-center">
        {/* Profile Image */}
        <div className="mb-4">
          <img
            src={`https://ui-avatars.com/api/?name=${name}&background=random&size=100`} // Smaller avatar size
            alt="Profile Avatar"
            className="w-24 h-24 mx-auto rounded-full shadow-lg border-4 border-gray-700" // Adjusted image size
          />
        </div>
        
        {/* Profile Information */}
        <div className="space-y-2"> {/* Reduced space between items */}
          {/* Name */}
          <div className="bg-gray-700 p-2 rounded-lg shadow hover:bg-gray-600 transition duration-200">
            <h2 className="text-lg font-semibold">Name</h2> {/* Smaller text size */}
            <p className="text-gray-300 text-sm">{name}</p> {/* Smaller text size */}
          </div>
          
          {/* Role */}
          <div className="bg-gray-700 p-2 rounded-lg shadow hover:bg-gray-600 transition duration-200">
            <h2 className="text-lg font-semibold">Role</h2>
            <p className="text-gray-300 text-sm">{role}</p>
          </div>
          
          {/* Club */}
          <div className="bg-gray-700 p-2 rounded-lg shadow hover:bg-gray-600 transition duration-200">
            <h2 className="text-lg font-semibold">Club</h2>
            <p className="text-gray-300 text-sm">{club}</p>
          </div>
          
          {/* Email */}
          <div className="bg-gray-700 p-2 rounded-lg shadow hover:bg-gray-600 transition duration-200">
            <h2 className="text-lg font-semibold">Email</h2>
            <p className="text-gray-300 text-sm">{mail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
