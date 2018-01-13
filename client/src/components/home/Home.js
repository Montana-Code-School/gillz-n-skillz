import { Jumbotron } from 'react-bootstrap';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Header from '../header/Header';
import FishMap from '../map/Map';
import FapDetails from '../fapDetails/FapDetails';
import FishPhotos from '../fishPhotos/FishPhotos';
import SiteDetails from '../siteDetails/SiteDetails';
import letterIIcon from '../../img/letter-icon.png';
import picturesIcon from '../../img/picturesicon.png';
import weatherIcon from '../../img/weathericon.png';
import riverIcon from '../../img/rivericon.png';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      clickedFapLat: "",
      clickedFapLong: "",
      clickedFapSiteId: "",
      clickedFapWebPage: "",
      clickedFapSiteName: ""
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

  addFavoriteFap(){
    let accessToken = localStorage.getItem("gillznskillzAT");
    if (accessToken) {
      axios.get('/api/anglers/me?access_token=' + accessToken)
      .then((res) => {
        const userId = res.data.id;
        axios.get('/api/accesssites?filter={"where":{"siteid":{"like":"' + this.state.clickedFapSiteId + '"}}}')
        .then((res) => {
          const newFavoriteFap = {
              accesssiteId: res.data[0].id,
              anglerId: userId
          }
          console.log(newFavoriteFap)
          axios.post('/api/favoriteFaps', newFavoriteFap)
          .then((res) => {
          })
          .catch((error) => {
            alert("Can't add favorite access site.")
            console.log(error);
            })
        })
        .catch((error) => {
          alert("Can't get access site.")
          console.log(error);
          })
      })
      .catch((error) => {
        alert("Can not find your profile.");
      })
    } else {
      this.props.history.push('/login');
    }
    }

  render() {
    return (
      <div>
        <div className="row">
          <Header history={this.props.history}/>
        </div>

        <div className="row">
        <div className="jumbotron welcome">
          <h3> Use the Map Below to Get Fishing Spot Info and Save Your Favs! </h3>
        </div>
        </div>

  {/* <hr className="row feature-divider"/> */}

          {/* <div className="row feature">
            <div id="siteDetails" className="col-md-12">
              <SiteDetails siteDetails={this.state} history={this.props.history}/>
            </div>  
          </div> */}


{/* display map component */}
        <div className="row">
          <div className="jumbotron">
            <div className="map">
              <FishMap callbackFromApp={this.latLongCallback} />
            </div>
          </div>
        </div>
{/* display additional details for clicked fap on map */}
        <div className="container selection-options sitepadding">
          <div className="row">
            <div className="col-xs-4">
              <a href="#weather"><img className="img-responsive center-block rounded-circle" src={weatherIcon} alt="glitter jumping fish" width="140" height="140"/></a>
              <a href="#weather"><h2> Weather </h2></a>
              <p> Get weather information on your selected fishing access point on the map!</p>
              {/* <p><a className="btn btn-secondary" href="weather" role="button">View Weather</a></p> */}
            </div>
            <div className="col-xs-4">
              <a href="#siteDetails"><img className="img-responsive center-block rounded-circle" src={letterIIcon} alt="information icon" width="140" height="140"/></a>
              <a href="#siteDetails"><h2> Site Details </h2></a>
              <p> <a href="https://app.mt.gov/als/index/index.html" target="blank"> Need a License? </a></p>
              <p><a href={this.state.clickedFapWebPage} target="blank">Get Directions and More Info about this Site from MTFWP</a></p>
              {/* <p> Get directions and fishing license information on your selected fishing access point on the map!</p> */}
              {/* <p><a className="btn btn-secondary" href="siteDetails" role="button">View Details</a></p> */}
            </div>
            <div className="col-xs-4">
              <img className="riverIcon" src={riverIcon} alt=""/><br />
              <a href="/angler/me"><h2> My Favorites </h2></a>
              <Button onClick={this.addFavoriteFap.bind(this)}> Add to favorites</Button>
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
            <div id="photos" className="col-md-12">
                <FishPhotos fishPhotos={this.state}/>
            </div> 
          </div>

          <div className="row">
            <div className="col-md-12">
              <p className="caps">Copyright 2018 Gillz-n-Skillz</p>
            </div> 
          </div> 
        </div>
      </div>  
    );
  }
}

export default Home;
