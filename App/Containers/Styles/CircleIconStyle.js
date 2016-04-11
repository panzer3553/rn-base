import { StyleSheet } from 'react-native'
import {Colors, Metrics} from '../../Themes'
import React from 'react-native'

const { width, height } = React.Dimensions.get('window')

export default StyleSheet.create({

  icon_background_circle: {
    backgroundColor: 'white',
    borderRadius: 60/2,
    width: 60,
    height: 60,
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'center'
  },

  icon_circle: {
	width: 60,
	height: 60,
	borderRadius: 60/2,
	borderWidth: 1,
	borderColor: '#000000',
	backgroundColor: 'transparent', 
    alignItems:'center', 
    justifyContent:'center',
    paddingTop: 60/4,
    paddingLeft: 60/4
  },

})
