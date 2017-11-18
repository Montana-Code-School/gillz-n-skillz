import React, { Component } from 'react';
import './Map.css';
// import { Map } from 'react-arcgis';
import EsriLoaderReact from 'esri-loader-react';

class FishMap extends Component {
  render() {
    
        const options = {
          url: 'https://js.arcgis.com/4.4/'
        };


         
        //  fishMap.addLayer(featureLayer);   
    
        return (
          <div className="App">
            
            <EsriLoaderReact 
              options={options} 
              modulesToLoad={['esri/Map', 'esri/views/MapView', "esri/layers/FeatureLayer"]}    
              onReady={({
                loadedModules: [Map, MapView, FeatureLayer], containerNode}) => {
                   
                  var fishMap = new Map (
                    {basemap: 'topo'}
                  )
                  new MapView({
                      container: containerNode,
                      center: [-111.0429, 45.67],
                      zoom: 10,
                      map: fishMap 
                  })
                  var featureLayer = new FeatureLayer("https://services3.arcgis.com/Cdxz8r11hT0MGzg1/arcgis/rest/services/FWPLND_FAS_POINTS/FeatureServer/0");
                  fishMap.add(featureLayer);
                }}
                
              onError={error => console.error(error)}
            />
          </div>
        );
      }
    }

export default FishMap;