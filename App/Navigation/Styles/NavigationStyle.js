import React, { Platform } from 'react-native'
import { Fonts, Metrics, Colors } from '../../Themes/'

const NavigationStyle = React.StyleSheet.create({
  titleWrapper: {
    flex: 1,
    padding: Metrics.baseMargin,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navTitle: {
    color: Colors.snow,
    fontSize: Metrics.fonts.regular,
    fontFamily: Fonts.bold,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  navSubtitle: {
    flex: 1,
    color: Colors.snow,
    fontSize: Metrics.fonts.medium,
    fontFamily: Fonts.base,
    alignSelf: 'center'
  },
  navButtonText: {
    color: Colors.snow,
    justifyContent: 'center',
    marginLeft: 8,
    marginTop: (Platform.OS === 'android') ? 16 : 0,
    padding: Metrics.baseMargin
  },
  navButtonLeft: {
    marginLeft: 16,
    marginTop: (Platform.OS === 'android') ? 8 : 0,
    justifyContent: 'center'
  },
  navigationBar: {
    backgroundColor: Colors.drawerColor
  },
  backButton : {
    marginTop: (Platform.OS === 'android') ? 12 : 4
  }
})

export default NavigationStyle
