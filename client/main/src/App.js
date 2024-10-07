import React from 'react';
import './App.css';
import Signup from './signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './signin';
import Lead from './lead';
import Colead from './colead';
import Member from './member';
import Faculty from './faculty';
import Test from './test';
import Profile from './profile';
import MemberEvents from './memberEvents';
import Home from './home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page route */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/lead" element={<Lead />} />
          <Route path="/colead" element={<Colead />} />
          <Route path="/member" element={<Member />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/test" element={<Test />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/MemberEvents" element={<MemberEvents />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
