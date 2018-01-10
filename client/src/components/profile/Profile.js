import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './Profile.css';
import axios from 'axios';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      licenseNo: "",
      favoriteFaps: []
    }
  }

  componentWillMount() {
    let accessToken = localStorage.getItem("gillznskillzAT");
    if (accessToken) {
      axios.get('/api/anglers/' + this.props.match.params.id + "?access_token=" + accessToken)
        .then((res) => {
            this.setState ({
              username: res.data.username,
              firstname: res.data.firstname,
              lastname: res.data.lastname,
              email: res.data.email,
              licenseNo: res.data.licenseNo
            })
            axios.get('/api/favoriteFaps?filter={"include":["accesssites"],"where":{"anglerId":{"like":"' + this.props.match.params.id + '"}}}')
            .then((res) => {
              console.log(res)
              this.setState ({
                favoriteFaps: res.data
              })
            })
            .catch((error) => {
              alert("Favorite Faps not found.");
            })
        })
        .catch((error) => {
          this.props.history.push('/login');
        })
    } else {
        this.props.history.push('/login');
    }
  }

  render() {
    const favoriteFaps = this.state.favoriteFaps.map((fap)=>{
      return <li key={fap.accesssiteId}>
        <a href={fap.accesssites.webpage} target="blank">{fap.accesssites.name}</a>
       {/* <button onClick={this.delete.bind(this, fap.id)}>Delete</button> */}
        </li> 
    });
    return (
      <div className="bgimage img-responsive">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <Header />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="jumbotron">
                <div className="container">
                  <div className="form-group">
                    <h2 className="form-signin-heading">Your Profile</h2>
                    <ul>
                      <li>Username: {this.state.username}</li>
                      <li>First Name: {this.state.firstname} </li>
                      <li>Last Name: {this.state.lastname} </li>
                      <li>Email: {this.state.email} </li>
                      <li>Fishing License Number: {this.state.licenseNo} </li>
                    </ul>
                    <h2 className="form-signin-heading">Your Favorite Fishing Spots</h2>
                    <ul>
                      { favoriteFaps }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Profile;