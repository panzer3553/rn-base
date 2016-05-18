import React from 'react'
import { View, Text, Navigator, StatusBar } from 'react-native'
import {Router, Routes, NavigationBar} from './Navigation/'
import Actions from './Actions/Creators'

import styles from './Containers/Styles/RootStyle'

// https://github.com/zo0r/react-native-push-notification

export default class RNBase extends React.Component {

  renderApp () {
    return (
      <View style={styles.applicationView}>
        <StatusBar
          barStyle='light-content'/>
      <Navigator
        ref='navigator'
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
