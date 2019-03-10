import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import LandingPage from "views/LandingPage/LandingPage.jsx";

import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, isFetching, isAuthenticated, currentUser, ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          brand="YeePlus Controller"
          links={<HeaderLinks dropdownHoverColor="info" />}
          fixed
          changeColorOnScroll={{
            height: 300,
            color: "info"
          }}
          {...rest}
        />
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
        </Switch>
      </div>
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