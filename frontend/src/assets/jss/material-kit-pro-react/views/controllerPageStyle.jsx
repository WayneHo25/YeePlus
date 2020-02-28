import {
  container,
  title,
  main,
  whiteColor,
  mainRaised
} from 'assets/jss/material-kit-pro-react.jsx'

const controllerPageStyle = {
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
  main: {
    ...main,
    ...mainRaised
  },
  section: {
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    padding: '70px 0'
  },
  right: {
    padding: '15px 0',
    margin: '0',
    float: 'right'
  }
}

export default controllerPageStyle
