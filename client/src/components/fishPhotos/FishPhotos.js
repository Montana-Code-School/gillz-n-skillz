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
      secret: ""
    };
  }

componentDidMount() {
    this.displayFishPhotos("5", "4595", "24430478167", "37377f0367")
  }

// use this to display multiple?
componentWillReceiveProps(nextProps) {
  this.setState ({
    farmId: nextProps.fishPhotos.farmId,
    serverId: nextProps.fishPhotos.serverId,
    id: nextProps.fishPhotos.id,
    secret: nextProps.fishPhotos.secret,
    fishPic: <img src={`https://farm${this.state.farmId}.staticflickr.com/${this.state.serverId}/${this.state.id}_${this.state.secret}.jpg`} alt=""/>
  })
  this.displayFishPhotos(this.state.fishPic)

}

// flickr url format https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

// display fishing photos on home page below map using flickr api
  displayFishPhotos(farmId, serverId, id, secret) {
  axios.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4dff2ac6b49370264bff812fd6c159eb&tags=montana%2C+fly+fishing&bbox=-113%2C+45%2C+-108%2C+47&per_page=20&format=json&nojsoncallback=1"     
    )
    .then((response) => {
      console.log(response);
      //loop through data response to display photos using farm, server, id and secret
      this.setState({
        farmId: response.data.photos.photo[0].farm,
        serverId: response.data.photos.photo[0].server,
        id: response.data.photos.photo[0].id,
        secret: response.data.photos.photo[0].secret
        // fishPic: 
      })
        // console.log(this.state);
        // console.log("hello");
    })
    .catch((err) => {
    console.log(err)
    })
}

  render() {
    
    return (
      // <div className="media-gallery-thumbnails">
      //     {this.state.fishPic}
      //       {this.state.fishPic.map((item, index) =>
      //         <div key={index}>
      //           <img className="media-gallery-thumbnails__img" src={this.fishPic(item)}/>
      //         </div>)}
      //   <div>Loading...</div>
      //     }
      // </div>
      <div className="container-fluid">
        <div className="jumbotron">
          <div className="row">
            <div className="col-xs-6">
              <h3>Site Details</h3>
              <p> {this.state.clickedFapSiteId} </p>
              <ul>
                <li><a href={this.state.clickedFapWebPage} target="blank"> More Site Info </a></li>
                <li> <a href="https://app.mt.gov/als/index/index.html" target="blank"> Need a License? </a></li>
              </ul>
            </div>
            <div className="col-xs-6">
              <p> placeholder for MT fish photos</p>
              <img className="fishphotos" src={"https://farm5.staticflickr.com/4595/24430478167_37377f0367.jpg"}/>
              {/* <img src={this.state.fishPic} /> */}
            </div>
         </div>
       </div>
    </div>
    );
  }


}

export default FishPhotos;