import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Header from '../header/Header';
import FishMap from '../map/Map';
import FapDetails from '../fapDetails/FapDetails';
import FishPhotos from '../fishPhotos/FishPhotos';
import letterIIcon from '../../img/letter-icon.png';
// import picturesIcon from '../../img/picturesicon.png';
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

  addFavoriteFap() {
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
              axios.post('/api/favoriteFaps', newFavoriteFap)
                .then((res) => {
                  alert("Successfully added your new favorite!");
                })
                .catch((error) => {
                  alert("Can't add favorite access site.")
                })
            })
            .catch((error) => {
              alert("Can't get access site.")
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
      <div className="bgimage img-responsive">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <Header history={this.props.history} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="row">
                <div className="jumbotron">
                  <div className="map">
                    <FishMap callbackFromApp={this.latLongCallback} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="jumbotron">
                  <div className="row">
                    <div className="col-xs-4">
                      <a href="#weather"><img className="img-responsive center-block rounded-circle" src={weatherIcon} alt="glitter jumping fish" width="140" height="140" /></a>
                      <h2 className="text-primary"> Weather </h2>
                      <p> Get weather information on your selected fishing access point on the map!</p>
                    </div>
                    <div className="col-xs-4">
                      <a href=""><img className="img-responsive center-block rounded-circle" src={letterIIcon} alt="information icon" width="140" height="140" /></a>
                      <h2 className="text-primary"> Site Details </h2>
                      <p>Get Directions and More Info about this Site from MTFWP</p>
                      <a href={this.state.clickedFapWebPage} target="blank" className="btn btn-info">Get Directions</a>
                    </div>
                    <div className="col-xs-4">
                      <a href="/angler/me"><img className="img-responsive center-block rounded-circle" src={riverIcon} alt="favorite access point sites icon" /></a>
                      <h2 className="text-primary"> My Favorites </h2>
                      <p> Keep track of your favorite fishing spots. </p>
                      <Button className="btn-info" onClick={this.addFavoriteFap.bind(this)}> Add to Favorites</Button>
                    </div>
                  </div>

                  <hr className="row feature-divider" />

                  <div className="row feature">
                    <div id="weather" className="col-md-12">
                      <FapDetails fapDetails={this.state} />
                    </div>
                  </div>

                  <hr className="row feature-divider" />

                  <div className="row feature">
                    <div id="photos" className="col-md-12">
                      <FishPhotos fishPhotos={this.state} />
                    </div>
                  </div>

                  <div className="col-md-1"></div>


                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
          <div className="row">
            <div className="col-md-12">
              <div className="footer navbar-static-bottom navbar-inverse">
                <p className="caps">Copyright 2018 Gillz-n-Skillz</p>
              </div>
            </div>
          </div>

      </div>
    );
  }
}

export default Home;
