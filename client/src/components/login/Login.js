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
                <input type="submit" value="Submit" />
              </form>
              <p><Link to="/registration">Make an account.</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;