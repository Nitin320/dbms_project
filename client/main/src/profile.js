// src/Profile.js
import {React, useEffect} from 'react';

const role = localStorage.getItem('userRole');

const Profile = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">{role}</h1>
    </div>
  );
};

export default Profile;
