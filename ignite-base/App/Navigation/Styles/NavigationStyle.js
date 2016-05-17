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
    fontSize: 20,
    fontFamily: Fonts.bold,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5
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
  navButtonTextAndroid: {
    marginTop: 18,
    fontSize: 16
  },
  navButtonLeft: {
    margin: Metrics.baseMargin,
  },
  navButtonLeftAndroid: {
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: (Platform.OS === 'android') ? 16 : 0,
    marginTop: (Platform.OS === 'android') ? 8 : 0,
    justifyContent: 'center'
  },
  navigationBar: {
    backgroundColor: Colors.drawerColor,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
  },
  backButton : {
    marginTop: (Platform.OS === 'android') ? 12 : 4
  },
  navButtonTextAndroid: {
    marginTop: 18,
    fontSize: 16
  },
  navButtonLeftAndroid: {
    marginTop: 18,
    marginLeft: 16
  },
})

export default NavigationStyle
