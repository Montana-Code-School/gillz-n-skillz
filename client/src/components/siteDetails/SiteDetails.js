//display montana fish photos on home page

import React, { Component } from 'react';
import axios from 'axios';
import './SiteDetails.css';
import riverIcon from '../../img/rivericon.png';


class SiteDetails extends Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      clickedFapLat: "",
      clickedFapLong: "",
      clickedFapSiteId: "",
      clickedFapWebPage: ""
    };
  }


  render() {
    
    return (
      <div className="container-fluid">
        <div className="jumbotron">
          <div className="row">
            <div className="col-xs-4">
              <h3>Site Details</h3>
              <p> {this.state.clickedFapSiteId} </p>
              <ul>
                <li><a href={this.state.clickedFapWebPage} target="blank"> Site Details and Directions </a></li>
              </ul>
            </div>
            <div className="col-xs-4">
              <h3> License Info </h3>
              <ul>
                <li> <a href="https://app.mt.gov/als/index/index.html" target="blank"> Need a License? </a></li>
              </ul>
             </div> 
            <div className="col-xs-4">
              <img class="riverIcon" src={riverIcon}/>
            </div>
          </div>
        </div>
      </div>
    );
  }


}

export default SiteDetails;