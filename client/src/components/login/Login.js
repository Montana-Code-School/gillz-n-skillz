import React, { Component } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

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
        alert("You ain't fishin'. Get a password!")
      })
  }

  render() {
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
                <form className="form-horizontal" onSubmit={(e) => this.handleSubmit(e)}>
                <fieldset>
                    <div className="form-group">
                      <label className="col-lg-2 control-label">Username</label>
                      <div className="col-lg-10">
                        <input type="text" className="form-control" name="username" placeholder="Username" onChange={this.handleChange}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-lg-2 control-label">Password</label>
                      <div className="col-lg-10">
                      <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} />
                    </div>  
                    </div>
                    <div className="form-group">
                    <div className="col-lg-10">
                      <Button className="btn-info" type="submit"> Login </Button> 
                      {/* <p><Link to="/registration">Create an Account</Link></p> */}
                      <Link className="btn btn-link" to="/registration">Create an Account</Link>
                    </div>
                    </div>
                  </fieldset>
                </form>
                </div>
                <div className="col-md-4"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Login;