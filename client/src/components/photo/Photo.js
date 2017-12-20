import React, { Component } from 'react';
import axios from 'axios';
import './Photo.css';

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      clickedFapLat: "",
      clickedFapLong: "",
      clickedFapSiteId: "",
      photo: ""
    };
  }

  // componentWillReceiveProps() {
  //   this.drawWeather(this.props.fapDetails.clickedFapLat, this.props.fapDetails.clickedFapLong, this.props.fapDetails.clickedFapSiteId)
  // }

  displayPhotos() {
  axios.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=dd0b51e5691f1ff424582e8989e89e80&tags=montana%2C+fly+fishing&format=json&nojsoncallback=1&api_sig=17daeda86f1ece723395393a261c8c2a"     
    )
    .then((response) => {
      console.log(response);
    //   this.setState({
    //     photo: response.data.items[0].media.m
    //     })
    //     console.log(response.data);
    })
    .catch((err) => {
    console.log(err)
    })
}

  render() {
    return (
      <div className="container-fluid">
        <div className="jumbotron">
       <p> hello</p>
        <p>{this.state.photo}</p>
      </div>
      </div>
    );
  }


}

export default Photo;
