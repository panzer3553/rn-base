import { StyleSheet } from 'react-native'
import {Colors, Metrics} from '../../Themes'
import React from 'react-native'


const { width, height } = React.Dimensions.get('window')

const marginLeft = 30;

export default StyleSheet.create({
  talkBubble: {
    position: 'absolute',
    left: marginLeft,
    top: width / 2,
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
    left: marginLeft,
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
  container: {
  	position: 'absolute',
  	left: 0,
  	top: 0,
  	width: width,
  	height: height,
  	backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  rowIcon: {
    width: Metrics.icons.medium,
    height: Metrics.icons.medium,
    color: 'white',
  },
  title: {
    width: width/2 - 20,
    top: width / 2,
    color: 'blue',

  },
  rowText: {
    textAlign: 'center'
  },
  rowContainer: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: 'blue'
  },
  listContainer: {
    position: 'absolute',
    left: marginLeft + 15,
    top: width / 2,
    width: width/2 - 20,
    flex: 1,
    flexDirection:'column'
  },

})