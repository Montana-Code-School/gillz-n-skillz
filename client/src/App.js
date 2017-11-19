import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import FishMap from './components/map/Map';
import FapDetails from './components/fapDetails/FapDetails';
// import EsriLoaderReact from 'esri-loader-react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      clickedFapLat: "",
      clickedFapLong: ""
    }
    this.latLongCallback = this.latLongCallback.bind(this);
  }
  latLongCallback(clickedFap) {
    this.setState({
      clickedFapLat: clickedFap.clickedFapLat,
      clickedFapLong: clickedFap.clickedFapLong
    })
    // console.log(this.state)
  }

  render() {
    
        return (

          <div>
            <nav class="navbar navbar-default">
              <div class="container-fluid">
                <div class="navbar-header">
                  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href="#">Gillz-N-Skillz</a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                 
                  <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">Link</a></li>
                    <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                      <ul class="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          <div class="jumbotron">
            <div class="container">
              <FishMap callbackFromApp={this.latLongCallback}/>
            </div>
          </div>
            
            <FapDetails fapDetails={this.state}/>

          </div>
        );
      }
    }

export default App;
