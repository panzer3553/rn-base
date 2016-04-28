import App from './Root.js'
import { Provider } from 'react-redux'
import configureStore from './Store/Store'
import React from 'react-native'
import Actions from './Actions/Creators'
const store = configureStore()

export default class Root extends React.Component {
    constructor() {
      super()
      this.state = {
        isLoading: true,
        firstLoad: true
      }
    }

    componentWillMount(){
    }

    render() {
      return (
        <Provider store={store}>
          <App/>
        </Provider>
      )
    }
  }