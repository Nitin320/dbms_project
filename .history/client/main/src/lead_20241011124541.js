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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventToDelete, setEventToDelete] = useState(null); // Track which event to delete
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents(); // Fetch events on mount
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const role = localStorage.getItem('userRole');
      const club = localStorage.getItem('club');
      const response = await fetch('http://127.0.0.1:5000/api/getEvents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, club }),
      });
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (newEvent) => {
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
        fetchEvents(); // Refresh the event list
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert('An error occurred while creating the event. Please try again.');
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleCancelEvent = async () => {
    if (!eventToDelete) return; // Ensure there's an event to delete

    try {
      const response = await fetch(`/api/events/${eventToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEvents(events.filter(event => event.eventid !== eventToDelete));
        alert('Event deleted successfully');
      } else {
        const errorData = await response.json();
        alert(`Failed to delete event: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setShowDeleteModal(false); // Close delete modal
      setEventToDelete(null); // Clear event to delete
    }
  };

  const handleFunctionClick = (funcId) => {
    if (funcId === 1) {
      setShowModal(true);
    } else if (funcId === 2) {
      setShowDeleteModal(true);
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
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Create Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg max-h-[90vh] overflow-y-auto hide-scrollbar">
            <h2 className="text-3xl font-bold mb-6">Create Event</h2>
            {/* Your event creation form here */}
            <button className="py-2 px-4 bg-green-500 rounded-lg hover:bg-green-600 transition duration-200" onClick={handleCreateEvent}>
              Create
            </button>
            <button className="py-2 px-4 bg-red-500 rounded-lg hover:bg-red-600 transition duration-200" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Event Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg max-h-[90vh] overflow-y-auto hide-scrollbar">
            <h2 className="text-3xl font-bold mb-6">Delete Event</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="space-y-4">
              {events.length > 0 ? (
                events.map((event) => (
                  <div key={event.eventid} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                    <span className="text-lg">{event.eventname}</span>
                    <button className="py-1 px-3 bg-red-500 rounded-lg hover:bg-red-600 transition duration-200" onClick={() => {
                      setEventToDelete(event.eventid);
                      handleCancelEvent();
                    }}>
                      Cancel
                    </button>
                  </div>
                ))
              ) : (
                <p>No events scheduled.</p>
              )}
            </div>
            <button className="py-2 px-4 bg-red-500 rounded-lg hover:bg-red-600 transition duration-200" onClick={() => setShowDeleteModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lead;
