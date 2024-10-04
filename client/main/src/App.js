import logo from './logo.svg';
import './App.css';
import Signup from './signup';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/signin">
          <SignIn/>
        </Route>
        <Route path="/lead">
          <Lead/>
        </Route>
        <Route path="/colead">
          <Colead/>
        </Route>
        <Route path="/member">
          <Member/>
        </Route>
        <Route path="/faculty">
          <Faculty/>
        </Route>
        <Route path="/test">
          <Test/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
