import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
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
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.jsx";

import image from "assets/img/bg7.jpg";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameOrEmail: '',
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

  updateUsernameOrEmail(evt) {
    this.setState({
      usernameOrEmail: evt.target.value
    });
  }

  updatePassword(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  validateUsernameOrEmail = (name) => {
    if (!name) {
      this.setState({
        openNotification: true,
        notificationType: "Error",
        notificationDescription: "Username or email may not be empty."
      });
      return false;
    } else {
      return true;
    }
  }

  validatePassword = (pass) => {
    if (!pass) {
      this.setState({
        openNotification: true,
        notificationType: "Error",
        notificationDescription: "Password may not be empty."
      });
      return false;
    } else {
      return true;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const loginRequest = Object.assign({}, this.state);
    if (this.validateUsernameOrEmail(loginRequest.usernameOrEmail)) {
      if (this.validatePassword(loginRequest.password)) {
        this.props.handleLogin(loginRequest);
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
    const { classes, isAuthenticated, currentUser } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="YeePlus Controller"
          links={<HeaderLinks dropdownHoverColor="info" isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={this.handleLogout} />}
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
                <Card>
                  <form className={classes.form} onSubmit={this.handleSubmit}>
                    <CardHeader
                      color="primary"
                      signup
                      className={classes.cardHeader}
                    >
                      <h4 className={classes.cardTitle}>Login</h4>
                    </CardHeader>
                    <CardBody signup>
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
                      <CustomInput
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Username or email...",
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                          value: this.state.email,
                          onChange: evt => this.updateUsernameOrEmail(evt)
                        }}
                      />
                      <CustomInput
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Password...",
                          type: "password",
                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon className={classes.inputIconsColor}>
                                lock_utline
                              </Icon>
                            </InputAdornment>
                          ),
                          value: this.state.password,
                          onChange: evt => this.updatePassword(evt)
                        }}
                      />
                    </CardBody>
                    <div className={classes.textCenter}>
                      <Button simple color="primary" size="lg" type="submit">
                        Get started
                      </Button>
                    </div>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer
            className={classes.footer}
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

export default withStyles(loginPageStyle)(LoginPage);
