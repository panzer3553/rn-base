import { StyleSheet } from 'react-native'
import { Colors, Metrics, Base } from '../../Themes/'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  infoIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  extremeIconContainer: {
    position: 'absolute',
    top: 80,
    right: 10
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
  fab: {
    width:Metrics.button.large, 
    height: Metrics.button.large, 
    borderRadius: Metrics.button.large/2, 
    backgroundColor: Colors.snow
  },
  small_fab: {
   width:Metrics.button.medium, 
   height: Metrics.button.medium, 
   borderRadius: Metrics.button.medium/2, 
   backgroundColor: Colors.snow
  }
})
