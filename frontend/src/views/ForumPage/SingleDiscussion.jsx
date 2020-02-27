import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
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

import { getDiscussionByDiscussionID } from 'util/APIUtils'
import { getTimePassed } from 'util/Time'

import singleDiscussionStyle from 'assets/jss/material-kit-pro-react/views/singleDiscussionStyle.jsx'

class SingleDiscussion extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      discussion: [],
      opinions: [],
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
    this.loadSingleDiscussion(this.props.match.params.discussionID)
  }

  loadSingleDiscussion (did) {
    let promise

    promise = getDiscussionByDiscussionID(did)

    if (!promise) {
      return
    }

    this.setState({
      isLoading: true
    })

    promise
      .then(response => {
        this.setState({
          discussion: response,
          opinions: response.responses,
          isLoading: false
        })
      }).catch(error => {
        this.setState({
          isLoading: false
        })
      })
  }

  handleLogout () {
    this.props.handleLogout()
  }

  render () {
    const { classes, isAuthenticated, currentUser } = this.props
    const opinionList = []
    this.state.opinions.map(opinion => {
      opinionList.push(
        <Media
          key={opinion.id}
          avatar={opinion.user.name}
          title={
            <span>
              {opinion.user.name} <small>· {getTimePassed(opinion.date)}</small>
            </span>
          }
          body={
            <p className={classes.color555}>
              {opinion.content}
            </p>
          }
        />)
      return true
    })
    const ColorCircularProgress = withStyles({
      root: {
        color: '#9c27b0'
      }
    })(CircularProgress)
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
            <GridContainer justify='center'>
              <GridItem xs={12} sm={10} md={8}>
                <div className={classes.tabSpace} />
                <h3 className={classes.title4}>
                  {this.state.discussion.title}
                </h3>
                <p>
                  {this.state.discussion.content}
                </p>
                <div className={classes.textCenter}>
                  {
                    this.state.isLoading
                      ? <ColorCircularProgress /> : null
                  }
                </div>
                {
                  this.props.isAuthenticated
                    ? (<div>
                      <h3 className={classes.title3}>Post your opinion</h3>
                      <Media
                        avatar={currentUser.name}
                        body={
                          <div>
                            <CustomInput
                              labelText=' Write the opinion content... '
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
                            Post opinion
                          </Button>
                        }
                      />
                    </div>)
                    : <h2 className={classNames(classes.textCenter, classes.title2)}>Please sign in before posting a new opinion.</h2>
                }
                <div>
                  {opinionList}
                </div>
                <div className={classes.textCenter}>
                  {
                    this.state.isLoading
                      ? <ColorCircularProgress /> : null
                  }
                </div>
              </GridItem>
            </GridContainer>
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

export default withStyles(singleDiscussionStyle)(SingleDiscussion)
