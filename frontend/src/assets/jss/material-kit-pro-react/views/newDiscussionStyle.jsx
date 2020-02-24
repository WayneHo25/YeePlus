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
  block: {
    color: 'inherit',
    padding: '0.9375rem',
    fontWeight: '500',
    fontSize: '12px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    textDecoration: 'none',
    position: 'relative',
    display: 'block'
  },
  inlineBlock: {
    display: 'inline-block',
    padding: '0px',
    width: 'auto'
  },
  list: {
    marginBottom: '0',
    padding: '0',
    marginTop: '0'
  },
  left: {
    float: 'left!important',
    display: 'block'
  },
  right: {
    padding: '15px 0',
    margin: '0',
    float: 'right'
  },
  icon: {
    width: '18px',
    height: '18px',
    top: '3px',
    position: 'relative'
  },
  tabSpace: {
    padding: '50px 0 50px'
  }
}

export default controllerPageStyle
