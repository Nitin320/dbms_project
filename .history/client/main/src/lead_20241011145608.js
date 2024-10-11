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
    { id: 3, name: 'Delete Members', description: 'Click here to remove a member' },
  ];

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [venue, setVenue] = useState('');
  const [maxVolunteers, setMaxVolunteers] = useState('');
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const handleCreateEvent = async () => {
    // Fetch club_id from local storage
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Event created successfully!');
        setEventName('');
        setStartDate('');
        setEndDate('');
        setEventTime('');
        setVenue('');
        setMaxVolunteers('');
        alert('Event created successfully!');
      } else {
        console.log('Error creating event:', result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while creating the event. Please try again.');
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleFunctionClick = (funcId) => {
    if (funcId === 1) {
      setShowModal(true);
    } else if (funcId === 2) {
      fetchEvents();
      setShowDeleteModal(true);
    }
  };

  const fetchEvents = async () => {
    try {
      const role = localStorage.getItem('userRole');
      const club = localStorage.getItem('club');
      const response = await fetch('http://127.0.0.1:5000/api/getEvents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, club }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  
  const deleteEvent = async (eventId) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/deleteEvent', {
            method: 'DELETE',  // Change this to DELETE
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ eventId: eventId })  // Pass the event ID in the body
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message);  // Success message
            // You may want to refresh your event list or update the UI accordingly
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData.message);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <GradientBackground />
      </div>

      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center z-50">
          <div className="relative flex items-center justify-center p-6 rounded-full z-50">
            <Lottie className="h-64 w-64" animationData={animationData} />
          </div>
        </div>
      ) : (
        <>
          <div className="w-full py-4 px-8 flex justify-end bg-gray-800 z-20">
            <a href='/profile'>
              <FaUserCircle className="text-3xl text-gray-300 hover:text-white transition duration-200 ease-in-out cursor-pointer" />
            </a>
          </div>

          {/* Main content with centralized functionality boxes */}
          <div className="w-full max-w-6xl mt-16 p-8 flex justify-center z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {functionalities.slice(0, 2).map((func) => (
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
              {/* Delete Members block centralized */}
              <div
                key={functionalities[2].id}
                className="relative group col-span-2 p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer shadow-lg"
                onClick={() => handleFunctionClick(functionalities[2].id)} 
              >
                <h3 className="text-2xl font-semibold mb-4 text-center">{functionalities[2].name}</h3>
                <p className="text-gray-400 text-center">{functionalities[2].description}</p>
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-30 transition duration-300 ease-in-out rounded-lg"></div>
              </div>
            </div>
          </div>
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg max-h-[90vh] overflow-y-auto hide-scrollbar">
            <h2 className="text-3xl font-bold mb-6">Create Event</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold mb-1">Event Name</label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-1">Start Time</label>
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-1">Venue</label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-1">Max Volunteers</label>
                <input
                  type="number"
                  value={maxVolunteers}
                  onChange={(e) => setMaxVolunteers(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Modal buttons - Centralized */}
            <div className="flex justify-center space-x-6 mt-8">
              <button
                className="py-2 px-4 bg-green-500 rounded-lg hover:bg-green-600 transition duration-200"
                onClick={handleCreateEvent}
              >
                Create
              </button>
              <button
                className="py-2 px-4 bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg max-h-[90vh] overflow-y-auto hide-scrollbar">
            <h2 className="text-3xl font-bold mb-6">Delete Event</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="space-y-4">
              {events.length > 0 ? (
                events.map((event) => (
                  <div key={event.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                    <span className="text-lg">{event.event_name}</span>
                    <button className="py-1 px-3 bg-red-500 rounded-lg hover:bg-red-600 transition duration-200" onClick={() => deleteEvent(event.id)}>
                      Cancel
                    </button>
                  </div>
                ))
              ) : (
                <p>No events scheduled.</p>
              )}
            </div>
            <div className="flex justify-center space-x-6 mt-8">
              <button className="py-2 px-4 bg-red-500 rounded-lg hover:bg-red-600 transition duration-200" onClick={() => setShowDeleteModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
}

export default Lead;