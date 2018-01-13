import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
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
          const userLogin = {
            username: this.state.username,
            password: this.state.password
          }
        //use AT to login a new user once registered
          axios.post('/api/anglers/login', userLogin)
          .then ((res) => {
            localStorage.setItem("gillznskillzAT", res.data.id)
            this.props.history.push('/angler/me');
          })
          .catch((error) => {
            alert("Can't log in.");
          })
      })
      .catch((error) => {
        alert("Can't register.");
      })
}

// <p> <a href="https://app.mt.gov/als/index/index.html" target="blank"> Need a License? </a></p>

 render () {
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
                  <form className="form-signin" onSubmit={(e) => this.handleSubmit(e)}>
                    <h2 className="form-signin-heading">Create an Account</h2>
                      <label>Username:<input type="text" name="username" onChange={this.handleChange} /><br /></label>
                      <label>Password:<input type="password" name="password" onChange={this.handleChange} /><br /></label>
                      <label>First Name:<input type="text" name="firstname" onChange={this.handleChange} /><br /></label>
                      <label>Last Name:<input type="text" name="lastname" onChange={this.handleChange} /><br /></label>
                      <label>Email:<input type="text" name="email" onChange={this.handleChange} /><br /></label>
                      <label>Fishing License No.:<input type="text" name="licenseNo" onChange={this.handleChange} /><br /></label>
                      <button className="btn btn-lg btn-primary btn-block" type="submit"> Register </button>
                  </form>
                  <p><Link to="/login">Back to Login</Link></p>
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

 export default Registration;