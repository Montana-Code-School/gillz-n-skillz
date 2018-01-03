// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
 // Link
} from 'react-router-dom';
import Home from './components/home/Home';
import Registration from './components/registration/Registration';
import Login from './components/login/Login';
import './App.css';
import Profile from './components/profile/Profile';

class App extends Component {
  
  render() {
    
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/registration" component={Registration}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/angler/:id" component={Profile}/>
        </Switch>
      </Router>
    )
  };
};
export default App;