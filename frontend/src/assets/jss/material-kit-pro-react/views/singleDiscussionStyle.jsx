import {
  container,
  title,
  main,
  whiteColor,
  grayColor,
  mainRaised
} from 'assets/jss/material-kit-pro-react.jsx'

const singleDiscussionStyle = {
  container: {
    ...container,
    zIndex: '2',
    position: 'relative',
    '& p': {
      fontSize: '1.188rem',
      lineHeight: '1.5em',
      color: grayColor[15],
      marginBottom: '30px',
      wordWrap: 'break-word',
      wordBreak: 'break-all'
    }
  },
  textCenter: {
    textAlign: 'center'
  },
  title: {
    ...title,
    color: whiteColor
  },
  title2: {
    ...title,
    wordWrap: 'break-word',
    wordBreak: 'break-all'
  },
  title3: {
    ...title,
    marginBottom: '30px',
    textAlign: 'center'
  },
  main: {
    ...main,
    ...mainRaised
  },
  section: {
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    padding: '70px 0'
  },
  form: {
    margin: '0'
  },
  right: {
    padding: '15px 0',
    margin: '0',
    float: 'right'
  },
  tabSpace: {
    padding: '50px 0 50px'
  },
  tabSpace2: {
    padding: '10px 0 10px'
  },
  footerButtons: {
    float: 'right'
  },
  color555: {
    '&,& *': {
      color: grayColor[15] + ' !important'
    }
  }
}

export default singleDiscussionStyle
