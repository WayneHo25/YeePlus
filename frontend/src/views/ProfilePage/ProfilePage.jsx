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

import profilePageStyle from 'assets/jss/material-kit-pro-react/views/profilePageStyle.jsx'

class ProfilePage extends React.Component {
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
        <Parallax image={require('assets/img/bg5.jpg')} filter='dark' small>
          <div className={classes.container}>
            <GridContainer justify='center'>
              <GridItem xs={12} sm={12} md={8} className={classes.textCenter}>
                <h2 className={classes.title}>
                  A Way for You to Share Information about the People You Have
                </h2>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classes.main}>
          <div className={classes.container}>
            <div className={classes.section}>
              <h3 className={classNames(classes.textCenter, classes.title2)}>New Version of User Profile is Coming Soon.</h3>
            </div>
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

export default withStyles(profilePageStyle)(ProfilePage)
