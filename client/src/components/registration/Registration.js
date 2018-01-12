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
        //use AT to login a new user once registered
          axios.post('/api/anglers/login', userLogin)
          .then ((res) => {
            localStorage.setItem("gillznskillzAT", res.data.id)
            this.props.history.push('/angler/me');
          })
          .catch((error) => {
            console.log(error);
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
}


 render () {
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