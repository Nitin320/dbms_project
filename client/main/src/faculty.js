// src/Lead.js
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Importing user logo
import Lottie from 'lottie-react';
import animationData from "./assets/pages.json";
import GradientBackground from './gradientBackground';
import { motion } from 'framer-motion';   
import SignIn from './signin';

const buttonVariants = {
  initial: { 
    scale: 1, 
    borderColor: 'transparent', 
    boxShadow: '0 0 0 rgba(255, 255, 255, 0)' 
  },
  hover: { 
    scale: 1.05, 
    borderColor: '#ffffff', // Change border color on hover
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)', // Add shadow on hover
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 20 // Adjust damping for smoother return to the original state
    }
  },
  tap: { 
    scale: 0.95, 
    transition: { 
      type: 'spring', 
      stiffness: 300,
      damping: 20 // Maintain damping for smooth tap response
    }
  },
};

const Faculty = () => {
  const functionalities = [
    { id: 1, name: 'Change Lead', description: 'Click here to change the lead' },
    { id: 2, name: 'Approve Events', description: 'Click here to approve events' },
  ];

  const [loading, setLoading] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false); // Modal state for approving events
  const [showChangeLeadModal, setShowChangeLeadModal] = useState(false); // Modal state for changing lead
  const [showChangeCoLeadModal, setShowChangeCoLeadModal] = useState(false); // Modal state for changing co-lead
  const [events, setEvents] = useState([]); // Event data state
  const [members, setMembers] = useState([]); // Members data state
  const [error, setError] = useState(null); // Error state for fetching

  const [authenticate, setAuthenticate] = useState(false)

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3500);
    if(localStorage.getItem('userRole') == "Faculty"){
      setAuthenticate(true)
    }
  }, []);

  const fetchEvents = async () => {
    try {
      const role = localStorage.getItem('userRole');
      const club = localStorage.getItem('club');
      const response = await fetch('http://127.0.0.1:5000/api/getUnapprovedEvents', {
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
  const handleEventAction = async (eventId, action) => {
    console.log(`Event ${eventId} approved`);
      // Add your logic for approving the event here
    try {
      const club = localStorage.getItem('club');
      const response = await fetch(`http://127.0.0.1:5000/api/eventApproval`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify JSON content
        },
        body: JSON.stringify({ eventId, club, action}), // Stringify the data
      });
  
      if (!response.ok) {
        throw new Error(`Failed to ${action} event`);
      }
  
      const data = await response.json();
      console.log(data.message);
      alert(`Event ${action}d successfully!`);
  
      // Refetch events to update the UI
      fetchEvents();
    } catch (error) {
      console.error('Error handling event action:', error);
      alert(`Error ${action}ing event. Please try again.`);
    }
  };

  // Function to handle assigning a lead to a member
  const handleAssignLead = async (memberId) => {
    console.log(`Lead assigned to member ${memberId}`);
    // Add your logic for assigning the lead here
    try {
      const club = localStorage.getItem('club');
      const response = await fetch('http://127.0.0.1:5000/api/assignLead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memberId, club }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign lead');
      }

      const data = await response.json();
      console.log(data.message);
      alert('Lead assigned successfully!'); // Notify the user
    } catch (error) {
      console.error('Error assigning lead:', error);
      alert('Error assigning lead. Please try again.');
    }
  };

  // Function to handle assigning a co-lead to a member
  const handleAssignCoLead = async (memberId) => {
    console.log(`Co-lead assigned to member ${memberId}`);
    // Add your logic for assigning the co-lead here
    try {
      const club = localStorage.getItem('club');
      const response = await fetch('http://127.0.0.1:5000/api/assignColead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memberId, club }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign colead');
      }

      const data = await response.json();
      console.log(data.message);
      alert('coLead assigned successfully!'); // Notify the user
    } catch (error) {
      console.error('Error assigning CoLead:', error);
      alert('Error assigning CoLead. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* Top bar with user logo */}
      <div className="absolute inset-0 -z-10">
        <GradientBackground />
      </div>

      {authenticate ? (
      <>
        {loading ? (
          <div className="absolute inset-0 flex justify-center items-center z-50">
            <div className="relative flex items-center justify-center p-6 rounded-full z-50">
              <Lottie className="h-64 w-64" animationData={animationData} />
            </div>
          </div>
        ) : (
        <>
        <div className="w-full py-4 px-8 flex justify-between items-center bg-gray-800">
                <a href="./signin"
                  className="text-xl text-gray-300 hover:text-red-800 transition duration-200 ease-in-out cursor-pointer">
                  Logout
                </a>
                <h1 className="text-3xl font-bold text-white">Club Sync</h1>
                <a href="/profile">
                  <FaUserCircle className="text-3xl text-gray-300 hover:text-white transition duration-200 ease-in-out cursor-pointer" />
                </a>
              </div>

              <div className="flex-grow flex items-center justify-center w-full">
                {/* Your existing grid and content goes here */}
              </div>
        <div className="flex-grow flex items-center justify-center w-full">
          {/* Grid layout for the boxes */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 w-full max-w-4xl">
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
                            onClick={() => handleEventAction(event.event_id, 'approve')}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                            onClick={() => handleEventAction(event.event_id, 'reject')}
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
                  onClick={() => setShowApproveModal(false)} // Close modal
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
                          onClick={() => handleAssignLead(member.uid)}
                        >
                          Assign Lead
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No members available to assign as lead.</p>
                  )}
                </div>
              )}
              <div className="flex justify-center mt-6">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                  onClick={() => setShowChangeLeadModal(false)} // Close modal
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
                          onClick={() => handleAssignCoLead(member.uid)}
                        >
                          Assign Co-Lead
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No members available to assign as co-lead.</p>
                  )}
                </div>
              )}
              <div className="flex justify-center mt-6">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                  onClick={() => setShowChangeCoLeadModal(false)} // Close modal
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        </>
        )}
        </>
      ):(
        <main class="h-screen flex flex-col items-center justify-center space-y-8">
          <p class="text-4xl font-bold text-white">Please Sign In</p>
          
          <a href='/signin'>
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="relative p-4 rounded-lg cursor-pointer overflow-hidden border-2 border-transparent w-52"
            >
              <motion.span 
                className="absolute inset-0 border-2 border-gray-400 rounded-lg" 
                variants={buttonVariants}
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10 bg-gray-700 hover:bg-gray-600 transition duration-200 ease-in-out p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-center">Sign In</h2>
              </div>
            </motion.div>
          </a>
        </main>
      )}
    </div>
  );
};

export default Faculty;
