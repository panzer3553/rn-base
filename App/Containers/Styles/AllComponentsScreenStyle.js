import { StyleSheet } from 'react-native'
import { Colors, Metrics, Base } from '../../Themes/'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  loginBox: {
    padding: 20
  },
  loginButton: {
    borderWidth: 1,
    borderColor: Colors.charcoal,
    backgroundColor: Colors.panther,
    padding: 6
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver
  },
  
  componentLabel: {
    ...Base.darkLabel,
    marginBottom: 5
  },
  groupContainer: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  infoIconContainer: {
    width: Metrics.icons.medium,
    height: Metrics.icons.medium,
    top: 10,
    left: Metrics.screenWidth - 80
  },
  icons_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    width: Metrics.screenWidth,
    left: 0,
    bottom: 30,
    backgroundColor: 'transparent',
  },
})
