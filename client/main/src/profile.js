// src/Profile.js
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(
    localStorage.getItem('profilePicture') || `https://ui-avatars.com/api/?name=${localStorage.getItem('name') || 'No Name'}&background=random&size=100`
  );

  const role = localStorage.getItem('userRole') || 'No Role Found';
  const club = localStorage.getItem('club') || 'No Club Found';
  const mail = localStorage.getItem('mail') || 'No Email Found';
  const name = localStorage.getItem('name') || 'No Name Found';

  // Function to handle image upload
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setProfilePicture(result);
        localStorage.setItem('profilePicture', result); // Save the uploaded image in localStorage
      };
      reader.readAsDataURL(file); // Read file as a data URL
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      {/* Profile Container */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg text-center">
        {/* Profile Image with Upload Functionality */}
        <div className="relative mb-4">
          <img
            src={profilePicture}
            alt="Profile Avatar"
            className="w-24 h-24 mx-auto rounded-full shadow-lg border-4 border-gray-700 cursor-pointer" // Cursor pointer indicates clickability
            onClick={() => document.getElementById('fileInput').click()} // Trigger file input on image click
          />
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleProfilePictureUpload}
            style={{ display: 'none' }} // Hide file input
          />
        </div>
        
        {/* Profile Information */}
        <div className="space-y-2">
          {/* Name */}
          <div className="bg-gray-700 p-2 rounded-lg shadow hover:bg-gray-600 transition duration-200">
            <h2 className="text-lg font-semibold">Name</h2>
            <p className="text-gray-300 text-sm">{name}</p>
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
