import React, { Component } from 'react';
import axios from 'axios';
import './FapDetails.css';
import './dist/wu-icons-style.css';

class FapDetails extends Component {
        
  constructor(props) {
    super(props);
    this.state = {
      clickedFapLat: "",
      clickedFapLong: "",
      clickedFapSiteId: "",
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
      forecastDay0avewinddir: "",
      forecastDay0avewindmph: "",
      forecastDay0maxwindmph: "",
      forecastDay1Weekday: "",
      forecastDay1Icon: "",
      forecastDay1High: "",
      forecastDay1Low: "",
      forecastDay1Conditions: "",
      forecastDay1avewinddir: "",
      forecastDay1avewindmph: "",
      forecastDay1maxwindmph: "",
      forecastDay2Weekday: "",
      forecastDay2Icon: "",
      forecastDay2High: "",
      forecastDay2Low: "",
      forecastDay2Conditions: "",
      forecastDay2avewinddir: "",
      forecastDay2avewindmph: "",
      forecastDay2maxwindmph: "",
      streamflow: "",
      usgsgagesitenumber: "",
      usgsGraphUrl: "",
      unknownUsgsSite: ""
    };
  }

  componentDidMount() {
    this.drawWeather("45.67287885173888", "-111.07997885742002", "280946")
  }

  componentWillReceiveProps() {
    this.drawWeather(this.props.fapDetails.clickedFapLat, this.props.fapDetails.clickedFapLong, this.props.fapDetails.clickedFapSiteId)

  }

  drawWeather(lat, long, siteId) {
    axios.get(
      "http://api.wunderground.com/api/0bc19fae1dad4e32/conditions/q/"
      + lat
      + "," 
      + long 
      + ".json"
    )
      .then((response) => {
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
          this.setState({
            forecastDay0Weekday: response.data.forecast.simpleforecast.forecastday[0].date.weekday_short,
            forecastDay0Icon: response.data.forecast.simpleforecast.forecastday[0].icon,
            forecastDay0High: response.data.forecast.simpleforecast.forecastday[0].high.fahrenheit,
            forecastDay0Low: response.data.forecast.simpleforecast.forecastday[0].low.fahrenheit,
            forecastDay0Conditions: response.data.forecast.simpleforecast.forecastday[0].conditions,
            forecastDay0avewinddir: response.data.forecast.simpleforecast.forecastday[0].avewind.dir,
            forecastDay0avewindmph: response.data.forecast.simpleforecast.forecastday[0].avewind.mph,
            forecastDay0maxwindmph: response.data.forecast.simpleforecast.forecastday[0].maxwind.mph,

            forecastDay1Weekday: response.data.forecast.simpleforecast.forecastday[1].date.weekday_short,
            forecastDay1Icon: response.data.forecast.simpleforecast.forecastday[1].icon,
            forecastDay1High: response.data.forecast.simpleforecast.forecastday[1].high.fahrenheit,
            forecastDay1Low: response.data.forecast.simpleforecast.forecastday[1].low.fahrenheit,
            forecastDay1Conditions: response.data.forecast.simpleforecast.forecastday[1].conditions,
            forecastDay1avewinddir: response.data.forecast.simpleforecast.forecastday[1].avewind.dir,
            forecastDay1avewindmph: response.data.forecast.simpleforecast.forecastday[1].avewind.mph,
            forecastDay1maxwindmph: response.data.forecast.simpleforecast.forecastday[1].maxwind.mph,

            forecastDay2Weekday: response.data.forecast.simpleforecast.forecastday[2].date.weekday_short,
            forecastDay2Icon: response.data.forecast.simpleforecast.forecastday[2].icon,
            forecastDay2High: response.data.forecast.simpleforecast.forecastday[2].high.fahrenheit,
            forecastDay2Low: response.data.forecast.simpleforecast.forecastday[2].low.fahrenheit,
            forecastDay2Conditions: response.data.forecast.simpleforecast.forecastday[2].conditions,
            forecastDay2avewinddir: response.data.forecast.simpleforecast.forecastday[2].avewind.dir,
            forecastDay2avewindmph: response.data.forecast.simpleforecast.forecastday[2].avewind.mph,
            forecastDay2maxwindmph: response.data.forecast.simpleforecast.forecastday[2].maxwind.mph,
          })
        })
        .catch((error) => {
          console.log(error);
        });
        
//call accesssites table
        axios.get('/api/accesssites?filter[where][siteid]=' + siteId)
        .then((response) => {
          console.log(response.data[0].usgsgagesitenumber)
          console.log(siteId)
          this.setState({
            usgsgagesitenumber: response.data[0].usgsgagesitenumber 
          })          
        })
        .catch((error) => {
          console.log(error);
          });
}

