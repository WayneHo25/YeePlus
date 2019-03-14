import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Snack from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import snackbarContentStyle from "assets/jss/material-kit-pro-react/components/snackbarContentStyle.jsx";

class SnackbarContent extends React.Component {
  constructor(props) {
    super(props);
    this.closeAlert = this.closeAlert.bind(this);
  }

  closeAlert() {
    this.props.closeAlert(false);
  }

  render() {
    const { classes, message, color, close, icon, open } = this.props;
    let action = [];
    if (close !== undefined) {
      action = [
        <IconButton
          className={classes.iconButton}
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={this.closeAlert}
        >
          <Close className={classes.close} />
        </IconButton>
      ];
    }
    let snackIcon = null;
    switch (typeof icon) {
      case "function":
        snackIcon = <props.icon className={classes.icon} />;
        break;
      case "string":
        snackIcon = <Icon className={classes.icon}>{icon}</Icon>;
        break;
      default:
        snackIcon = null;
        break;
    }
    let alert = null;
    if (open) {
      alert = (
        <Snack
          message={
            <div>
              {snackIcon}
              {message}
              {close !== undefined ? action : null}
            </div>
          }
          classes={{
            root: classes.root + " " + classes[color],
            message: classes.message + " " + classes.container
          }}
        />
      );
    } else {
      alert = null;
    }
    return alert;
  }
}

SnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
  close: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  open: PropTypes.bool
};

export default withStyles(snackbarContentStyle)(SnackbarContent);
