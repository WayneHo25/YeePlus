import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import configureStore from 'store/ConfigureStore'

import 'assets/scss/material-kit-pro-react.scss'
import App from 'containers/App'
import registerServiceWorker from 'registerServiceWorker'

const store = configureStore()

render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