  // unknownUsgsGauge() {
  //   let unknownUsgsStreamflow = "https://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=0&parm_cd=00060&period=7";
  //   let unknownUsgsStreamTemp = "https://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=0&parm_cd=00010&period=7";
  // }

  render() {
   var gaugeStreamflow = "";
     if (this.state.usgsgagesitenumber === 0) {
      gaugeStreamflow =  <i className="wu wu-black wu-256 wu-unknown"></i>;
    } else {      
      gaugeStreamflow = <img className='img-responsive center-block'
      src={`https://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=${this.state.usgsgagesitenumber}&parm_cd=00060&period=7`}
      alt='A graph courtesy of the US Geological Survey of discharge in cubic feet per second for the last seven days and the median daily statistic'/>
    }

    var gaugeStreamTemp = "";
    if (this.state.usgsgagesitenumber === 0) {
     gaugeStreamTemp =  <i className="wu wu-black wu-256 wu-unknown"></i>;
    } else {      
     gaugeStreamTemp = 
      <img className='img-responsive center-block' 
      src={`https://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=${this.state.usgsgagesitenumber}&parm_cd=00010&period=7`} 
      alt='A graph courtesy of the US Geological Survey of water temperature in degrees Celsius and Fahrenheit for the last seven days'/>
    }

    return (
        <div className="container-fluid">
        
          <div className="jumbotron">
            <h3>Site Details</h3>
            unknownUsgsGraph
          </div>
          <ul className="nav nav-tabs nav-justifed navtabdetails">
            <li className="active"><a data-toggle="tab" href="#Weather">Weather</a></li>            
            <li><a data-toggle="tab" href="#Streamflow">Streamflow</a></li>
            <li><a data-toggle="tab" href="#StreamTemperature">Stream Temperature</a></li>
          </ul>

          <div className="tab-content tabcontentstyle">
            <div id="Weather" className="tab-pane fade in active">
              <div className="row">
                <div className="col-md-3">
                  <p className="dayOfWeek">Today</p>    
                  <i className={`wu wu-black wu-64 wu-${this.state.icon}`}></i>
                  <p>{this.state.weather}</p>
                  <p>{this.state.temp_f}℉</p>
                  <p>feels like {this.state.feelslike_f}℉</p>
                  <p>{this.state.precip_today_in} inches today</p>
                  <p>{this.state.wind_mph} mph {this.state.wind_dir}</p>
                  <p>{this.state.wind_gust_mph}  mph gusts</p>
                </div>
               <div>
                  <div className="col-md-3">
                    <p className="dayOfWeek">{this.state.forecastDay0Weekday}</p>            
                    <p><i className={`wu wu-black wu-64 wu-${this.state.forecastDay0Icon}`}></i></p>
                    <p>{this.state.forecastDay0Conditions}</p>
                    <p>{this.state.forecastDay0High}℉ / {this.state.forecastDay0Low}℉</p>
                    <p className="caps">high / low</p>
                    <p>{this.state.forecastDay0avewindmph} mph {this.state.forecastDay0avewinddir}</p>
                    <p>{this.state.forecastDay0maxwindmph} mph max</p>
                  </div>
                  <div className="col-md-3">
                    <p className="dayOfWeek">{this.state.forecastDay1Weekday}</p>
                    <p><i className={`wu wu-black wu-64 wu-${this.state.forecastDay1Icon}`}></i></p>
                    <p>{this.state.forecastDay1Conditions}</p>
                    <p>{this.state.forecastDay1High}℉ / {this.state.forecastDay1Low}℉</p>
                    <p className="caps">high / low</p>
                    <p>{this.state.forecastDay1avewindmph} mph {this.state.forecastDay1avewinddir}</p>
                    <p>{this.state.forecastDay1maxwindmph} mph max</p>
                  </div>
                  <div className="col-md-3">
                    <p className="dayOfWeek">{this.state.forecastDay2Weekday}</p>
                    <p><i className={`wu wu-black wu-64 wu-${this.state.forecastDay2Icon}`}></i></p>
                    <p>{this.state.forecastDay2Conditions}</p>
                    <p>{this.state.forecastDay2High}℉ / {this.state.forecastDay2Low}℉</p>
                    <p className="caps">high / low</p>
                    <p>{this.state.forecastDay2avewindmph} mph {this.state.forecastDay2avewinddir}</p>
                    <p>{this.state.forecastDay2maxwindmph} mph max</p>
                  </div>
                </div>
                </div>
            </div>

            <div id="Streamflow" className="tab-pane fade">
              <p>
               {gaugeStreamflow}
              </p>
            </div>

            <div id="StreamTemperature" className="tab-pane fade">
              <p>
               {gaugeStreamTemp}
              </p>
            </div>
        </div>
      </div>
    );
  }
}

export default FapDetails;

