import logo from './logo.svg';
import './App.css';
import Signup from './signup';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignIn from './signin';
import Lead from './lead';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/signin">
          <SignIn/>
        </Route>
        <Route path="/lead">
          <Lead/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
