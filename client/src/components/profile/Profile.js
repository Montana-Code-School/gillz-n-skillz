import React, { Component } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import './Profile.css';

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
      favoriteFaps: [],
      anglerId: ""
    }
    this.deleteFavFap= this.deleteFavFap.bind(this);
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
              licenseNo: res.data.licenseNo,
              anglerId: res.data.id
            })
            axios.get('/api/favoriteFaps?filter={"include":["accesssites"],"where":{"anglerId":"' + this.state.anglerId + '"}}')
            .then((res) => {
              this.setState ({
                favoriteFaps: res.data
              })
              console.log(this.state.favoriteFaps);
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

  deleteFavFap(accesssiteId, event) {
    axios.get('/api/favoriteFaps?filter={"where":{"and":[{"anglerId":"' + this.state.anglerId + '"},{"accesssiteId":"' + accesssiteId + '"}]}}')
    .then((res) => {
      console.log(res)
      const toDelete = res.data[0].id;
      axios.delete('/api/favoriteFaps/' + toDelete)
      .then((res) => {
        console.log(res)
        const newFavoriteFaps = this.state.favoriteFaps.filter((fap)=>{
          if (fap.id !== toDelete){
            console.log(fap);
            return fap;
          } 
        })
        console.log(newFavoriteFaps);
        this.setState ({
          favoriteFaps: newFavoriteFaps
        })
      })
      .catch((error) => {
        alert("Can't delete your site.");
      })
    })
    .catch((error) => {
      alert("Can't find site to delete.");
    })
  }

  render() {
    const favoriteFaps = this.state.favoriteFaps.map((fap)=>{
      return <div key={fap.id}> <label>
        <a href={fap.accesssites.webpage} target="blank">{fap.accesssites.name}</a>
        <button onClick={this.deleteFavFap.bind(this, fap.accesssiteId)}>Delete</button><br />
        </label>
        </div>
    });
    return (
      <div className="bgimage img-responsive">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <Header history={this.props.history}/>
            </div>
          </div>
          <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="jumbotron">
                  <div className="form-group">
                    <h2 className="form-signin-heading">My Profile</h2>
                        <label>Username: {this.state.username}</label><br />
                        <label>First Name: {this.state.firstname} </label><br />
                        <label>Last Name: {this.state.lastname} </label><br />
                        <label>Email: {this.state.email} </label><br />
                        <label>Fishing License Number: {this.state.licenseNo} </label>
                    <h2 className="form-signin-heading">My Favorite Fishing Spots</h2>
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