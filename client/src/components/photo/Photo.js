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

//Leaving if need to mount to state
  componentDidMount() {
    this.showPhotos()
  }


//Leaving is need to send props...
  // componentWillReceiveProps() {
  //   this.drawWeather(this.props.fapDetails.clickedFapLat, this.props.fapDetails.clickedFapLong, this.props.fapDetails.clickedFapSiteId)
  // }

  showPhotos() {
    axios.get(
      //change to flickr api
      "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=045b246c90125977977e4ba75b178eda&tags=fish%2C+montana%2C+christmas&format=json&nojsoncallback=1&auth_token=72157690347740604-52cc3453ea361f2e&api_sig=35ab1b7934f1d256066df524d9361477"      //double check query format
      // + lat
      // + "," 
      // + long 
      // + ".json"
      
    )
    
      .then((response) => {
        this.setState({
          //need to target the photo url to display
          photo: response.data.photos.photo[0].id
          
        })
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    render() {
      return (
        <div className="container-fluid">
        <div className="jumbotron">
        <p> {this.state.photo} </p>
        </div>
        </div>
      );
    }  

}

export default Photo;
