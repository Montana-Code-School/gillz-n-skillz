import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
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
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
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
          .then((res) => {
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

  render() {
    return (
      <div className="bgimage img-responsive">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <Header history={this.props.history} />
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <div className="well">
                  <form class="form-horizontal">
                    <fieldset>
                      <form className="form-signin" onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="form-group">
                          <legend>Create an Account</legend>
                          <div className="form-group">
                            <label className="col-lg-2 control-label">Username</label>
                            <div class="col-lg-10">
                              <input type="text" className="form-control" name="username" placeholder="Username" onChange={this.handleChange} />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-lg-2 control-label">Password</label>
                            <div class="col-lg-10">
                              <input type="text" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-lg-2 control-label">First Name</label>
                            <div class="col-lg-10">
                              <input type="text" className="form-control" name="firstname" placeholder="First Name" onChange={this.handleChange} />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-lg-2 control-label">Last Name</label>
                            <div class="col-lg-10">
                              <input type="text" className="form-control" name="lastname" placeholder="Last Name" onChange={this.handleChange} />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-lg-2 control-label">Email</label>
                            <div class="col-lg-10">
                              <input type="text" className="form-control" name="email" placeholder="Email" onChange={this.handleChange} />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-lg-2 control-label">Fishing License No. </label> 
                            <div class="col-lg-10">
                              <input type="text" className="form-control" name="licenseNo" placeholder="Fishing License No." onChange={this.handleChange} />
                              <span class="help-block"><a href="https://app.mt.gov/als/index/index.html" target="blank"> Need a License? </a></span>
                            </div>
                          </div>
                          <div className="form-group">
                            <div class="col-lg-10">
                              <Button className="btn-info" type="submit"> Register </Button>
                              <Link className="btn btn-default" to="/login">Back to Login</Link>
                            </div>
                          </div>
                        </div>
                      </form>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div >
    );
  }
}

export default Registration;