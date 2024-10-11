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
    { id: 4, name: 'Delete Members', description: 'Click here to remove a member' }, // Removed "Add Members"
  ];

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // New state for delete modal
  const [showMembersModal, setShowMembersModal] = useState(false); // State for members modal
  const [events, setEvents] = useState([]); // State to hold events
  const [members, setMembers] = useState([]); // State to hold members
  const [error, setError] = useState('');

  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [venue, setVenue] = useState('');
  const [maxVolunteers, setMaxVolunteers] = useState('');

  // Fetch events function
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
      setEvents(data.data); // Store the events array in the state
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const deleteEvent = async (eventId) => {
    console.log("Deleting event with ID:", eventId); 

    //if (!eventId) {
    //  alert('Event ID is required');
    //  return; 
    //}

    try {
      const response = await fetch('http://127.0.0.1:5000/api/deleteEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventId })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);  
        fetchEvents(); 
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message); 
        alert(`Error: ${errorData.message}`); 
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred while deleting the event. Please try again.'); 
    }
  };
  
  // Fetch members function
  const fetchMembers = async () => {
    try {
      const club = localStorage.getItem('club');
      const response = await fetch('http://127.0.0.1:5000/api/getMembers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ club }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }
      const data = await response.json();
      setMembers(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateEvent = async () => {
    const newEvent = {
      club: localStorage.getItem('club'),
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
        console.log('Event created successfully:', result.message);
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
      fetchEvents(); // Fetch events again after creation
    }
  };
  

  const handleDeleteMember = async (memberId) => {
    const data ={ memberId, 
      club: localStorage.getItem('club')
     }
    try {
      const response = await fetch(`http://localhost:5000/api/delete_member`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Member deleted successfully!');
        fetchMembers(); // Refresh the members list after deletion
      } else {
        alert('Failed to delete the member');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while deleting the member.');
    }
  };

  const handleFunctionClick = (funcId) => {
    if (funcId === 1) {
      setShowModal(true);
    } else if (funcId === 2) {
      setShowDeleteModal(true); // Open delete modal
      fetchEvents(); // Fetch events when opening delete modal
    } else if (funcId === 4) {
      setShowMembersModal(true); // Open delete members modal
      fetchMembers(); // Fetch members when opening delete modal
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchEvents(); // Fetch events on component mount
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
          <div className="w-full max-w-6xl mt-16 p-8 flex flex-col items-center z-20">
            {/* First row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full justify-center">
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
            </div>

            {/* Second row - Centralized */}
            <div className="flex justify-center mt-8 w-full">
              <div
                className="relative group p-8 rounded-lg w-full bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer shadow-lg"
                onClick={() => handleFunctionClick(4)} // Click handler for "Delete Members"
              >
                <h3 className="text-2xl font-semibold mb-4">{functionalities[2].name}</h3>
                <p className="text-gray-400">{functionalities[2].description}</p>
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-30 transition duration-300 ease-in-out rounded-lg"></div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal for Creating Event */}
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
                onClick={handleCreateEvent} // Handle form submission
              >
                Create
              </button>
              <button
                className="py-2 px-4 bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
                onClick={() => setShowModal(false)} // Handle modal close
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Deleting Events */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg max-h-[90vh] overflow-y-auto hide-scrollbar">
            <h2 className="text-3xl font-bold mb-6">Delete Events</h2>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
            <ul className="space-y-4">
              {events.map((event) => (
                <li key={event.event_id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                  <span>{event.event_name}</span>
                  <button
                    onClick={() => deleteEvent(event.event_id)}
                    className="py-1 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex justify-center space-x-6 mt-8">
              <button
                className="py-2 px-4 bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
                onClick={() => setShowDeleteModal(false)} // Handle modal close
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showMembersModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-3xl font-bold mb-6">Delete Members</h2>
            <div className="max-h-60 overflow-y-auto"> {/* Set a max height and enable scrolling */}
              <ul className="space-y-2"> {/* Space between each member item */}
                {members.map((member) => (
                  <li key={member.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-md shadow">
                    <span className="text-gray-200">{member.name}</span>
                    <button
                      onClick={() => handleDeleteMember(member.uid)}
                      className="bg-red-600 text-white p-2 rounded hover:bg-red-500 transition duration-300"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setShowMembersModal(false)}
              className="bg-red-500 text-white p-2 rounded hover:bg-gray-500 transition duration-300 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* CSS for hiding scrollbar */}
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



export default Lead;
