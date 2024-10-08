import React, { useState } from 'react';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(
    localStorage.getItem('pfp') || `https://ui-avatars.com/api/?name=${localStorage.getItem('name') || 'No Name'}&background=random&size=100`
  );

  const role = localStorage.getItem('userRole') || 'No Role Found';
  const club = localStorage.getItem('club') || 'No Club Found';
  const mail = localStorage.getItem('mail') || 'No Email Found';
  const name = localStorage.getItem('name') || 'No Name Found';

  // Function to convert file to base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (file && file instanceof Blob) {  // Validate that `file` is defined and is a Blob (File is a type of Blob)
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file); // This converts the file to a base64 string
      } else {
        reject(new Error("Invalid file type or file is null")); // Reject if file is invalid
      }
    });
  };

  // Function to handle image upload
  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (!file) return; // Exit if no file is selected

    try {
      const base64String = await convertFileToBase64(file); // Convert file to base64 string
      const fileName = file.name; // Get the file name

      // Create JSON payload containing the filename and base64 image string
      const jsonPayload = {
        uid: localStorage.getItem('uid'),
        filename: fileName,
        image: base64String,
      };

      const response = await fetch('http://127.0.0.1:5000/api/uploadPfp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Include token if needed
        },
        body: JSON.stringify(jsonPayload), // Send the payload as JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Profile picture uploaded successfully:', data);
        // Optionally update the profile picture URL in localStorage if the server returns it
        localStorage.setItem('profilePicture', data.profilePictureUrl);
        setProfilePicture(data.profilePictureUrl); // Update the local profile picture
      } else {
        throw new Error('Failed to upload profile picture');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
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
