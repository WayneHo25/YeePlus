import React from 'react'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import Header from 'components/Header/Header.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import Footer from 'components/Footer/Footer.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'

import errorPageStyle from 'assets/jss/material-kit-pro-react/views/errorPageStyles.jsx'

import image from 'assets/img/clint-mckoy.jpg'

class Components extends React.Component {
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
          absolute
          color='transparent'
          brand='YeePlus Controller'
          links={<HeaderLinks dropdownHoverColor='dark' isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={this.handleLogout} />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: 'url(' + image + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'top center'
          }}
        >
          {/* <div className={classes.container}> */}
          <div className={classes.contentCenter}>
            <GridContainer>
              <GridItem md={12}>
                <h1 className={classes.title}>404</h1>
                <h2 className={classes.subTitle}>Page not found :(</h2>
                <h4 className={classes.description}>
                  Ooooups! Looks like you got lost.
                </h4>
              </GridItem>
            </GridContainer>
          </div>
          {/* </div> */}
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

export default withStyles(errorPageStyle)(Components)
