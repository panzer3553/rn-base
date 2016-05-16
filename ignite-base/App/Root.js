import React from 'react'
import { View, Text, Navigator, StatusBar } from 'react-native'
import {Router, Routes, NavigationBar} from './Navigation/'
import configureStore from './Store/Store'
import { Provider } from 'react-redux'
import Actions from './Actions/Creators'
import PushNotification from 'react-native-push-notification'

// Styles
import styles from './Containers/Styles/RootStyle'

const store = configureStore()

// https://github.com/zo0r/react-native-push-notification

export default class RNBase extends React.Component {

  componentWillMount () {
    const { dispatch } = store
    dispatch(Actions.startup())
  }

  renderApp () {
    return (
      <View style={styles.applicationView}>
        <StatusBar
          barStyle='light-content'
        />
      <Navigator
        ref={(ref) => { this.navigator = ref }}
        initialRoute={Routes.TabViewScreen}
        configureScene={Router.configureScene}
        renderScene={Router.renderScene}
        style={styles.container}
      />
      </View>
    )
  }

  render () {
    return this.renderApp()
  }
}
