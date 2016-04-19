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
  },

  bubbleContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
  },
  squareContainer: {
    position: 'relative',
    flex:3,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 10
  },
  triangleContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  triangleRight: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'column',
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
    position: 'relative',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.panther,
  },
  headerText: {
    textAlign: 'center',
    color: Colors.silver
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
  closeButtonWraper: {
    flex: 1,
  },
  closeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(77, 148, 255, 0.8)',
    backgroundColor: 'rgba(128, 179, 255, 0.5)',
    padding: 6,
    borderRadius: 10,
  },
  closeText: {
    textAlign: 'center',
    color: Colors.silver
  },

})