import React from 'react'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Tooltip from '@material-ui/core/Tooltip'
// @material-ui/icons
import Reply from '@material-ui/icons/Reply'
import Favorite from '@material-ui/icons/Favorite'
// core components
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import NavPills from 'components/NavPills/NavPills.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Media from 'components/Media/Media.jsx'

import profile4 from 'assets/img/faces/card-profile4-square.jpg'

import sectionPillsStyle from 'assets/jss/material-kit-pro-react/views/blogPostsSections/sectionPillsStyle.jsx'

function SectionPills ({ ...props }) {
  const { classes } = props
  return (
    <div className={classes.section}>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={10} md={8}>
          <NavPills
            alignCenter
            tabs={[
              {
                tabButton: 'All',
                tabContent: (
                  <div>
                    <Media
                      avatar={profile4}
                      title={
                        <span>
                          Tina Andrew <small>· 7 minutes ago</small>
                        </span>
                      }
                      body={
                        <p className={classes.color555}>
                          Chance too good. God level bars. I'm so proud of
                          @LifeOfDesiigner #1 song in the country. Panda! Don't be
                          scared of the truth because we need to restart the human
                          foundation in truth I stand with the most humility. We are so
                          blessed!
                        </p>
                      }
                      footer={
                        <div>
                          <Tooltip
                            id='tooltip-tina'
                            title='Reply to comment'
                            placement='top'
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <Button
                              color='primary'
                              simple
                              className={classes.footerButtons}
                            >
                              <Reply className={classes.footerIcons} /> Reply
                            </Button>
                          </Tooltip>

                          <Button
                            color='danger'
                            simple
                            className={classes.footerButtons}
                          >
                            <Favorite className={classes.footerIcons} /> 24
                          </Button>
                        </div>
                      }
                    />
                  </div>
                )
              },
              {
                tabButton: 'YeePlus',
                tabContent: 'YeePlus Forums'
              },
              {
                tabButton: 'FAQ',
                tabContent: 'FAQ Forums'
              },
              {
                tabButton: 'Feedback',
                tabContent: 'Feedback Forums'
              }
            ]}
          />
          <div className={classes.tabSpace} />
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default withStyles(sectionPillsStyle)(SectionPills)
