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
                <div className="form-group">
                  <form onSubmit={(e) => this.handleSubmit(e)}>
                      <label>Username:<input type="text" name="username" onChange={this.handleChange} /><br /></label>
                      <label>Password:<input type="text" name="password" onChange={this.handleChange} /><br /></label>
                    <input type="submit" value="Login" />
                  </form>
                <p><Link to="/registration">Make an account.</Link></p>
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