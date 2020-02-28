import {
  container,
  title,
  main,
  whiteColor,
  mainRaised
} from 'assets/jss/material-kit-pro-react.jsx'

const newDiscussionStyle = {
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
  title2: {
    ...title,
    marginBottom: 0
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
  footerButtons: {
    float: 'right'
  }
}

export default newDiscussionStyle
