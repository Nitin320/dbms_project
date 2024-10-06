// src/Profile.js
import {React, useEffect} from 'react';
import {role} from './signin'

const Profile = () => {
    useEffect(() => {
        
        console.log("Happyy")
        console.log(role)
    }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">{role}</h1>
    </div>
  );
};

export default Profile;
