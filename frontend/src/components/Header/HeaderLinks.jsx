import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import Forum from "@material-ui/icons/Forum";
import AccountBox from "@material-ui/icons/AccountBox";
import FolderShared from "@material-ui/icons/FolderShared";
import ExitToApp from "@material-ui/icons/ExitToApp";
// core components
import Button from "components/CustomButtons/Button.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

import headerLinksStyle from "assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx";

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.handleLogout();
  }

  render() {
    const { classes, dropdownHoverColor, isAuthenticated, currentUser } = this.props;

    if (isAuthenticated) {
      return (
        <List className={classes.list + " " + classes.mlAuto}>
          <ListItem className={classes.listItem}>
            <Button
              component={Link} to="/controller-page"
              className={classes.navLink}
              color="transparent"
            >
              <Apps /> CONTROLLER
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              component={Link} to="/forum-page"
              className={classes.navLink}
              color="transparent"
            >
              <Forum /> FORUM
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <CustomDropdown
              noLiPadding
              navDropdown
              hoverColor={dropdownHoverColor}
              buttonText="ACCOUNT"
              buttonProps={{
                className: classes.navLink,
                color: "transparent"
              }}
              buttonIcon={AccountBox}
              dropdownHeader={`Sign in as ${currentUser.name}`}
              dropdownList={[
                <Link to={`/profile-page`} className={classes.dropdownLink}>
                  <FolderShared className={classes.dropdownIcons} /> PROFILE
                </Link>,
                <div
                  className={classes.dropdownLink}
                  onClick={this.handleLogout}
                >
                  <ExitToApp className={classes.dropdownIcons} /> LOGOUT
                </div>
              ]}
            />
          </ListItem>
        </List>
      );
    } else {
      return (
        <List className={classes.list + " " + classes.mlAuto}>
          <ListItem className={classes.listItem}>
            <Button
              component={Link} to="/controller-page"
              className={classes.navLink}
              color="transparent"
            >
              <Apps /> CONTROLLER
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              component={Link} to="/forum-page"
              className={classes.navLink}
              color="transparent"
            >
              <Forum /> FORUM
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              component={Link} to="/login-page"
              className={classes.navLink}
              color="transparent"
            >
              LOGIN
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              component={Link} to="/signup-page"
              color={window.innerWidth < 960 ? "info" : "white"}
              className={classes.navButton}
              round
            >
              REGISTER
            </Button>
          </ListItem>
        </List>
      );
    }
  }
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};

export default withStyles(headerLinksStyle)(HeaderLinks);
