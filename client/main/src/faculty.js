// src/Lead.js
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Importing user logo
import Lottie from 'lottie-react';
import animationData from "./assets/pages.json";
import GradientBackground from './gradientBackground';

const Lead = () => {
  const functionalities = [
    { id: 1, name: 'Change Lead', description: 'Click here to change the lead' },
    { id: 2, name: 'Change Co-Lead', description: 'Click here to change the co-lead' },
    { id: 3, name: 'Approve Events', description: 'Click here to approve events' },
  ];

  const [loading, setLoading] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false); // Modal state for approving events
  const [showChangeLeadModal, setShowChangeLeadModal] = useState(false); // Modal state for changing lead
  const [showChangeCoLeadModal, setShowChangeCoLeadModal] = useState(false); // Modal state for changing co-lead
  const [events, setEvents] = useState([]); // Event data state
  const [members, setMembers] = useState([]); // Members data state
  const [error, setError] = useState(null); // Error state for fetching

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

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

  // Function to handle the "Approve Events" button click
  const handleApproveEventsClick = () => {
    fetchEvents(); // Fetch events when the button is clicked
    setShowApproveModal(true); // Show the modal
  };

  // Function to handle the "Change Lead" button click
  const handleChangeLeadClick = () => {
    fetchMembers(); // Fetch members when the button is clicked
    setShowChangeLeadModal(true); // Show the modal
  };

  // Function to handle the "Change Co-Lead" button click
  const handleChangeCoLeadClick = () => {
    fetchMembers(); // Fetch members when the button is clicked
    setShowChangeCoLeadModal(true); // Show the modal
  };

  // Function to handle approval or rejection
  const handleEventAction = (eventId, action) => {
    if (action === 'approve') {
      console.log(`Event ${eventId} approved`);
      // Add your logic for approving the event here
    } else if (action === 'reject') {
      console.log(`Event ${eventId} rejected`);
      // Add your logic for rejecting the event here
    }
  };

  // Function to handle assigning a lead to a member
  const handleAssignLead = (memberId) => {
    console.log(`Lead assigned to member ${memberId}`);
    // Add your logic for assigning the lead here
  };

  // Function to handle assigning a co-lead to a member
  const handleAssignCoLead = (memberId) => {
    console.log(`Co-lead assigned to member ${memberId}`);
    // Add your logic for assigning the co-lead here
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* Top bar with user logo */}
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
      <div className="w-full py-4 px-8 flex justify-end bg-gray-800">
        <a href='/profile'>
          <FaUserCircle className="text-3xl text-gray-300 hover:text-white transition duration-200 ease-in-out cursor-pointer" />
        </a>
      </div>
      <div className="flex-grow flex items-center justify-center w-full">
        {/* Grid layout for the boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {functionalities.slice(0, 2).map((func) => (
            <div
              key={func.id}
              className="relative group p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer shadow-lg"
              onClick={func.id === 1 ? handleChangeLeadClick : handleChangeCoLeadClick} // Trigger respective modals
            >
              <h3 className="text-2xl font-semibold mb-4">{func.name}</h3>
              <p className="text-gray-400">{func.description}</p>
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-30 transition duration-300 ease-in-out rounded-lg"></div>
            </div>
          ))}

          {/* Approve Events block */}
          <div
            key={functionalities[2].id}
            className="relative group md:col-span-2 flex items-center justify-center p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer shadow-lg"
            onClick={handleApproveEventsClick} // Trigger modal when clicked
          >
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">{functionalities[2].name}</h3>
              <p className="text-gray-400">{functionalities[2].description}</p>
            </div>
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-30 transition duration-300 ease-in-out rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Approve Events Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto hide-scrollbar">
            <h2 className="text-3xl font-bold mb-6">Approve Events</h2>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="space-y-4">
                {events.length > 0 ? (
                  events.map((event) => (
                    <div key={event.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
                      <div>
                        <h3 className="text-xl font-semibold">{event.event_name}</h3>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                          onClick={() => handleEventAction(event.id, 'approve')}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                          onClick={() => handleEventAction(event.id, 'reject')}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No events available for approval.</p>
                )}
              </div>
            )}
            <div className="flex justify-center mt-6">
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                onClick={() => setShowApproveModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Lead Modal */}
      {showChangeLeadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto hide-scrollbar">
            <h2 className="text-3xl font-bold mb-6">Change Lead</h2>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="space-y-4">
                {members.length > 0 ? (
                  members.map((member) => (
                    <div key={member.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
                      <div>
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                      </div>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                        onClick={() => handleAssignLead(member.id)}
                      >
                        Assign Lead
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No members available for changing lead.</p>
                )}
              </div>
            )}
            <div className="flex justify-center mt-6">
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                onClick={() => setShowChangeLeadModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Co-Lead Modal */}
      {showChangeCoLeadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto hide-scrollbar">
            <h2 className="text-3xl font-bold mb-6">Change Co-Lead</h2>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="space-y-4">
                {members.length > 0 ? (
                  members.map((member) => (
                    <div key={member.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
                      <div>
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                      </div>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                        onClick={() => handleAssignCoLead(member.id)}
                      >
                        Assign Co-Lead
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No members available for changing co-lead.</p>
                )}
              </div>
            )}
            <div className="flex justify-center mt-6">
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                onClick={() => setShowChangeCoLeadModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
};

export default Lead;
