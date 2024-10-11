// src/Lead.js
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Lottie from 'lottie-react';
import animationData from "./assets/pages.json";
import GradientBackground from './gradientBackground';

const Lead = () => {
  const functionalities = [
    { id: 1, name: 'Create Event', description: 'Click here to create an event' },
    { id: 2, name: 'Delete Event', description: 'Click here to delete an event' },
    { id: 3, name: 'Add Members', description: 'Click here to add a member' },
    { id: 4, name: 'Delete Members', description: 'Click here to remove a member' },
  ];

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [venue, setVenue] = useState('');
  const [maxVolunteers, setMaxVolunteers] = useState('');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateEvent = async () => {
    const club_id = localStorage.getItem('club_id');

    const newEvent = {
      club_id,
      eventName,
      startDate,
      endDate,
      eventTime,
      venue,
      maxVolunteers,
    };

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/create_event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Event created successfully!');
        clearForm();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert('An error occurred while creating the event.');
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const clearForm = () => {
    setEventName('');
    setStartDate('');
    setEndDate('');
    setEventTime('');
    setVenue('');
    setMaxVolunteers('');
  };

  const handleFunctionClick = (funcId) => {
    if (funcId === 1) {
      setShowModal(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <GradientBackground />
      </div>

      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center z-50">
          <Lottie className="h-64 w-64" animationData={animationData} />
        </div>
      ) : (
        <>
          <div className="w-full py-4 px-8 flex justify-end bg-gray-800 z-20">
            <a href='/profile'>
              <FaUserCircle className="text-3xl text-gray-300 hover:text-white transition duration-200 ease-in-out cursor-pointer" />
            </a>
          </div>

          <div className="w-full max-w-6xl mt-16 p-8 flex justify-center z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {functionalities.map((func) => (
                <div
                  key={func.id}
                  className="relative group p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer shadow-lg"
                  onClick={() => handleFunctionClick(func.id)}
                >
                  <h3 className="text-2xl font-semibold mb-4">{func.name}</h3>
                  <p className="text-gray-400">{func.description}</p>
                  <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-30 transition duration-300 ease-in-out rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg max-h-[90vh] overflow-y-auto hide-scrollbar">
            <h2 className="text-3xl font-bold mb-6">Create Event</h2>
            <div className="space-y-4">
              <InputField label="Event Name" value={eventName} onChange={setEventName} type="text" />
              <InputField label="Start Date" value={startDate} onChange={setStartDate} type="date" />
              <InputField label="End Date" value={endDate} onChange={setEndDate} type="date" />
              <InputField label="Start Time" value={eventTime} onChange={setEventTime} type="time" />
              <InputField label="Venue" value={venue} onChange={setVenue} type="text" />
              <InputField label="Max Volunteers" value={maxVolunteers} onChange={setMaxVolunteers} type="number" />
            </div>

            <div className="flex justify-center space-x-6 mt-8">
              <Button label="Create" color="green" onClick={handleCreateEvent} />
              <Button label="Cancel" color="red" onClick={() => setShowModal(false)} />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

const InputField = ({ label, value, onChange, type }) => (
  <div>
    <label className="block text-lg font-semibold mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
    />
  </div>
);

const Button = ({ label, color, onClick }) => (
  <button
    className={`py-2 px-4 bg-${color}-500 rounded-lg hover:bg-${color}-600 transition duration-200`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Lead;
