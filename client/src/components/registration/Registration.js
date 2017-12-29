import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './Registration.css';
import axios from 'axios';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      licenseNo: ""
  }
  this.handleChange = this.handleChange.bind(this);
}

handleChange(event) {
  console.log(event.target.value);
  this.setState({[event.target.name]: event.target.value});
}

handleSubmit(event){
  event.preventDefault();
  const userRegistration = {
    username: this.state.username,
    password: this.state.password,
    firstname: this.state.firstname,
    lastname: this.state.lastname,
    email: this.state.email,
    licenseNo: this.state.licenseNo
  }
  
  axios.post('/api/anglers', userRegistration) 
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const userLogin = {
            username: this.state.username,
            password: this.state.password
          }
          axios.post('/api/anglers/login', userLogin)
          .then ((res) => {
            localStorage.setItem("gillznskillzAT", res.data.id)
          console.log(res);
          })
          .catch((error) => {
            console.log(error);
          })
        }
        this.setAccessToken(res.data.id);
      })
      .catch((error) => {
        console.log(error);
      })
}

setAccessToken(accessToken){
  // axios.post('/api/Users/' + accessToken + '/accessTokens' )
  //   .then((res) => {
  //     console.log(res);
  //     // this.props.history.push('/') 
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
}

 render () {
  return (
    <div className="container-fluid">
        <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <label>
                Username:
                <input type="text" name="username" onChange={this.handleChange} /><br />
              </label>
              <label>
                Password:
                <input type="text" name="password" onChange={this.handleChange} /><br />
              </label>
              <label>
                First Name:
                <input type="text" name="firstname" onChange={this.handleChange} /><br />
              </label>
              <label>
                Last Name:
                <input type="text" name="lastname" onChange={this.handleChange} /><br />
              </label>
              <label>
                Email:
                <input type="text" name="email" onChange={this.handleChange} /><br />
              </label>
              <label>
                Fishing License Number:
                <input type="text" name="licenseNo" onChange={this.handleChange} /><br />
              </label>
              <input type="submit" value="Login" />
            </form>
            <p><Link to="/login">Back to Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
 } 
}

 export default Registration;