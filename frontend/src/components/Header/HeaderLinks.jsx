/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import Forum from "@material-ui/icons/Forum";
import AccountCircle from "@material-ui/icons/AccountCircle";
import People from "@material-ui/icons/People";
import ExitToApp from "@material-ui/icons/ExitToApp";

// core components
import Button from "components/CustomButtons/Button.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

import headerLinksStyle from "assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };
  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function () {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };
  var onClickSections = {};

  const { classes, dropdownHoverColor, isAuthenticated, currentUser } = props;
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
            buttonIcon={AccountCircle}
            dropdownHeader={"Sign in as " + `${props.currentUser.name}`}
            dropdownList={[
              <Link to={`/users/${props.currentUser.username}`} className={classes.dropdownLink}>
                <People className={classes.dropdownIcons} /> PROFILE
              </Link>,
              <Link to="/" className={classes.dropdownLink}>
                <ExitToApp className={classes.dropdownIcons} /> LOGOUT
              </Link>
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
