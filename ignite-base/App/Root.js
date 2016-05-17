import React from 'react'
import { View, Text, Navigator, StatusBar } from 'react-native'
import {Router, Routes, NavigationBar} from './Navigation/'
import Actions from './Actions/Creators'
import Drawer from 'react-native-drawer'

// Styles
import styles from './Containers/Styles/RootStyle'

export default class RNBase extends React.Component {

  renderApp () {
    return (
      <View style={styles.applicationView}>
        <StatusBar
          barStyle='light-content'
        />
          <Navigator
            ref={(ref) => { this.navigator = ref }}
            initialRoute={Routes.TabsViewScreen}
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
