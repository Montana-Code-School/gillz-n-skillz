import React, { Component } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './Header.css';

class Footer extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <footer>
      <div className="row">
      <div className="col-md-12">
        <div className="navbar navbar-fixed-bottom navbar-inverse">
          <p>Copyright 2018 Gillz-n-Skillz</p>
        </div>
      </div>
    </div>
    </footer>
    );
  }
}

export default Footer;