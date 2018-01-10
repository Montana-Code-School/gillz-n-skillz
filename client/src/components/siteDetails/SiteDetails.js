//display montana fish photos on home page

import React, { Component } from 'react';
import axios from 'axios';
import './SiteDetails.css';
import riverIcon from '../../img/rivericon.png';
import { Button } from 'react-bootstrap';


class SiteDetails extends Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      clickedFapLat: "",
      clickedFapLong: "",
      clickedFapSiteId: "",
      clickedFapWebPage: "",
      clickedFapSiteName: ""
    };
    this.addFavoriteFap = this.addFavoriteFap.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      clickedFapLat: nextProps.siteDetails.clickedFapLat,
      clickedFapLong: nextProps.siteDetails.clickedFapLong,
      clickedFapSiteId: nextProps.siteDetails.clickedFapSiteId,
      clickedFapWebPage: nextProps.siteDetails.clickedFapWebPage,
      clickedFapSiteName: nextProps.siteDetails.clickedFapSiteName
    })
    console.log(this.state);
  }

  addFavoriteFap(){
    axios.get('/api/accesssites?filter={"where":{"siteid":{"like":"' + this.state.clickedFapSiteId + '"}}}')
    .then((res) => {
      // const newFavoriteFap = {
      //     accesssiteId: this.state.clickedFapSiteId,
      //     anglerId: 
      // }
      // axios.post('/api/favoriteFaps')
    })
    .catch((error) => {
      alert("Can't add favorite spot.")
      console.log(error);
      })
    }

  render() {

   console.log(this.state); 
    return (
      <div className="container-fluid">
        <div className="jumbotron">
          <div className="row">
            <div className="col-xs-4">
              <h3>Site Details</h3>
              <p> Name: {this.state.clickedFapSiteName} </p>
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
              <img className="riverIcon" src={riverIcon} alt=""/>
              <Button onClick={this.addFavoriteFap.bind(this)}> Add to favorites</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}





export default SiteDetails;