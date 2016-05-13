import {Colors, Metrics} from '../../Themes'
import React, { 
  StyleSheet, 
} from 'react-native'

export default StyleSheet.create({
    containerModal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.snow
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center'
  },
  container:{
    height:Metrics.screenHeight,
    width:Metrics.screenWidth
  },
  backgroundFixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#F67C01'
  },
  sliders: {
    position: 'absolute',
    width: Metrics.screenWidth,
    bottom: 70,
    left: 0
  },
  slide: {
    flex: 1,
    height: Metrics.screenHeight -125,
    alignItems: 'center',
    paddingBottom:50
  },
  slideText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    margin: 16
  },
  slideTextTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 50
  },
  logo: {
    alignItems: 'center',
    position: 'absolute',
    width: Metrics.screenWidth,
    marginTop: 30,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 35,
    fontWeight: '700',
    backgroundColor: 'transparent',
  },
  logoIconContainer: {
    backgroundColor: 'transparent',
    paddingRight: 5,
    marginTop: 10,
    marginBottom: 5
  },
  logoTextContainer: {
    backgroundColor: 'transparent'
  },
  btnContainer: {
    position: 'absolute',
	width: Metrics.screenWidth,
    bottom: 0,
    left: 0,
    height: 40
  },
  btn: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
    fontSize:14
  },
  pickerContainer: {
    marginTop: 16,
    width: Metrics.screenWidth * 2 / 3,
    backgroundColor: Colors.snow,
    padding: 4,
    paddingLeft: 8,
    flexDirection: 'row'
  },
  dropDownIcon: {
    position: 'absolute',
    right: 8  
  },
  modalButton: {
    marginTop: 10
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6'
  },
  text: {
    flex: 1
  },
  checkboxRow: {
    marginTop: 1,
    width: Metrics.screenWidth * 2 / 3,
    backgroundColor: Colors.snow,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkboxText:{
    color: '#000',
    textAlign: 'center',
    fontSize: 14,
  }, 
  checkbox: {

  }
})