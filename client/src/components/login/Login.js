import React, { Component } from 'react';
import Header from '../header/Header';
import './Login.css';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="bgimage img-responsive">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <Header/>
            </div>
          </div> 
          <div className="row">
            <div className="col-lg-12">
              <div className="jumbotron">
              <div className="container">
                <div className="form-group">
                  <form class="form-signin" onSubmit={(e) => this.handleSubmit(e)}>
                    <h2 class="form-signin-heading">Please Login In</h2>
                      <label>Username:<input type="text" name="username" onChange={this.handleChange} /><br /></label>
                      <label>Password:<input type="text" name="password" onChange={this.handleChange} /><br /></label>
                    <button class="btn btn-lg btn-primary btn-block" type="submit"> Login </button>
                  </form>
                  <button class="btn btn-xs btn-default form-signin">
                <p><Link to="/registration">Create an Account</Link></p>
                </button>
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

export default Login;