import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FishMap from './components/map/Map';
import EsriLoaderReact from 'esri-loader-react';

class App extends Component {
  render() {
    
        const options = {
          url: 'https://js.arcgis.com/4.5/'
        };
    
        return (
          <div className="App">
            <div className="App-header">
              <h2>Welcome to React</h2>
            </div>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <EsriLoaderReact 
              options={options} 
              modulesToLoad={['esri/Map', 'esri/views/MapView']}    
              onReady={({loadedModules: [Map, MapView], containerNode}) => {
                new MapView({
                  container: containerNode,
                  map: new Map({basemap: 'topo'})
                })
              }}
              onError={error => console.error(error)}
            />
          </div>
        );
      }
    }

export default App;
