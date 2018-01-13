import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import riverIcon from '../../img/rivericon.png';
import './SiteDetails.css';

class SiteDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedFapLat: "",
      clickedFapLong: "",
      clickedFapSiteId: "",
      clickedFapWebPage: "",
      clickedFapSiteName: ""
    };
    this.addFavoriteFap = this.addFavoriteFap.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      clickedFapLat: nextProps.siteDetails.clickedFapLat,
      clickedFapLong: nextProps.siteDetails.clickedFapLong,
      clickedFapSiteId: nextProps.siteDetails.clickedFapSiteId,
      clickedFapWebPage: nextProps.siteDetails.clickedFapWebPage,
      clickedFapSiteName: nextProps.siteDetails.clickedFapSiteName
    })
    console.log(this.state);
  }

  addFavoriteFap(){
    let accessToken = localStorage.getItem("gillznskillzAT");
    if (accessToken) {
      axios.get('/api/anglers/me?access_token=' + accessToken)
      .then((res) => {
        const userId = res.data.id;
        axios.get('/api/accesssites?filter={"where":{"siteid":{"like":"' + this.state.clickedFapSiteId + '"}}}')
        .then((res) => {
          const newFavoriteFap = {
              accesssiteId: res.data[0].id,
              anglerId: userId
          }
          console.log(newFavoriteFap)
          axios.post('/api/favoriteFaps', newFavoriteFap)
          .then((res) => {
          })
          .catch((error) => {
            alert("Can't add favorite access site.")
            console.log(error);
            })
        })
        .catch((error) => {
          alert("Can't get access site.")
          console.log(error);
          })
      })
      .catch((error) => {
        alert("Can not find your profile.");
      })
    } else {
      this.props.history.push('/login');
    }
    }

  render() {
   //keeping this console log to determine # of clicks for FAP info 
   console.log(this.state); 
    return (
      <div className="container-fluid">
        <div className="jumbotron">
          <div className="row">
            <div className="col-xs-4">
              <p>{this.state.clickedFapSiteName} </p>
              <p><a href={this.state.clickedFapWebPage} target="blank"> Site Details and Directions </a></p>
            </div>
            <div className="col-xs-4">
              <p> <a href="https://app.mt.gov/als/index/index.html" target="blank"> Need a License? </a></p>
             </div> 
            <div className="col-xs-4">
              <img className="riverIcon" src={riverIcon} alt=""/>
              <Button onClick={this.addFavoriteFap.bind(this)}> Add to favorites</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default SiteDetails;