import React, { Component } from 'react';
import axios from 'axios';
import Header from '../header/Header';

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
      const toDelete = res.data[0].id;
      axios.delete('/api/favoriteFaps/' + toDelete)
      .then((res) => {
        const newFavoriteFaps = this.state.favoriteFaps.filter((fap)=>{
          if (fap.id !== toDelete){
            return fap;
          } 
        })
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
          <div className="col-md-4"></div>
              <div className="col-md-4">
                <div className="well">
                    <h1>My Profile</h1>
                    <ul class="list-group">
                      <li class="list-group-item">
                        <span class="badge">{this.state.username}</span>
                        Username
                      </li>
                      <li class="list-group-item">
                        <span class="badge">{this.state.firstname}</span>
                          First Name                   
                      </li>
                      <li class="list-group-item">
                        <span class="badge">{this.state.lastname}</span>
                        Last Name
                      </li>
                      <li class="list-group-item">
                        <span class="badge">{this.state.email}</span>
                        Email
                      </li>
                      <li class="list-group-item">
                        <span class="badge">{this.state.licenseNo}</span>
                        Fishing License No.
                      </li>
                    </ul>
                    <h1>My Favorite Fishing Spots</h1>
                    <ul class="list-group">
                        { favoriteFaps }
                      </ul>
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