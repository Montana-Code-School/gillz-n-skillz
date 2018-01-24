import React, { Component } from 'react';
import './Footer.css';

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
        <div className="navbar navbar-fixed-bottom navbar-default">
        <p><span>Copyright 2018 &nbsp;<a href="https://github.com/Montana-Code-School/gillz-n-skillz" target="blank"> Gillz-n-Skillz</a></span></p>
        </div>
      </div>
    </div>
    </footer>
    );
  }
}

export default Footer;