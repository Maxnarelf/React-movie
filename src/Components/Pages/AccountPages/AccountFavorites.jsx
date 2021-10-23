import React, { Component } from "react";
import {withAuth} from '../../../hoc/withAuth'
import { Redirect } from "react-router-dom";

class AccountFavorites extends Component {
  render() {
    return this.props.isAuth ? (
      <div className="container">Account Favorites</div>
    ) : (
        <Redirect to="/" />
      );
  }
}

export default withAuth(AccountFavorites);