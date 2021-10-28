import React, { Component } from "react";
import User from "./User";
import Search from "../Search/Search";
import { withAuth } from "../../hoc/withAuth";
import { Link } from "react-router-dom";
import oskar from './oskar11.png'
import "../../Styles/header.css";
import "../../index.css";

class Header extends Component {
  render() {
    const { auth, authActions } = this.props;
    return (
      <div className="header">
        <Link className="logo" to="/">
          <img src={oskar} alt="" />
          React-movies
        </Link>
        <Search /> 
        {auth?.user ? (
          <User />
        ) : (
          <button
            className="btn_header"
            type="button"
            onClick={authActions.toggleLoginModal}
          >
            Login
          </button>
        )}
      </div>
    );
  }
}
export default withAuth(Header);
