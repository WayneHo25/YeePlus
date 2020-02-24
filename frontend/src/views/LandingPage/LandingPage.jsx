import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import Header from 'components/Header/Header.jsx'
import Footer from 'components/Footer/Footer.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import Parallax from 'components/Parallax/Parallax.jsx'
// Sections for this page
import SectionProduct from './Sections/SectionProduct.jsx'
import SectionContact from './Sections/SectionContact.jsx'

import landingPageStyle from 'assets/jss/material-kit-pro-react/views/landingPageStyle.jsx'

class LandingPage extends React.Component {
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
    const { classes, isAuthenticated, currentUser, ...rest } = this.props
    return (
      <div>
        <Header
          color='transparent'
          brand='YeePlus Controller'
          links={<HeaderLinks dropdownHoverColor='info' isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={this.handleLogout} />}
          fixed
          changeColorOnScroll={{
            height: 100,
            color: 'info'
          }}
          {...rest}
        />
        <Parallax image={require('assets/img/bg2.jpg')} filter='dark'>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <h1 className={classes.title}>Start Talking to Your Lights</h1>
                <h4>
                  YeePlus Controller is the simplest, smartest way to control your
                  smart Yeelight product online, who is an innovative leader
                  dedicated for smarting lighting application.
                </h4>
                <br />
                <Button
                  color='danger'
                  size='lg'
                  href='https://www.yeelight.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Learn more
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <SectionProduct />
            <SectionContact />
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

export default withStyles(landingPageStyle)(LandingPage)
