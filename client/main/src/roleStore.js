// src/roleStore.js
let role = 'H';

const setRole = (newRole) => {
  role = newRole;
};

const getRole = () => role;

export { setRole, getRole };
