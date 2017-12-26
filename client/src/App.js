// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import FishMap from './components/map/Map';
import FapDetails from './components/fapDetails/FapDetails';
import FishPhotos from './components/fishPhotos/FishPhotos';


//import UserPhoto from './components/userPhoto/UserPhoto';
// import EsriLoaderReact from 'esri-loader-react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      clickedFapLat: "",
      clickedFapLong: "",
      clickedFapSiteId: ""
    }
    this.latLongCallback = this.latLongCallback.bind(this);
  }

  latLongCallback(clickedFap) {
    this.setState({
      clickedFapLat: clickedFap.clickedFapLat,
      clickedFapLong: clickedFap.clickedFapLong,
      clickedFapSiteId: clickedFap.clickedFapSiteId
    })
    // console.log(this.state)
  }

  render() {
    return (
      <header className="bgimage img-responsive">
        <nav className="navbar navbarstyle navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <div className="navbar-brand" >
                <a href="">
                  <img src="./gillznskills-icon.png" style={{width:30}} alt='A leaping fish filled with multi-colored glitter'/>
                  Gillz-N-Skillz
                </a>
                </div>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Login <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="">My Favorite FAPs</a></li>
                    <li><a href="">My FAP Photos</a></li>
                    <li><a href="">Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          <div className="map">
          <FishMap callbackFromApp={this.latLongCallback} />
          <br />
          </div>
        </div>

        <div className="container-fluid">
          <FapDetails fapDetails={this.state} />
        </div>

        <div className="container-fluid">
          <FishPhotos fishPhotos={this.state}/>
        </div>

        <div className="container-fluid">
          <p className="caps">Copyright Gillz-n-Skillz 2017</p>
        </div>
      
       </header>
    );
  }
}

export default App;
