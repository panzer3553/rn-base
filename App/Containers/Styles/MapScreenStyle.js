import { StyleSheet } from 'react-native'
import {Colors, Metrics} from '../../Themes'
import React from 'react-native'

const { width, height } = React.Dimensions.get('window')

export default StyleSheet.create({
	map: {  // Google Map
    height: height - Metrics.navBarHeight,
    width: width,
    margin: 1,
    borderColor: '#000000',
  },

  icon_background_circle: {
    backgroundColor: 'white',
    borderRadius: 60/2,
    width: 60,
    height: 60,
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'center'
  },

  fire_circle: {
    width: 60,
    height: 60,
    borderRadius: 60/2,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'transparent',
  },

  ambulance_circle: {
    width: 60,
    height: 60,
    borderRadius: 60/2,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'transparent',
  },

  police_circle: {
    width: 60,
    height: 60,
    borderRadius: 60/2,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'transparent',
  },

  icons_container: {

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    width: width,
    left: 0,
    bottom: 30,
    backgroundColor: 'transparent',
  },

  talkBubble: {
    position: 'absolute',
    left: 30,
    top: 26 + Metrics.navBarHeight,
    backgroundColor: 'transparent'
  },
  
  talkBubbleSquare: {
    width: width / 2,
    height: width / 2,
    backgroundColor: 'white',
    borderRadius: 10
  },

  talkBubbleTriangle: {
    position: 'absolute',
    left: 30,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderLeftWidth: 13,
    borderRightWidth: 13,
    borderTopWidth: 26,
    borderTopColor: 'white',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent'
  },


})