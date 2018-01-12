import React, { Component } from 'react';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const userLogin = {
      username: this.state.username,
      password: this.state.password
    }

    axios.post('/api/anglers/login', userLogin)
      .then((res) => {
        localStorage.setItem("gillznskillzAT", res.data.id)
        this.props.history.push('/angler/me');
      })
      .catch((error) => {
        alert("You ain't fishin'. Get a password FAP!")
        console.log(error);
      })
  }

  render() {
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
                    <form class="form-signin" onSubmit={(e) => this.handleSubmit(e)}>
                      <label>Username:<input type="text" name="username" onChange={this.handleChange} /><br /></label>
                      <label>Password:<input type="password" name="password" onChange={this.handleChange} /><br /></label>
                      <button class="btn btn-lg btn-primary btn-block" type="submit"> Login </button>
                    </form>
                      <p><Link to="/registration">Create an Account</Link></p>
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