// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
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
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="">Gillz-N-Skillz</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                 
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="">Link</a></li>
                    <li className="dropdown">
                      <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                      <ul className="dropdown-menu">
                        <li><a href="">Action</a></li>
                        <li><a href="">Another action</a></li>
                        <li><a href="">Something else here</a></li>
                        <li role="separator" className="divider"></li>
                        <li><a href="">Separated link</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          <div className="jumbotron">
            <div className="container">
              <FishMap callbackFromApp={this.latLongCallback}/>
            </div>
          </div>
            
            <FapDetails fapDetails={this.state}/>

          </div>
        );
      }
    }

export default App;
