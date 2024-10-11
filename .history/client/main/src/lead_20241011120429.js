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
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [venue, setVenue] = useState('');
  const [maxVolunteers, setMaxVolunteers] = useState('');
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

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

  const openConfirmationModal = (eventId) => {
    setSelectedEventId(eventId);
    setShowConfirmationModal(true);
  };

  const handleCancelEvent = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/deleteEvent/${selectedEventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.message === 'Event deleted successfully') {
        alert('Event cancelled successfully.');
        setEvents(events.filter(event => event.id !== selectedEventId));
      } else {
        alert('Event not found or already completed.');
      }
    } catch (err) {
      setError(err.message);
      alert('There was an error canceling the event.');
    } finally {
      setShowConfirmationModal(false);
      setSelectedEventId(null);
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
          {/* Create Event Modal */}
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg max-h-[90vh] overflow-y-auto hide-scrollbar">
            <h2 className="text-3xl font-bold mb-6">Delete Event</h2>
            {events.length === 0 ? (
              <p>No upcoming events to delete.</p>
            ) : (
              <ul className="space-y-4">
                {events.map((event) => (
                  <li key={event.eventid} className="flex justify-between items-center">
                    <span>{event.eventname}</span>
                    <button
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition duration-200 ease-in-out"
                      onClick={() => openConfirmationModal(event.eventid)}
                    >
                      Cancel Event
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-end mt-6">
              <button
                className="ml-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg transition duration-200 ease-in-out"
                onClick={() => setShowDeleteModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-3xl font-bold mb-6">Confirm Cancellation</h2>
            <p>Are you sure you want to cancel this event?</p>
            <div className="flex justify-end mt-6">
              <button
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg transition duration-200 ease-in-out"
                onClick={handleCancelEvent}
              >
                Yes, Cancel
              </button>
              <button
                className="ml-4 px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg shadow-lg transition duration-200 ease-in-out"
                onClick={() => setShowConfirmationModal(false)}
              >
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lead;
