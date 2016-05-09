import {StyleSheet} from 'react-native'
import { Fonts, Metrics, Colors } from '../../Themes/'

const NavigationStyle = StyleSheet.create({
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
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.base,
    alignSelf: 'center'
  },
  navButtonText: {
    color: Colors.snow,
    marginTop: 8,
    marginLeft: 8,
    fontFamily: Fonts.bold,
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
    marginTop: 18,
    marginLeft: 16
  },
  navigationBar: {
    backgroundColor: Colors.ocean
  }
})

export default NavigationStyle
