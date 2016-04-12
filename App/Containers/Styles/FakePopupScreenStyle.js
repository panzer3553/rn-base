import { StyleSheet } from 'react-native'
import {Colors, Metrics} from '../../Themes'
import React from 'react-native'


const { width, height } = React.Dimensions.get('window')

const marginLeft = 30;

export default StyleSheet.create({
  talkBubble: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  talkBubbleSquare: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10
  },
  talkBubbleTriangle: {
    position: 'absolute',
    backgroundColor: 'transparent',
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
    justifyContent: 'center'
  },
  title: {
    position: 'absolute',
    color: 'blue',
  },
  titleContainer: {
    position: 'absolute', 
  },
  rowContainer: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
rowIcon: {
    flex: 9,
    alignItems: 'center',
  },
  rowText: {
    flex: 4,
  },
  listContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection:'column'
  },

})