import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { loginUser, signupUser, loadCurrentUser, logoutUser } from 'actions/Auth'

import LandingPage from 'views/LandingPage/LandingPage.jsx'
import LoginPage from 'views/LoginPage/LoginPage.jsx'
import SignupPage from 'views/SignupPage/SignupPage.jsx'
import ProfilePage from 'views/ProfilePage/ProfilePage.jsx'
import ControllerPage from 'views/ControllerPage/ControllerPage.jsx'
import ForumPage from 'views/ForumPage/ForumPage.jsx'
import NewDiscussion from 'views/ForumPage/NewDiscussion.jsx'
import ErrorPage from 'views/ErrorPage/ErrorPage.jsx'

class App extends Component {
  constructor (props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentWillMount () {
    this.props.dispatch(loadCurrentUser())
  }

  handleLogin (loginRequest) {
    this.props.dispatch(loginUser(loginRequest, this.props.history))
  }

  handleSignup (signupRequest) {
    this.props.dispatch(signupUser(signupRequest, this.props.history))
  }

  handleLogout () {
    this.props.dispatch(logoutUser(this.props.history))
  }

  render () {
    const { isFetching, isAuthenticated, currentUser, notificationHolder } = this.props
    return (
      <Switch>
        <Route exact path='/' render={(props) => <LandingPage isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={this.handleLogout} {...props} />} />
        <Route path='/login-page' render={(props) => <LoginPage isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogin={this.handleLogin} notificationHolder={notificationHolder} handleLogout={this.handleLogout} {...props} />} />
        <Route path='/signup-page' render={(props) => <SignupPage isAuthenticated={isAuthenticated} currentUser={currentUser} handleSignup={this.handleSignup} notificationHolder={notificationHolder} handleLogout={this.handleLogout} {...props} />} />
        <Route path='/profile-page' render={(props) => <ProfilePage isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={this.handleLogout} {...props} />} />
        <Route path='/controller-page' render={(props) => <ControllerPage isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={this.handleLogout} {...props} />} />
        <Route path='/forum-page' render={(props) => <ForumPage isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={this.handleLogout} {...props} />} />
        <Route path='/:forumID/new-discussion' render={(props) => <NewDiscussion isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={this.handleLogout} {...props} />} />
        <Route render={(props) => <ErrorPage isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={this.handleLogout} {...props} />} />
      </Switch>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  notificationHolder: PropTypes.object
}

function mapStateToProps (state) {
  const { auth } = state
  const { isFetching, isAuthenticated, currentUser, notificationHolder } = auth

  return {
    isFetching,
    isAuthenticated,
    currentUser,
    notificationHolder
  }
}

export default withRouter(connect(mapStateToProps)(App))
