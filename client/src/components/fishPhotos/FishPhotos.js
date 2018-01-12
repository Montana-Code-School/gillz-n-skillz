//display montana fish photos on home page

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

// use this to display multiple?
// componentWillReceiveProps(nextProps) {
//   this.setState ({
//     farmId: nextProps.fishPhotos.farmId,
//     serverId: nextProps.fishPhotos.serverId,
//     id: nextProps.fishPhotos.id,
//     secret: nextProps.fishPhotos.secret,
//     fishPic: <img src={`https://farm${this.state.farmId}.staticflickr.com/${this.state.serverId}/${this.state.id}_${this.state.secret}.jpg`} alt=""/>
//   })
//   this.displayFishPhotos(this.state.fishPic)

// }

// flickr url format https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

// display fishing photos on home page below map using flickr api
  displayFishPhotos(farmId, serverId, id, secret) {
  axios.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4dff2ac6b49370264bff812fd6c159eb&tags=fly+fishing%2C+montana&tag_mode=AND&format=json&nojsoncallback=1")
      .then((response) => {
      console.log(response);
      console.log("hello");
      //loop through data response to display photos using farm, server, id and secret
      this.setState({
        // farmId: response.data.photos.photo[0].farm,
        // serverId: response.data.photos.photo[0].server,
        // id: response.data.photos.photo[0].id,
        // secret: response.data.photos.photo[0].secret,
        fishPicArray: response.data.photos.photo
      })
    })
    .catch((err) => {
    console.log(err)
    })
}

  render() {
    console.log(this.state.fishPicArray)
    //we have data
    let fishItems = this.state.fishPicArray.map((trout) => {
      return (
          <img className="img-responsive fishphotos" key={trout.id} src={`https://farm${trout.farm}.staticflickr.com/${trout.server}/${trout.id}_${trout.secret}.jpg`} alt=""/>
      )
    });
    return (
      <div className="container-fluid">
        <div className="jumbotron">
          <div className="row">
            <div className="col-xs-3">
              {fishItems[1]}
            </div>
            <div className="col-xs-3">
              {fishItems[2]}
            </div>
            <div className="col-xs-3">
              {fishItems[3]}
            </div>
            <div className="col-xs-3">
              {fishItems[4]}
            </div> 
         </div>
       </div>
    </div>
    );
  }


}

export default FishPhotos;