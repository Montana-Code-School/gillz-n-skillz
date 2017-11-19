import React, { Component } from 'react';
import './Map.css';
// import { Map } from 'react-arcgis';
import EsriLoaderReact from 'esri-loader-react';

class FishMap extends Component {
  render() {
    
        const options = {
          url: 'https://js.arcgis.com/4.5/'
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
                  var fishView = new MapView({
                      container: containerNode,
                      center: [-111.0429, 45.67],
                      zoom: 10,
                      map: fishMap 
                  })
                  
                  var popupTemplate = { // autocasts as new PopupTemplate()
                    title: "FAP: {NAME}",
                    content: "<p><b> Web: {WEB_PAGE}% </b></p>"
                      // "<p> Married: {MARRIED_CY}</p>" +
                      // "<p> Never Married: {NEVMARR_CY}</p>" +
                      // "<p> Divorced: {DIVORCD_CY}</p>"
                  };
                  
                  var featureLayer = new FeatureLayer({
                    url: "https://services3.arcgis.com/Cdxz8r11hT0MGzg1/arcgis/rest/services/FWPLND_FAS_POINTS/FeatureServer/0",
                    outFields: ['*'],
                    popupTemplate: popupTemplate
                  });
                  fishMap.add(featureLayer);

                  fishView.whenLayerView(featureLayer).then(function(lyrView) {
                    lyrView.watch("updating", function(val) {
                      if (!val) { // wait for the layer view to finish updating
          
                        // query all the features available for drawing.
                        lyrView.queryFeatures().then(function(results) {
                            console.log(results);
                          // graphics = results;
          
                          // var fragment = document.createDocumentFragment();
          
                          results.forEach(function(result, index) {
                            var attributes = result.attributes;
                            console.log(attributes.NAME + ", " + attributes.WEB_PAGE);
                      
                            // var name = attributes.ZIP + " (" +
                            //   attributes.PO_NAME + ")"
          
                          //   // Create a list zip codes in NY
                          //   var li = document.createElement("li");
                          //   li.classList.add("panel-result");
                          //   li.tabIndex = 0;
                          //   li.setAttribute("data-result-id", index);
                          //   li.textContent = name;
          
                          //   fragment.appendChild(li);
                          });
                        //   // Empty the current list
                        //   listNode.innerHTML = "";
                        //   listNode.appendChild(fragment);
                         });
                      }
                    });
                  });

                }}
                
              onError={error => console.error(error)}
            />
          </div>
        );
      }
    }

export default FishMap;