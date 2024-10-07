// src/Profile.js
import React from 'react';

const Profile = () => {
  const role = localStorage.getItem('userRole') || 'No Role Found';
  const club = localStorage.getItem('club') || 'No Club Found';
  const mail = localStorage.getItem('mail') || 'No Email Found';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      {/* Profile Container */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-10 w-full max-w-lg text-center">
        {/* Profile Image */}
        <div className="mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${role}&background=random&size=128`}
            alt="Profile Avatar"
            className="w-32 h-32 mx-auto rounded-full shadow-lg border-4 border-gray-700"
          />
        </div>
        
        {/* Profile Information */}
        <div className="space-y-4">
          {/* Role */}
          <div className="bg-gray-700 p-4 rounded-lg shadow hover:bg-gray-600 transition duration-200">
            <h2 className="text-xl font-semibold">Role</h2>
            <p className="text-gray-300 text-lg">{role}</p>
          </div>
          
          {/* Club */}
          <div className="bg-gray-700 p-4 rounded-lg shadow hover:bg-gray-600 transition duration-200">
            <h2 className="text-xl font-semibold">Club</h2>
            <p className="text-gray-300 text-lg">{club}</p>
          </div>
          
          {/* Email */}
          <div className="bg-gray-700 p-4 rounded-lg shadow hover:bg-gray-600 transition duration-200">
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="text-gray-300 text-lg">{mail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
