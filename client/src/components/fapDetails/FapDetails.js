// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import axios from 'axios';

class FapDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedFapLat: "",
      clickedFapLong: "",
      icon: "",
      icon_url: "",
      weather: "",
      feelslike_f: "",
      temp_f: ""
    };
  }

  componentDidMount() {
    this.drawWeather("45.67287885173888", "-111.07997885742002")
  }

  componentWillReceiveProps() {
    console.log("Hello, World!" + this.props.fapDetails.clickedFapLat);
    this.drawWeather(this.props.fapDetails.clickedFapLat, this.props.fapDetails.clickedFapLong)    
  }

  drawWeather(lat, long) {
    var that = this;
    axios.get(
      "http://api.wunderground.com/api/0bc19fae1dad4e32/conditions/q/"
      + lat
      + "," 
      + long 
      + ".json"
    )
      .then((response) => {
        console.log(response)
        this.setState({
          icon: response.data.current_observation.icon,
          feelslike_f: response.data.current_observation.feelslike_f
        })
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h3>Current Conditions</h3>
        <p>{this.state.icon}</p>
        <p>Feels Like: {this.state.feelslike_f}</p>
        <p>{this.props.fapDetails.clickedFapLat}</p>
        <p>{this.props.fapDetails.clickedFapLong}</p>
      </div>
    );
  }
}

export default FapDetails;

