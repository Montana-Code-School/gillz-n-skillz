// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import React, { Component } from 'react';
// import { ParallaxProvider } from 'react-scroll-parallax';
// import { Parallax } from 'react-scroll-parallax';
import Header from '../header/Header';
import FishMap from '../map/Map';
import FapDetails from '../fapDetails/FapDetails';
import FishPhotos from '../fishPhotos/FishPhotos';
import SiteDetails from '../siteDetails/SiteDetails';
import './Home.css';
import letterIIcon from '../../img/letter-icon.png';
import picturesIcon from '../../img/picturesicon.png';
import weatherIcon from '../../img/weathericon.png';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      clickedFapLat: "",
      clickedFapLong: "",
      clickedFapSiteId: "",
      clickedFapWebPage: ""
    }
    this.latLongCallback = this.latLongCallback.bind(this);
  }

  latLongCallback(clickedFap) {
    this.setState({
      clickedFapLat: clickedFap.clickedFapLat,
      clickedFapLong: clickedFap.clickedFapLong,
      clickedFapSiteId: clickedFap.clickedFapSiteId,
      clickedFapWebPage: clickedFap.clickedFapWebPage
    })
  }

  //jill playing with structure below this comment
  // playtime
  render() {
    return (
      <div>
        <div className="row">
          <Header/>
        </div>

        {/* <div className="row">
        <div className="jumbotron welcome">
          <h3> Use the Map Below to Get Fishing Hole Info and Save Your Favs! </h3>
        </div>
        </div> */}

        <div className="row">
        <div className="jumbotron">
          <div className="map">
            <FishMap callbackFromApp={this.latLongCallback} />
          </div>
        </div>
        </div>

        <div className="container selection-options">

          <div className="row">
            <div className="col-xs-4">
            <a href="#weather"><img className="img-responsive center-block rounded-circle" src={weatherIcon} alt="glitter jumping fish" width="140" height="140"/></a>
              <a href="#weather"><h2> Weather </h2></a>
              <p> Select the icon to get weather information on your selected fishing access point on the map!</p>
              <p><a className="btn btn-secondary" href="weather" role="button">View Weather</a></p>
            </div>
            <div className="col-xs-4">
            <a href="#siteDetails"><img className="img-responsive center-block rounded-circle" src={letterIIcon} alt="information icon" width="140" height="140"/></a>
              <a href="#siteDetails"><h2> Site Details </h2></a>
              <p> Select the icon to get directions and fishing license information on your selected fishing access point on the map!</p>
              <p><a className="btn btn-secondary" href="siteDetails" role="button">View Details</a></p>
            </div>
            <div className="col-xs-4">
            <a href="#photos"><img className="img-responsive center-block rounded-circle" src={picturesIcon} alt="fish photos" width="140" height="140"/></a>
              <a href="#photos"><h2> Photos </h2></a>
              <p> Select the icon to get photos taken near your selected fishing access point on the map!</p>
              <p><a className="btn btn-secondary" href="#photos" role="button">View Photos</a></p>
            </div>
          </div> 
          
        
          <hr className="row feature-divider"/>
        
         <div className="row feature">
          <div id="weather" className="col-md-12">
            <FapDetails fapDetails={this.state} />
          </div>
          </div>

          <hr className="row feature-divider"/>

        <div className="row feature">
          <div id="siteDetails" className="col-md-12">
            <SiteDetails siteDetails={this.state} history={this.props.history}/>
          </div>  
        </div>

      

        <hr className="row feature-divider"/>

        <div className="row feature">
        <div id="photos" className="col-md-12">
            <FishPhotos fishPhotos={this.state}/>
        </div> 
        </div>

        <div className="row">
        <div className="col-md-12">
          <p className="caps">Copyright Gillz-n-Skillz 2017</p>
        </div> 
        </div> 
        </div>
      </div>  
        
    );
  }
}

export default Home;
