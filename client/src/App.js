import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FishMap from './components/map/Map';


class App extends Component {
  render() {
    return (
     
       <FishMap />
       
    )}
}

export default App;
