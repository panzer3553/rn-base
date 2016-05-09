import {Colors, Metrics} from '../../Themes'
import React, { 
  StyleSheet, 
} from 'react-native'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: Colors.windowTint
  },
  bubbleContainer: {
    backgroundColor: Colors.transparent,
    flex: 1,
    flexDirection: 'row'
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
  },
  triangleRight: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'column',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [
      {rotate: '90deg'}
    ]
  },
  headerContainer: {
    position: 'relative',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.panther
  },
  headerText: {
    textAlign: 'center',
    color: Colors.silver,
    fontSize: Metrics.fonts.large
  },
  footerContainer: {
    flex: 1,
    backgroundColor: Colors.transparent,
    borderRadius: 10
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
    borderRadius: 10
  },
  closeText: {
    textAlign: 'center',
    color: Colors.silver
  },
    separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  title: {
    fontSize: Metrics.fonts.medium,
    fontWeight: 'bold',
    color: '#48BBEC',
    alignItems: 'center' 
  },
  description: {
    fontSize: Metrics.fonts.small,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center' ,
    borderRadius: 10
  },
  icon: {
    width: Metrics.icons.small,
    height: Metrics.icons.small,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  }
})