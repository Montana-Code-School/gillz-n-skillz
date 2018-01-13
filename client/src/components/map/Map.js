import React, { Component } from 'react';
import './Map.css';
import EsriLoaderReact from 'esri-loader-react';

class FishMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedFapLat: "",
      clickedFapLong: "",
      clickedFapSiteId: "",
      clickedFapWebPage: "",
      clickedFapSiteName: ""
    }
    this.getLatLong = this.getLatLong.bind(this);
  }

  handleLatLong() {
    this.props.callbackFromApp(this.state);
  }
  
  getLatLong(response){
    if (response.results.length) {
      document.querySelector(".esri-popup").style.display="block";
        var siteId = document.querySelector('p[data-siteid]').getAttribute('data-siteid'); 
        var webPage = document.querySelector('p[data-webpage]').getAttribute('data-webpage');
        var siteName= document.querySelector('p[data-name]').getAttribute('data-name');
          this.setState({
            clickedFapLat: response.results[0].mapPoint.latitude,
            clickedFapLong: response.results[0].mapPoint.longitude,
            clickedFapSiteId: siteId,
            clickedFapWebPage: webPage,
            clickedFapSiteName: siteName
          })
      this.handleLatLong();
      } else {
        document.querySelector(".esri-popup").style.display="none";
      } 
    }

  render() {
    const options = {
       url: 'https://js.arcgis.com/4.5/'
    };
        return (
          <div className="map">
            <h3>Use the Map to Get Fishing Spot Info and Save Your Favs!</h3>
            <EsriLoaderReact 
              options={options} 
              modulesToLoad={['esri/Map', 'esri/views/MapView', "esri/layers/FeatureLayer"]}    
              onReady={({
                loadedModules: [Map, MapView, FeatureLayer], containerNode}) => {
                  var fishMap = new Map (
                    {basemap: 'topo'}
                  )
                  var fishView = new MapView({
                      container: containerNode,
                      center: [-111.0429, 45.67],
                      zoom: 10,
                      map: fishMap, 
                      popup: {
                        dockEnabled: true,
                        dockOptions: {
                          // Disables the dock button from the popup
                          buttonEnabled: false,
                          // Ignore the default sizes that trigger responsive docking
                          breakpoint: false,
                          position: "bottom-left",
                        },
                      }
                  })
                  
                  var popupTemplate = { // autocasts as new PopupTemplate()
                    title: "<p data-siteid={SITEID} data-name={NAME}>{NAME}</p>",
                    content:
                      "<p>Boat Facility: {BOAT_FAC}</p>" +
                      "<p>Camping: {CAMPING}</p>" +
                      "<p>SiteID: {SITEID}</p>" +
                      "<p>Name: {NAME}</p>" +
                      "<p data-webpage={WEB_PAGE}>Directions & Site Details<br><a href={WEB_PAGE} target='blank'>Montana Fish, Wildlife & Parks</a></br></p>"
                  };
        
                //Adds Montant Fish Access Points (FAPs) to map
                  var featureLayer = new FeatureLayer({
                    url: "https://services3.arcgis.com/Cdxz8r11hT0MGzg1/arcgis/rest/services/FWPLND_FAS_POINTS/FeatureServer/0",
                    outFields: ['*'],
                    popupTemplate: popupTemplate
                  });

                  fishMap.add(featureLayer);

                  fishView.on("click", event => {
                    fishView.hitTest(event)
                      .then(this.getLatLong);
                  })
                }}
              onError={error => console.error(error)}
          />
{/* Closes ESRILoaderReact */}
          </div>
        );
      }
    }

export default FishMap;