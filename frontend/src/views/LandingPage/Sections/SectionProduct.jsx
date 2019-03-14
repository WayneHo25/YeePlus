import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import HowToReg from "@material-ui/icons/HowToReg";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.jsx";

class SectionProduct extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={8}>
            <h2 className={classes.title}>Your life will be much easier</h2>
            <h5 className={classes.description}>
              YeePlus Controller provides everything your smart lighting needs in a smart, simple and convenience 
              way. You can connect your smart Yeelight lighting devices online through clear, concise and efficient 
              user interface.
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4}>
              <InfoArea
                title="User Register"
                description="Registered users can manage their profiles, keep previous smart lighting devices list and setting, share their feedbacks and ideas."
                icon={HowToReg}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <InfoArea
                title="Safety Guarantee"
                description="Use Yeelight control protocol to discover and control LED devices which is a SSDP-like discovering mechanism and JSON encoded controlling command."
                icon={Fingerprint}
                iconColor="danger"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <InfoArea
                title="Free Chat"
                description="YeePlus forum provides additional option for users easily share their ideas about Yeelight products with others, and give feedback to me."
                icon={Chat}
                iconColor="info"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(SectionProduct);
