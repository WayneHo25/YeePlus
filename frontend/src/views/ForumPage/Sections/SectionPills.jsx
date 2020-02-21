import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Tooltip from '@material-ui/core/Tooltip'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import CircularProgress from '@material-ui/core/CircularProgress'
// @material-ui/icons
import Reply from '@material-ui/icons/Reply'
// core components
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Media from 'components/Media/Media.jsx'

import { getDiscussionsByForumID } from 'util/APIUtils'

import profile4 from 'assets/img/faces/card-profile4-square.jpg'

import sectionPillsStyle from 'assets/jss/material-kit-pro-react/views/blogPostsSections/sectionPillsStyle.jsx'

class SectionPills extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      discussions: [],
      isLoading: false,
      active: 0,
      forumID: 1
    }
    this.changeForum = this.changeForum.bind(this);
  }

  handleChange = (event, active) => {
    this.setState({ active });
  };

  changeForum(fid) {
    this.setState({ forumID: fid, discussions: [] })
    this.loadDiscussionList(fid);
  }

  loadDiscussionList (fid = this.state.forumID) {
    let promise

    promise = getDiscussionsByForumID(fid)

    if (!promise) {
      return
    }

    this.setState({
      isLoading: true
    })

    promise
      .then(response => {
        const discussions = this.state.discussions.slice()

        this.setState({
          discussions: discussions.concat(response),
          isLoading: false
        })
      }).catch(error => {
        this.setState({
          isLoading: false
        })
      })
  }

  componentDidMount () {
    this.loadDiscussionList()
  }

  render () {
    const { classes } = this.props
    const flexContainerClasses = classNames({
      [classes.flexContainer]: true,
      [classes.horizontalDisplay]: false
    })
    const pillsClasses = classNames({
      [classes.pills]: true,
      [classes.horizontalPills]: false
    })
    const tabButtons = (
      <Tabs
        classes={{
          root: classes.root,
          fixed: classes.fixed,
          flexContainer: flexContainerClasses,
          indicator: classes.displayNone
        }}
        value={this.state.active}
        onChange={this.handleChange}
        centered={true}
      >
        <Tab
          key={1}
          label='Announcement'
          classes={{
            root: pillsClasses,
            labelContainer: classes.labelContainer,
            label: classes.label,
            selected: classes.primary
          }}
          onClick={() => this.changeForum(1)}
        />
        <Tab
          key={2}
          label='General'
          classes={{
            root: pillsClasses,
            labelContainer: classes.labelContainer,
            label: classes.label,
            selected: classes.primary
          }}
          onClick={() => this.changeForum(2)}
        />
        <Tab
          key={3}
          label='Feedback'
          classes={{
            root: pillsClasses,
            labelContainer: classes.labelContainer,
            label: classes.label,
            selected: classes.primary
          }}
          onClick={() => this.changeForum(3)}
        />
      </Tabs>
    )
    const discussionList = []
    this.state.discussions.forEach((discussion, discussionIndex) => {
      discussionList.push(
        <Media
          key={discussion.id}
          avatar={profile4}
          title={
            <span>
              {discussion.user.name} <small>· 7 minutes ago</small>
            </span>
          }
          body={
            <p className={classes.color555}>
              {discussion.title}
            </p>
          }
          footer={
            <div>
              <Tooltip
                id='tooltip-tina'
                title='Reply to discussion'
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
            </div>
          }
        />)
    })
    const ColorCircularProgress = withStyles({
      root: {
        color: '#9c27b0'
      }
    })(CircularProgress)
    return (
      <div className={classes.section}>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={10} md={8}>
            {tabButtons}
            <div className={classes.tabSpace} />
            {discussionList}
            <div className={classes.textCenter} >
            {
              this.state.isLoading
                ? <ColorCircularProgress /> : null
            }
            </div>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

export default withStyles(sectionPillsStyle)(SectionPills)
