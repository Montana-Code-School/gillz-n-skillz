//NOT USING THIS CODE

// import React, { Component } from 'react';
// import axios from 'axios';
// import './UserPhoto.css';

// class userPhoto extends Component {
//   constructor(props) {
//     super(props);
//     this.state = 
//     {
//       clickedFapLat: "",
//       clickedFapLong: "",
//       clickedFapSiteId: "",
//       farmId: "",
//       serverId: "",
//       id: "",
//       secret: ""
//     };
//   }

 
//   componentWillReceiveProps(nextProps) {
//     this.displayPhotos(this.state.photoSet)
// }

// // flickr photoset_id urls 
// // flickr url format https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
// // flickr url format https://farm{5}.staticflickr.com/{4556}/{39031649552}_{884c264c4f}.jpg
// // https://farm1.staticflickr.com/2/1418878_1e92283336_m.jpg

// // pass in user photoset_id ???

// // display user photoset photos on user profile
//   displayUserPhotos(photoset_id) {
//   axios.get("https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=4dff2ac6b49370264bff812fd6c159eb&photoset_id=72157690680825784&format=json&nojsoncallback=1"     
//     )
//     .then((response) => {
//       console.log(response);
//       this.setState({
//         farmId: response.data.photoset.photo[0].farm,
//         serverId: response.data.photoset.photo[0].server,
//         id: response.data.photoset.photo[0].id,
//         secret: response.data.photoset.photo[0].secret
//         })
//         console.log(this.state);
//     })
//     .catch((err) => {
//     console.log(err)
//     })
// }

//   render() {
//     return (
//       <div className="container-fluid">
//         <div className="jumbotron">
//        <p> hello</p>
//         <p>{this.state.photoSet}</p>
//         <img src={"https://farm${this.state.farm}.staticflickr.com/4556/39031649552_884c264c4f.jpg"}/>
//       </div>
//       </div>
//     );
//   }


// }

// export default UserPhoto;
