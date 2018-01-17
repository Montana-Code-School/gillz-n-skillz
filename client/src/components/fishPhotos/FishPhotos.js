//displays montana fish photos on home page

import React, { Component } from 'react';
import axios from 'axios';
import './FishPhotos.css';

class FishPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      clickedFapLat: "",
      clickedFapLong: "",
      clickedFapSiteId: "",
      fishPic: "",
      farmId: "",
      serverId: "",
      id: "",
      secret: "",
      fishPicArray: []
    };
  }

componentDidMount() {
    this.displayFishPhotos("5", "4595", "24430478167", "37377f0367")
  }

  displayFishPhotos(farmId, serverId, id, secret) {
  axios.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4dff2ac6b49370264bff812fd6c159eb&tags=fly%20fishing%20montana&tag_mode=AND&format=json&nojsoncallback=1")
    .then((response) => {
      console.log(response);
      this.setState({
        fishPicArray: response.data.photos.photo
      })
    })
    .catch((err) => {
    console.log(err)
    })
}

  render() {
    console.log(this.state.fishPicArray)
    let fishItems = this.state.fishPicArray.map((trout) => {
      return (
        <img className="img-responsive fishphotos thumbnail" key={trout.id} src={`https://farm${trout.farm}.staticflickr.com/${trout.server}/${trout.id}_${trout.secret}.jpg`} alt=""/>
      )
    });
    return (
      <div className="container-fluid">
        <div className="jumbotron">
          <div className="row">
            <div className="col-md-3">
              
              {fishItems[1]}
              
            </div>
            <div className="col-md-3">
            
              {fishItems[2]}
             
            </div>
            <div className="col-md-3">
           
              {fishItems[3]}
            
            </div>
            <div className="col-md-3">
           
              {fishItems[4]}
              
            </div> 
         </div>
         </div>
       </div>
    );
  }
}

export default FishPhotos;