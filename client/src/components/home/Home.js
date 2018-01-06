// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Parallax } from 'react-scroll-parallax';
import Header from '../header/Header';
import FishMap from '../map/Map';
import FapDetails from '../fapDetails/FapDetails';
import FishPhotos from '../fishPhotos/FishPhotos';
import './Home.css';

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
  
        <div className="row">
        <div className="jumbotron">
          <div className="map">
            <FishMap callbackFromApp={this.latLongCallback} />
          </div>
        </div>
        </div>

        <div className="container selections">

          <div className="row">
            <div class="col-lg-4">
              <img class="rounded-circle" src='./img/56303-nature_1920x1080.jpeg' alt="glitter jumping fish" width="140" height="140"/>
              <h2> Weather </h2>
              <p> Select the icon to get weather information on your selected fishing access point on the map!</p>
              <p><a className="btn btn-secondary" href="#" role="button">View Weather</a></p>
            </div>
            <div class="col-lg-4">
              <img class="rounded-circle" src='./img/56303-nature_1920x1080.jpeg' alt="glitter jumping fish" width="140" height="140"/>
              <h2> Site Details </h2>
              <p> Select the icon to get directions and fishing license information on your selected fishing access point on the map!</p>
              <p><a className="btn btn-secondary" href="#" role="button">View Details</a></p>
            </div>
            <div class="col-lg-4">
              <img class="rounded-circle" src='./img/56303-nature_1920x1080.jpeg' alt="glitter jumping fish" width="140" height="140"/>
              <h2> Photos </h2>
              <p> Select the icon to get photos taken near your selected fishing access point on the map!</p>
              <p><a className="btn btn-secondary" href="#" role="button">View Photos</a></p>
            </div>
          </div> 

          {/* <hr className="feature-divider" */}
        
         <div className="row feature">
          <div className="col-md-12">
            <h2> Weather </h2>
            <FapDetails fapDetails={this.state} />
          </div>
          </div>

          {/* <hr className="feature-divider" */}

        <div className="row feature">
          <div className="col-md-12">
            <h2> Details </h2>
            <FishPhotos fishPhotos={this.state}/>
        </div>
        </div>

        {/* <hr className="feature-divider" */}

        <div className="row feature">
        <div className="col-md-12">
            <h2> Photos </h2>
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




  //working code commented out below

//   render() {
//     return (
//       <div>    
    
//     <div>
//       <div className="container-fluid">
//         <div className="row">
//           <Header/>
//         </div>
//         <div className="row">
//           <div className="map">
//             <FishMap callbackFromApp={this.latLongCallback} />
//           </div>
//         </div>
//         <div className="row">
//           <FishPhotos fishPhotos={this.state}/>
//         </div>
//         <div className="row">
//           <FapDetails fapDetails={this.state} />
//         </div>  
        
//         <div className="row">
//           <p className="caps">Copyright Gillz-n-Skillz 2017</p>
//         </div>
//       </div>  
//     </div>
//     </div>

//     );
//   }
// }

export default Home;
