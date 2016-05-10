import React from 'react-native'
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
    fontSize: 30,
    fontSize: Metrics.fonts.regular,
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
    fontFamily: Fonts.bold,
    padding: Metrics.baseMargin
  },
  navButtonLeft: {
    marginLeft: 15,
    justifyContent: 'center'
  },
  navigationBar: {
    backgroundColor: Colors.drawerColor
  },
  navButtonTextAndroid: {
    marginTop: 18,
    fontSize: 18
  },
  navButtonLeft: {
    margin: Metrics.baseMargin,
  },
  navButtonLeftAndroid: {
    marginTop: 18,
    marginLeft: 16
  },
})

export default NavigationStyle
