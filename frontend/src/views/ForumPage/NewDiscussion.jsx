import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import Header from 'components/Header/Header.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import Footer from 'components/Footer/Footer.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import Parallax from 'components/Parallax/Parallax.jsx'
import Media from 'components/Media/Media.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import Button from 'components/CustomButtons/Button.jsx'

import newDiscussionStyle from 'assets/jss/material-kit-pro-react/views/newDiscussionStyle.jsx'

class NewDiscussion extends React.Component {
  constructor (props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
  }

  handleLogout () {
    this.props.handleLogout()
  }

  render () {
    const { classes, isAuthenticated, currentUser } = this.props
    return (
      <div>
        <Header
          brand='YeePlus Controller'
          links={<HeaderLinks dropdownHoverColor='info' isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={this.handleLogout} />}
          fixed
          color='transparent'
          changeColorOnScroll={{
            height: 100,
            color: 'info'
          }}
        />
        <Parallax image={require('assets/img/bg10.jpg')} filter='dark' small>
          <div className={classes.container}>
            <GridContainer justify='center'>
              <GridItem xs={12} sm={12} md={8} className={classes.textCenter}>
                <h2 className={classes.title}>
                  A Place for Us to Share and Discover New Ideas
                </h2>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classes.main}>
          <div className={classes.container}>
            <div className={classes.tabSpace} />
            {
              this.props.isAuthenticated
                ? (<div>
                  <GridContainer justify='center'>
                    <GridItem xs={12} sm={10} md={8}>
                      <h3 className={classes.title3}>Post your discussion</h3>
                      <Media
                        avatar={currentUser.name}
                        body={
                          <div>
                            <CustomInput
                              labelText=' Write the discussion title... '
                              id='title'
                              formControlProps={{
                                fullWidth: true
                              }}
                            />
                            <CustomInput
                              labelText=' Write the discussion content... '
                              id='content'
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                multiline: true,
                                rows: 5
                              }}
                            />
                          </div>

                        }
                        footer={
                          <Button color='primary' round className={classes.footerButtons}>
                            Post discussion
                          </Button>
                        }
                      />
                    </GridItem>
                  </GridContainer>
                   </div>)
                : <h2 className={classNames(classes.textCenter, classes.title2)}>Please sign in before posting a new discussion.</h2>
            }
            <div className={classes.tabSpace} />
          </div>
        </div>
        <Footer
          content={
            <div className={classes.right}>
              Copyright &copy; {1900 + new Date().getYear()}{' '}
              <a href='http://www.wayneblog.tk'>Wayne He</a> All Rights
              Reserved.
            </div>
          }
        />
      </div>
    )
  }
}

export default withStyles(newDiscussionStyle)(NewDiscussion)
