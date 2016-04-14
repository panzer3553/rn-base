import { StyleSheet } from 'react-native'
import {Colors, Metrics} from '../../Themes'
import React from 'react-native'

const { width, height } = React.Dimensions.get('window')

export default StyleSheet.create({

  icon_background_circle: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems:'center',
    justifyContent: 'center',
  },

})
