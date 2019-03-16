import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";

import image from "assets/img/bg7.jpg";

import {
  USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from 'constants/Config.js';
import { checkUsernameAvailability, checkEmailAvailability } from '../../util/APIUtils';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      avatarUrl: '/',
      email: '',
      password: '',
      openNotification: false,
      notificationType: this.props.notificationHolder.type,
      notificationDescription: this.props.notificationHolder.description
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  updateUsername(evt) {
    this.setState({
      name: evt.target.value,
      username: evt.target.value
    });
  }

  updateEmail(evt) {
    this.setState({
      email: evt.target.value
    });
  }

  updatePassword(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  validateUsername = (username) => {
    if (username.length < USERNAME_MIN_LENGTH) {
      this.setState({
        openNotification: true,
        notificationType: "Error",
        notificationDescription: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed).`
      });
      return false;
    }

    if (username.length > USERNAME_MAX_LENGTH) {
      this.setState({
        openNotification: true,
        notificationType: "Error",
        notificationDescription: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed).`
      });
      return false;
    }

    checkUsernameAvailability(username)
      .then(response => {
        if (!response.available) {
          this.setState({
            openNotification: true,
            notificationType: "Error",
            notificationDescription: 'This username is already taken.'
          });
          return false;
        }
      }).catch(error => {
        return true;
      });

    return true;
  }

  validateEmail = (email) => {
    if (!email) {
      this.setState({
        openNotification: true,
        notificationType: "Error",
        notificationDescription: "Email may not be empty."
      });
      return false;
    }

    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
    if (!EMAIL_REGEX.test(email)) {
      this.setState({
        openNotification: true,
        notificationType: "Error",
        notificationDescription: "Email not valid."
      });
      return false;
    }

    if (email.length > EMAIL_MAX_LENGTH) {
      this.setState({
        openNotification: true,
        notificationType: "Error",
        notificationDescription: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed).`
      });
      return false;
    }

    checkEmailAvailability(email)
      .then(response => {
        if (!response.available) {
          this.setState({
            openNotification: true,
            notificationType: "Error",
            notificationDescription: 'This Email is already registered.'
          });
          return false;
        }
      }).catch(error => {
        return true;
      });

    return true;
  }

  validatePassword = (password) => {
    if (password.length < PASSWORD_MIN_LENGTH) {
      this.setState({
        openNotification: true,
        notificationType: "Error",
        notificationDescription: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed).`
      });
      return false;
    }
    if (password.length > PASSWORD_MAX_LENGTH) {
      this.setState({
        openNotification: true,
        notificationType: "Error",
        notificationDescription: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed).`
      });
      return false;
    }
    return true;

  }

  handleSubmit(event) {
    event.preventDefault();
    const signupRequest = {
      name: this.state.name,
      username: this.state.username,
      avatarUrl: this.state.avatarUrl,
      email: this.state.email,
      password: this.state.password
    };
    if (this.validateUsername(signupRequest.username)) {
      if (this.validateEmail(signupRequest.email)) {
        if (this.validatePassword(signupRequest.password)) {
          this.props.handleSignup(signupRequest);
        }
      }
    }
  }

  handleLogout() {
    this.props.handleLogout();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notificationHolder !== this.props.notificationHolder) {
      this.setState({
        openNotification: true,
        notificationType: nextProps.notificationHolder.type,
        notificationDescription: nextProps.notificationHolder.description
      });
    }
  }

  onCloseAlert(val) {
    this.setState({
      openNotification: val
    })
  }

  render() {
    const { classes, isAuthenticated, currentUser, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="YeePlus Controller"
          links={<HeaderLinks dropdownHoverColor="rose" isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={this.handleLogout} />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>Register</h2>
                  <CardBody>
                    <SnackbarContent
                      message={
                        <span>
                          <b>{this.state.notificationType}:</b> {this.state.notificationDescription}
                        </span>
                      }
                      close
                      color="warning"
                      open={this.state.openNotification}
                      closeAlert={(val) => { this.onCloseAlert(val) }}
                    />
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Face
                                className={classes.inputAdornmentIcon}
                              />
                            </InputAdornment>
                          ),
                          placeholder: "Username...",
                          value: this.state.username,
                          onChange: evt => this.updateUsername(evt)
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Email
                                className={classes.inputAdornmentIcon}
                              />
                            </InputAdornment>
                          ),
                          placeholder: "Email...",
                          value: this.state.email,
                          onChange: evt => this.updateEmail(evt)
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Icon className={classes.inputAdornmentIcon}>
                                lock_outline
                                  </Icon>
                            </InputAdornment>
                          ),
                          placeholder: "Password...",
                          type: "password",
                          value: this.state.password,
                          onChange: evt => this.updatePassword(evt)
                        }}
                      />
                      <div className={classes.textCenter}>
                        <Button round color="primary" type="submit">
                          Get started
                        </Button>
                      </div>
                    </form>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer
            content={
              <div className={classes.right}>
                Copyright &copy; {1900 + new Date().getYear()}{" "}
                <a href="http://www.wayneblog.tk">Wayne He</a> All Rights
                Reserved.
              </div>
            }
          />
        </div>
      </div>
    );
  }
}

export default withStyles(signupPageStyle)(SignupPage);
