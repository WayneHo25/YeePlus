import {
  primaryColor,
  blackColor,
  whiteColor,
  grayColor,
  hexToRgb,
  cardTitle
} from 'assets/jss/material-kit-pro-react.jsx'

import tooltipsStyle from 'assets/jss/material-kit-pro-react/tooltipsStyle.jsx'

const sectionPillsStyle = theme => ({
  ...tooltipsStyle,
  root: {
    marginTop: '20px',
    paddingLeft: '0',
    marginBottom: '0',
    overflow: 'visible !important'
  },
  flexContainer: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  },
  displayNone: {
    display: 'none !important'
  },
  fixed: {
    overflowX: 'visible'
  },
  horizontalDisplay: {
    display: 'block'
  },
  pills: {
    float: 'left',
    position: 'relative',
    display: 'block',
    borderRadius: '30px',
    minWidth: '100px',
    textAlign: 'center',
    transition: 'all .3s',
    padding: '10px 15px',
    color: grayColor[15],
    height: 'auto',
    opacity: '1',
    maxWidth: '100%',
    margin: '0 5px',
    minHeight: 'unset'
  },
  horizontalPills: {
    width: '100%',
    float: 'none !important',
    '& + button': {
      margin: '10px 0'
    }
  },
  labelContainer: {
    padding: '0!important',
    color: 'inherit'
  },
  label: {
    lineHeight: '24px',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: '500',
    position: 'relative',
    display: 'block',
    color: 'inherit'
  },
  primary: {
    '&,&:hover': {
      color: whiteColor,
      backgroundColor: primaryColor[0],
      boxShadow:
        '0 4px 20px 0px rgba(' +
        hexToRgb(blackColor) +
        ', 0.14), 0 7px 10px -5px rgba(' +
        hexToRgb(primaryColor[0]) +
        ', 0.4)'
    }
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  section: {
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    padding: '70px 0'
  },
  textCenter: {
    textAlign: 'center'
  },
  category: {
    color: 'rgba(' + hexToRgb(whiteColor) + ', 0.7) !important',
    marginTop: '10px'
  },
  cardTitle: {
    ...cardTitle,
    color: whiteColor + '  !important'
  },
  icons: {
    width: '1.1rem',
    height: '1.1rem',
    position: 'relative',
    display: 'inline-block',
    top: '0',
    marginTop: '-1em',
    marginBottom: '-1em',
    marginRight: '4px',
    verticalAlign: 'middle'
  },
  tabSpace: {
    padding: '20px 0 50px'
  }
})

export default sectionPillsStyle
