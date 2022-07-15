import React, { Component } from "react";
import axios from "axios";
export default class SignUp extends Component {
  state = {
    user_name: "",
    email: "",
    password: "",
    client_type: "",
  };

  // Set the value in a variable
  onChangeUserName = (e) => {
    this.setState({ user_name: e.target.value });
  };
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  onChangeClientType = (e) => {
    this.setState({ client_type: e.target.value });
  };

  // On summit, send the form's info to backend
  onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("http://localhost:8080/api/users/signup", {
        user_name: this.state.user_name,
        email: this.state.email,
        password: this.state.password,
        client_type: this.state.client_type,
      });
    console.log(res);
  };

  render() {
    return (
      // Form
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body">
            <h3>Singup</h3>
            <form onSubmit={this.onSubmit}>
              <div>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  placeholder="Enter your user name"
                  onChange={this.onChangeUserName}
                />
                <label htmlFor="user_name">User Name</label>
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange={this.onChangeEmail}
                />
                <label htmlFor="email">email</label>
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  onChange={this.onChangePassword}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="client_type"
                  value="cliente"
                  id="radioClient"
                  onChange={this.onChangeClientType}
                />

                <label htmlFor="radioClient">Empresa / Cliente</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="client_type"
                  value="engineer"
                  id="radioEngineer"
                  onChange={this.onChangeClientType}
                />
                <label htmlFor="radioEngineer">Ingeniero</label>
              </div>
              <br />
              <button type="summit" className="btn btn-primary">
                SingUp
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
