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
import SnackbarContent from 'components/Snackbar/SnackbarContent.jsx'

import newDiscussionStyle from 'assets/jss/material-kit-pro-react/views/newDiscussionStyle.jsx'

import {
  TITLE_MAX_LENGTH, CONTENT_MAX_LENGTH
} from 'constants/Config.js'

class NewDiscussion extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      favorites: [],
      tags: [],
      pinned: false,
      forumID: 1,
      openNotification: false,
      notificationType: this.props.notificationHolder.type,
      notificationDescription: this.props.notificationHolder.description
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
    this.setState({
      forumID: this.props.match.params.forumID
    })
  }

  updateTitle (evt) {
    this.setState({
      title: evt.target.value
    })
  }

  updateContent (evt) {
    this.setState({
      content: evt.target.value
    })
  }

  validateTitle = (title) => {
    if (!title) {
      this.setState({
        openNotification: true,
        notificationType: 'Error',
        notificationDescription: 'Title may not be empty.'
      })
      return false
    }

    if (title.length > TITLE_MAX_LENGTH) {
      this.setState({
        openNotification: true,
        notificationType: 'Error',
        notificationDescription: `Title is too long (Maximum ${TITLE_MAX_LENGTH} characters allowed).`
      })
      return false
    }

    return true
  }

  validateContent = (content) => {
    if (!content) {
      this.setState({
        openNotification: true,
        notificationType: 'Error',
        notificationDescription: 'Content may not be empty.'
      })
      return false
    }

    if (content.length > CONTENT_MAX_LENGTH) {
      this.setState({
        openNotification: true,
        notificationType: 'Error',
        notificationDescription: `Content is too long (Maximum ${CONTENT_MAX_LENGTH} characters allowed).`
      })
      return false
    }
    
    return true
  }

  handleSubmit (event) {
    event.preventDefault()
    const newDiscussionRequest = {
      title: this.state.title,
      content: this.state.content,
      favorites: this.state.favorites,
      tags: this.state.tags,
      pinned: this.state.pinned,
      forumID: this.state.forumID
    }
    if (this.validateTitle(newDiscussionRequest.title)) {
      if (this.validateContent(newDiscussionRequest.content)) {
        send(newDiscussionRequest)
      }
    }
  }

  handleLogout () {
    this.props.handleLogout()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.notificationHolder !== this.props.notificationHolder) {
      this.setState({
        openNotification: true,
        notificationType: nextProps.notificationHolder.type,
        notificationDescription: nextProps.notificationHolder.description
      })
    }
  }

  onCloseAlert (val) {
    this.setState({
      openNotification: val
    })
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
            <GridContainer justify='center'>
              <GridItem xs={12} sm={10} md={8}>
                <div className={classes.section}>
                  {
                    this.props.isAuthenticated
                      ? (<div>

                        <h3 className={classes.title3}>Post your discussion</h3>
                        <SnackbarContent
                          message={
                            <span>
                              <b>{this.state.notificationType}:</b> {this.state.notificationDescription}
                            </span>
                          }
                          close
                          color='warning'
                          open={this.state.openNotification}
                          closeAlert={(val) => { this.onCloseAlert(val) }}
                        />
                        <form className={classes.form} onSubmit={this.handleSubmit}>
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
                                  value={this.state.title}
                                  onChange={evt => this.updateTitle(evt)}
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
                                  value={this.state.content}
                                  onChange={evt => this.updateContent(evt)}
                                />
                              </div>
                            }
                            footer={
                              <Button color='primary' round className={classes.footerButtons} type='submit'>
                            Post discussion
                              </Button>
                            }
                          />
                        </form>
                      </div>)
                      : <h2 className={classNames(classes.textCenter, classes.title2)}>Please sign in before posting a new discussion.</h2>
                  }
                </div>
              </GridItem>
            </GridContainer>
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
