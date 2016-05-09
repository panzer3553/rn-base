import configureStore from './Store/Store'
import { Provider } from 'react-redux'
import React from 'react-native'
import App from './Root.js'
const store = configureStore()

export default class Root extends React.Component {
  
  render () {
  	return (
  		<Provider store={store}>
          <App />
  		</Provider>
  	    )
  }
}