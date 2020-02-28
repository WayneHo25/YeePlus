import {
  container,
  title,
  main,
  whiteColor,
  mainRaised
} from 'assets/jss/material-kit-pro-react.jsx'

const forumPageStyle = {
  container: {
    ...container,
    zIndex: '2',
    position: 'relative'
  },
  textCenter: {
    textAlign: 'center'
  },
  title: {
    ...title,
    color: whiteColor
  },
  main: {
    ...main,
    ...mainRaised
  },
  right: {
    padding: '15px 0',
    margin: '0',
    float: 'right'
  }
}

export default forumPageStyle
