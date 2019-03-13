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

import { notification } from 'antd';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(loginRequest) {
    this.props.dispatch(loginUser(loginRequest, this.props.history));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notificationHolder !== this.props.notificationHolder) {
      const { notificationHolder } = nextProps;
      notification.open({
        message: notificationHolder.message,
        description: notificationHolder.description
      });
    }
  }

  render() {
    const { isFetching, isAuthenticated, currentUser, notificationHolder } = this.props;
    return (
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route path="/login-page" render={(props) => <LoginPage onLogin={this.handleLogin} {...props}/>}></Route>
        <Route path="/signup-page" component={SignupPage}></Route>
        <Route path="/controller-page" component={ControllerPage} />
        <Route path="/forum-page" component={ForumPage} />
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