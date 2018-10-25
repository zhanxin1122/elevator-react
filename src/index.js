import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import * as serviceWorker from './serviceWorker'
import './style/index.less'
import Home from './pages/home'
import { BrowserRouter } from 'react-router-dom'

function HomeRoute() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(<HomeRoute />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
