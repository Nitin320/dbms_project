// src/Events.js
import React from 'react';

const Events = () => {
  const [events, setEvents] = React.useState([
    { id: 1, name: 'Orientation Event', date: '2024-10-12', description: 'Welcome to the new batch!' },
    { id: 2, name: 'Tech Talk', date: '2024-11-05', description: 'A deep dive into AI technologies.' },
    { id: 3, name: 'Workshop', date: '2024-12-15', description: 'Hands-on coding workshop for beginners.' },
  ]);
  console.log('Events:', events); // Add this inside the Events component before the return statement.


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
