import React from 'react'
import configureStore from './Store/Store'
import { Provider } from 'react-redux'
import App from './Root.js'
const store = configureStore()

export default class setup extends React.Component{
  
  render () {
  	return (
  			<Provider store={store}>
  			  <App/>
  			</Provider>
  	  	   )
  }
}