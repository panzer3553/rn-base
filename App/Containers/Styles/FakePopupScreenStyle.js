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
    backgroundColor: 'transparent',
    borderTopColor: 'white',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent'
  },
  container: {
    flex: 2,
    flexDirection: 'row',
  	position: 'absolute',
  	left: 0,
  	top: 0,
  	width: width,
  	height: height,
  	backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center'
  },
  title: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    position: 'absolute', 
    alignItems: 'center',
  },
  footerContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection:'row',
    backgroundColor: 'white',
    borderRadius: 10,

  },
  rowContainer: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: 'white',
  },
  rowIcon: {
    flex: 3,
    alignItems: 'center',
  },
  rowText: {
    flex: 6,
  },
  listContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection:'column'
  },
  button: {
    flex: 6,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 10,
  },
  triangleRight: {
    transform: [
      {rotate: '90deg'}
    ]
  },
  triangleLeft: {
    transform: [
      {rotate: '-90deg'}
    ]
  },

})