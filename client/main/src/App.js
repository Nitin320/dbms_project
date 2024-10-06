import logo from './logo.svg';
import './App.css';
import Signup from './signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './signin';
import Lead from './lead';
import Colead from './colead';
import Member from './member'
import Faculty from './faculty'
import Test from './test'

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/lead" element={<Lead/>}></Route>
        <Route path="/colead" element={<Colead/>}></Route>
        <Route path="/member" element={<Member/>}></Route>
        <Route path="/faculty" element={<Faculty/>}></Route>
        <Route path="/test" element={<Test/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
