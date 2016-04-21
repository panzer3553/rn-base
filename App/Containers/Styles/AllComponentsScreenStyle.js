import { StyleSheet } from 'react-native'
import { Colors, Metrics, Base } from '../../Themes/'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  infoIconContainer: {
    top: 10,
    left: Metrics.screenWidth - 80
  },
  icons_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    width: Metrics.screenWidth,
    height: 100,
    left: 0,
    bottom: 30,
    backgroundColor: 'transparent',
  },
})
