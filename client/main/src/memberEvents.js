// src/Events.js
import React, { useEffect, useState } from 'react';

const MemberEvents = () => {
  const [events, setEvents] = useState([]); // State for storing events data
  const [selectedEvent, setSelectedEvent] = useState(null); // State for storing the selected event for details
  const [showModal, setShowModal] = useState(false); // State for toggling the modal window
  const [error, setError] = useState(null); // State for tracking errors

  // Function to fetch events from the backend
  const fetchEvents = async () => {
    try {
      const role = localStorage.getItem('userRole');
      const club = localStorage.getItem('club');
      
      // Fetch the events using the user's role and club information
      const response = await fetch('http://127.0.0.1:5000/api/getEvents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, club }), // Send role and club in request body
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data.data); // Store the events array in the state
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Function to handle viewing the details of a specific event
  const handleViewDetails = (event) => {
    setSelectedEvent(event); // Store the selected event in state
    setShowModal(true); // Show the modal
  };

  // Close the modal window
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  // Placeholder function for registering for the event
  const handleRegister = () => {
    console.log(`Registering for event: ${selectedEvent.event_name}`);
    alert(`You have successfully registered for ${selectedEvent.event_name}`);
  };

  // Placeholder function for applying to volunteer for the event
  const handleVolunteer = () => {
    console.log(`Applying to volunteer for event: ${selectedEvent.event_name}`);
    alert(`You have applied to volunteer for ${selectedEvent.event_name}`);
  };

  // Fetch the events on component mount
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
          events.map((event, index) => (
            <div key={index} className="w-full flex justify-between items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300">
              <div>
                <h2 className="text-2xl font-semibold">{event.event_name}</h2>
              </div>
              <button
                className="py-2 px-4 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                onClick={() => handleViewDetails(event)} // Handle "View Details" button click
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No events available at the moment.</p>
        )}
      </div>

      {/* Modal for displaying event details */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            <h2 className="text-3xl font-bold mb-4">{selectedEvent.event_name}</h2>
            <div className="space-y-2">
              <p><strong>Date :</strong> {selectedEvent.event_date}</p>
              <p><strong>Venue :</strong> {selectedEvent.venue}</p>
              <p><strong>Max Volunteers :</strong> {selectedEvent.max_volunteers}</p>
              <p><strong>Current Volunteers :</strong> {selectedEvent.current_volunteers}</p>
            </div>
            
            {/* Additional Fields for Register and Volunteering */}
            <div className="flex justify-around items-center mt-6 space-x-4">
              {/* Register Button */}
              <button
                className="py-2 px-4 bg-green-500 rounded-lg hover:bg-green-600 transition duration-200"
                onClick={handleRegister} // Call register function
              >
                Register
              </button>

              {/* Apply for Volunteering Button */}
              <button
                className="py-2 px-4 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition duration-200"
                onClick={handleVolunteer} // Call volunteer function
              >
                Apply for Volunteering
              </button>

              {/* Close Modal Button */}
              <button
                className="py-2 px-4 bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
                onClick={handleCloseModal} // Handle closing the modal
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display error message if any */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default MemberEvents;
