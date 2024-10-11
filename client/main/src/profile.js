import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(
    `https://ui-avatars.com/api/?name=${localStorage.getItem('name') || 'No Name'}&background=random&size=100`
  );

  const role = localStorage.getItem('userRole') || 'No Role Found';
  const club = localStorage.getItem('club') || 'No Club Found';
  const mail = localStorage.getItem('mail') || 'No Email Found';
  const name = localStorage.getItem('name') || 'No Name Found';

  // Function to fetch profile picture on component mount
  useEffect(() => {
    const fetchProfilePicture = async () => {
      const uid = localStorage.getItem('uid');
      console.log('Fetching profile picture for UID:', uid);
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/getPfp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: JSON.stringify({ uid }), // Sending uid as JSON
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Received data:', data);
          if (data.data.pfp) {
            localStorage.setItem('pfp', data.data.pfp);
            setProfilePicture(data.data.pfp);
            console.log(profilePicture);
          } else {
            localStorage.setItem('pfp', null);
            setProfilePicture(`https://ui-avatars.com/api/?name=${name}&background=random&size=100`);
          }
        } else {
          console.error('Failed to fetch profile picture:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };
  
    fetchProfilePicture();
  }, []);  
   // Empty dependency array means this runs once when the component mounts

  // Function to convert file to base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (file && file instanceof Blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      } else {
        reject(new Error("Invalid file type or file is null"));
      }
    });
  };

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const base64String = await convertFileToBase64(file);
      const fileName = file.name;

      const jsonPayload = {
        uid: localStorage.getItem('uid'),
        filename: fileName,
        image: base64String,
      };

      const response = await fetch('http://127.0.0.1:5000/api/uploadPfp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(jsonPayload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Profile picture uploaded successfully:', data);

        if (data.data.pfp) {
          localStorage.setItem('pfp', data.data.pfp);
          setProfilePicture(data.data.pfp);
        } else {
          localStorage.setItem('pfp', null);
          setProfilePicture(`https://ui-avatars.com/api/?name=${name}&background=random&size=100`);
        }
      } else {
        throw new Error('Failed to upload profile picture');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg text-center">
        <div className="relative mb-4">
          <img
            src={profilePicture}
            alt="Profile Avatar"
            className="w-24 h-24 mx-auto rounded-full shadow-lg border-4 border-gray-700 cursor-pointer"
            onClick={() => document.getElementById('fileInput').click()}
          />
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleProfilePictureUpload}
            style={{ display: 'none' }}
          />
        </div>
        
        <div className="space-y-2">
          <div className="bg-gray-700 p-2 rounded-lg shadow hover:bg-gray-600 transition duration-200">
            <h2 className="text-lg font-semibold">Name</h2>
            <p className="text-gray-300 text-sm">{name}</p>
          </div>
          <div className="bg-gray-700 p-2 rounded-lg shadow hover:bg-gray-600 transition duration-200">
            <h2 className="text-lg font-semibold">Role</h2>
            <p className="text-gray-300 text-sm">{role}</p>
          </div>
          <div className="bg-gray-700 p-2 rounded-lg shadow hover:bg-gray-600 transition duration-200">
            <h2 className="text-lg font-semibold">Club</h2>
            <p className="text-gray-300 text-sm">{club}</p>
          </div>
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
