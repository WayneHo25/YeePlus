import React from 'react'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons
import Build from '@material-ui/icons/Build'
import Code from '@material-ui/icons/Code'
// core components
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import Card from 'components/Card/Card.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import Button from 'components/CustomButtons/Button.jsx'

import projectsStyle from 'assets/jss/material-kit-pro-react/views/sectionsSections/projectsStyle.jsx'

import cardProject1 from 'assets/img/examples/card-project1.jpg'

function SectionProjects ({ ...props }) {
  const { classes, ...rest } = props
  return (
    <div className='cd-section' {...rest}>
      <div className={classes.projects}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card
                raised
                background
                style={{ backgroundImage: `url(${cardProject1})` }}
              >
                <CardBody background>
                  <h6 className={classes.cardCategory}>NEWS</h6>
                  <a href='#pablito' onClick={e => e.preventDefault()}>
                    <h3 className={classes.cardTitleWhite}>
                      New Version of YeePlus Controller is Released.
                    </h3>
                  </a>
                  <p className={classes.cardDescription}>
                    YeePlus Controller is using Yeelight 3rd-party control protocol to control
                    all Yeelight WiFi products. This control protocol uses a SSDP-like discovering
                    mechanism and JSON encoded controlling command.
                  </p>
                  <Button round color='primary' href='https://github.com/WayneHo25/YeePlus-Controller'>
                    <Code /> Download YeePlus
                  </Button>
                  <Button round color='info' href='https://www.yeelight.com/faqs/lan_control'>
                    <Build /> Find LAN Control
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  )
}

export default withStyles(projectsStyle)(SectionProjects)
