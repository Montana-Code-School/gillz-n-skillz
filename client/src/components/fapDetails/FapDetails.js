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
      weather: "",
      feelslike_f: "",
      temp_f: "",
      precip_today_in: "",
      wind_dir: "",
      wind_mph: "",
      wind_gust_mph: "",
      forecastDay0Weekday: "",
      forecastDay0Icon: "",
      forecastDay0High: "",
      forecastDay0Low: "",
      forecastDay0Conditions: "",
      forecastDay1Weekday: "",
      forecastDay1Icon: "",
      forecastDay1High: "",
      forecastDay1Low: "",
      forecastDay1Conditions: "",
      forecastDay2Weekday: "",
      forecastDay2Icon: "",
      forecastDay2High: "",
      forecastDay2Low: "",
      forecastDay2Conditions: "",
      streamflow: ""
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
          feelslike_f: response.data.current_observation.feelslike_f,
          temp_f: response.data.current_observation.temp_f,
          weather: response.data.current_observation.weather,
          precip_today_in: response.data.current_observation.precip_today_in,
          wind_dir: response.data.current_observation.wind_dir,
          wind_mph: response.data.current_observation.wind_mph,
          wind_gust_mph: response.data.current_observation.wind_gust_mph
        })
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
//forecast api call
      axios.get(
        "http://api.wunderground.com/api/0bc19fae1dad4e32/forecast/q/"
        + lat
        + "," 
        + long 
        + ".json"
      )
        .then((response) => {
          console.log(response)
          this.setState({
            forecastDay0Weekday: response.data.forecast.simpleforecast.forecastday[0].date.weekday_short,
            forecastDay0Icon: response.data.forecast.simpleforecast.forecastday[0].icon,
            forecastDay0High: response.data.forecast.simpleforecast.forecastday[0].high.fahrenheit,
            forecastDay0Low: response.data.forecast.simpleforecast.forecastday[0].low.fahrenheit,
            forecastDay0Conditions: response.data.forecast.simpleforecast.forecastday[0].conditions,

            forecastDay1Weekday: response.data.forecast.simpleforecast.forecastday[1].date.weekday_short,
            forecastDay1Icon: response.data.forecast.simpleforecast.forecastday[1].icon,
            forecastDay1High: response.data.forecast.simpleforecast.forecastday[1].high.fahrenheit,
            forecastDay1Low: response.data.forecast.simpleforecast.forecastday[1].low.fahrenheit,
            forecastDay1Conditions: response.data.forecast.simpleforecast.forecastday[1].conditions,

            forecastDay2Weekday: response.data.forecast.simpleforecast.forecastday[2].date.weekday_short,
            forecastDay2Icon: response.data.forecast.simpleforecast.forecastday[2].icon,
            forecastDay2High: response.data.forecast.simpleforecast.forecastday[2].high.fahrenheit,
            forecastDay2Low: response.data.forecast.simpleforecast.forecastday[2].low.fahrenheit,
            forecastDay2Conditions: response.data.forecast.simpleforecast.forecastday[2].conditions
            
          })
          console.log(this.state);
        })
        .catch((error) => {
          console.log(error);
        });

  //streamflow api call
  // axios.get(
  //   "https://waterservices.usgs.gov/nwis/iv/?sites=06048650&parameterCd=00060,00065"
  // )
  //   .then((response) => {
  //     console.log(response)
  //     this.setState({
  //       streamflow: response.data.ns1:siteName        
  //     })
  //     console.log(this.state);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
}

  render() {
    return (
      <div className="container">
        <ul class="nav nav-tabs">
          <li class="active"><a data-toggle="tab" href="#CurrentConditions">Current Conditions</a></li>
          <li><a data-toggle="tab" href="#Wind">Wind</a></li>
          <li><a data-toggle="tab" href="#Stream">Stream</a></li>
          <li><a data-toggle="tab" href="#Something">Something</a></li>
          <li><a data-toggle="tab" href="#Forecast">Forecast</a></li>
        </ul>

      <div class="tab-content">
        <div id="CurrentConditions" class="tab-pane fade in active">
          <h3>Current Conditions</h3>
            <p>{this.state.icon}</p>
            <p>Feels Like: {this.state.feelslike_f}</p>
            <p>{this.state.weather}</p>
            <p>{this.state.temp_f}</p>
            <p>{this.state.precip_today_in}</p>
        </div>
        <div id="Wind" class="tab-pane fade">
          <h3>Wind</h3>
            <p>{this.state.wind_dir}</p>
            <p>{this.state.wind_mph} mph</p>
            <p>{this.state.wind_gust_mph} gust mph</p>
        </div>
        <div id="Stream" class="tab-pane fade">
          <h3>Stream</h3>
            <p>I am the water.</p>
        </div>
        <div id="Something" class="tab-pane fade">
          <h3>Something</h3>
            <p>I am spacing.</p>
            <p>{this.props.fapDetails.clickedFapLat}</p>
            <p>{this.props.fapDetails.clickedFapLong}</p>
        </div>
        <div id="Forecast" class="tab-pane fade">
          <h3>Forecast</h3>
            <p> {this.state.forecastDay0Weekday}</p>
            <p> {this.state.forecastDay0Icon}</p>
            <p> {this.state.forecastDay0High}</p>
            <p> {this.state.forecastDay0Low}</p>
            <p> {this.state.forecastDay0Conditions}</p>
            <p> {this.state.forecastDay1Weekday}</p>
            <p> {this.state.forecastDay1Icon}</p>
            <p> {this.state.forecastDay1High}</p>
            <p> {this.state.forecastDay1Low}</p>
            <p> {this.state.forecastDay1Conditions}</p>
            <p> {this.state.forecastDay2Weekday}</p>
            <p> {this.state.forecastDay2Icon}</p>
            <p> {this.state.forecastDay2High}</p>
            <p> {this.state.forecastDay2Low}</p>
            <p> {this.state.forecastDay2Conditions}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default FapDetails;

