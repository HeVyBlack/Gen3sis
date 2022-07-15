import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      // A simple nav
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            Gen3sis
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/about"}>
                  About
                </Link>
              </li>
            </ul>
            <div className="navbar-text">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item login-button">
                  <Link className="nav-link" to={"/signin"}>
                    SigIn
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/signup"}>
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
