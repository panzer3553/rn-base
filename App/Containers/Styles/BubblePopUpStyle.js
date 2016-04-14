import { StyleSheet } from 'react-native'
import {Colors, Metrics} from '../../Themes'
import React from 'react-native'


const { width, height } = React.Dimensions.get('window')

const marginLeft = 30;

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center'
  },

  bubbleContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row'
  },
  squareContainer: {
    flex:3,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 10
  },
  triangleRight: {
    flex: 1,
    flexDirection: 'row',
    transform: [
      {rotate: '90deg'}
    ]
  },
  triangleLeft: {
    transform: [
      {rotate: '-90deg'}
    ]
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  listViewContainer: {
    flex: 1,
    flexDirection:'column'
  },
  closeButton: {
    flex: 6,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(26, 180, 232, 0.2)',
  },

})