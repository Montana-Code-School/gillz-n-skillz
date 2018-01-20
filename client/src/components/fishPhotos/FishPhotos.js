//displays montana fish photos on home page
import React, { Component } from 'react';
import axios from 'axios';

class FishPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      clickedFapLat: "",
      clickedFapLong: "",
      clickedFapSiteId: "",
      fishPicArray: []
    };
  }

  componentDidMount() {
    this.displayFishPhotos()
  }

  displayFishPhotos() {
  axios.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4dff2ac6b49370264bff812fd6c159eb&per_page=12&page=1&tags=fly%20fishing%20montana&tag_mode=AND&format=json&nojsoncallback=1")
    .then((response) => {
      this.setState({
        fishPicArray: response.data.photos.photo
      })
    })
    .catch((err) => {
    console.log(err)
    })
}

  render() {
    let fishItems = this.state.fishPicArray.map((trout) => {
      return (
        <div className="col-md-2">
          <div className="thumbnail">
            <img className="img-responsive thumbnail" key={trout.id} src={`https://farm${trout.farm}.staticflickr.com/${trout.server}/${trout.id}_${trout.secret}_q.jpg`} alt=""/>
          </div>
        </div>  
      )
    });
    return (
      <div className="container-fluid">
        <div className="row">
          {fishItems}
        </div>
      </div> 
    );
  }
}

export default FishPhotos;