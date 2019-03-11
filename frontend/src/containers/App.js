import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import LandingPage from "views/LandingPage/LandingPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import SignupPage from "views/SignupPage/SignupPage.jsx";
import ControllerPage from "views/ControllerPage/ControllerPage.jsx";
import ForumPage from "views/ForumPage/ForumPage.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isFetching, isAuthenticated, currentUser } = this.props;
    return (
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path="/login-page" component={LoginPage}></Route>
        <Route exact path="/signup-page" component={SignupPage}></Route>
        <Route exact path="/controller-page" component={ControllerPage} />
        <Route exact path="/forum-page" component={ForumPage} />
      </Switch>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  notificationHolder: PropTypes.object
};

function mapStateToProps(state) {
  const { auth } = state;
  const { isFetching, isAuthenticated, currentUser } = auth;

  return {
    isFetching,
    isAuthenticated,
    currentUser
  };
}

export default withRouter(connect(mapStateToProps)(App));