import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import React, { Component } from 'react';

class FapDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedFapLat: "",
      clickedFapLong: ""
    };
  }
  
  render() {
    
        return (
          <div>
            <h3> FAP Deets </h3>
            <p>{this.props.fapDetails.clickedFapLat}</p>
            <p>{this.props.fapDetails.clickedFapLong}</p>
          </div>
        );
      }
    }

export default FapDetails;
