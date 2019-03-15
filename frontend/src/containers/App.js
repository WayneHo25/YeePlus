import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadCurrentUser, logoutUser, loginUser } from 'actions/Auth';

import LandingPage from "views/LandingPage/LandingPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import SignupPage from "views/SignupPage/SignupPage.jsx";
import ControllerPage from "views/ControllerPage/ControllerPage.jsx";
import ForumPage from "views/ForumPage/ForumPage.jsx";
import ErrorPage from "views/ErrorPage/ErrorPage.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(loadCurrentUser())
  }

  handleLogin(loginRequest) {
    this.props.dispatch(loginUser(loginRequest, this.props.history));
  }

  handleSignup(loginRequest) {

  }

  handleLogout() {
    this.props.dispatch(logoutUser(this.props.history));
  }

  render() {
    const { isFetching, isAuthenticated, currentUser, notificationHolder } = this.props;
    return (
      <Switch>
        <Route exact path="/" render={(props) => <LandingPage isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
        <Route path="/login-page" render={(props) => <LoginPage isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogin={this.handleLogin} notificationHolder={notificationHolder} handleLogout={this.handleLogout} {...props} />}></Route>
        <Route path="/signup-page" render={(props) => <SignupPage isAuthenticated={isAuthenticated} currentUser={currentUser} handleSignup={this.handleSignup} notificationHolder={notificationHolder} handleLogout={this.handleLogout} {...props} />}></Route>
        <Route path="/controller-page" render={(props) => <ControllerPage isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
        <Route path="/forum-page" render={(props) => <ForumPage isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
        <Route render={(props) => <ErrorPage isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={this.handleLogout} {...props} />}></Route>
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
  const { isFetching, isAuthenticated, currentUser, notificationHolder } = auth;

  return {
    isFetching,
    isAuthenticated,
    currentUser,
    notificationHolder
  };
}

export default withRouter(connect(mapStateToProps)(App));