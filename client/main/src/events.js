// src/Events.js
import React, { useEffect, useState } from 'react';

const Events = () => {
  const [events, setEvents] = useState([]); // Initialize events as an empty array
  const [error, setError] = useState(null); // Track error state

  // Function to fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000'); // Set this to ur url BROOOO
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } 
    catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // useEffect to call functionnnn
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* Page Title */}
      <h1 className="text-4xl font-bold my-8">Events</h1>

      {/* Events Container */}
      <div className="w-full max-w-5xl px-8 py-6 bg-gray-800 rounded-lg shadow-lg space-y-4">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="w-full flex justify-between items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300">
              <div>
                <h2 className="text-2xl font-semibold">{event.name}</h2>
                <p className="text-gray-400">{event.description}</p>
              </div>
              <p className="text-xl text-blue-400">{event.date}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No events available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
