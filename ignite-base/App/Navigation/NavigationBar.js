import React from 'react'
import { Navigator, Platform } from 'react-native'
import NavigationBarRouteMapper from './NavigationBarRouteMapper'
// Stylesheet
import styles from './Styles/NavigationStyle'

export default {
  render () {
    return (
      <Navigator.NavigationBar
        navigationStyles={Platform.OS === 'android' ? Navigator.NavigationBar.StylesAndroid :Navigator.NavigationBar.StylesIOS}
        routeMapper={NavigationBarRouteMapper}
        style={styles.navigationBar}
      />
    )
  }
}
