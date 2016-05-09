import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  horizontalContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  fieldContainer:{
    borderBottomWidth: 1,
    borderBottomColor: '#C8C7CC',
    backgroundColor: 'white',
    alignItems: 'center',
    height: 45
  },
  fieldValue:{
    fontSize: 34/2,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight:10,
    color: '#C7C7CC'
  },
  fieldText:{
    fontSize: 34/2,
    marginLeft: 45,
    paddingLeft: 10,
    paddingRight: 10,
    lineHeight: 32,
    marginTop: 6
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#C8C7CC',
    backgroundColor: 'white',
    height: 45,
    backgroundColor: 'white'
  },
  alignLeft:{
    marginTop: 7,
    position:'absolute',
    left: 10
  },  alignRight:{
    marginTop: 7, 
    position:'absolute', 
    right: 10
  },
  iconTextInput:{
    marginTop: 8, 
    position:'absolute', 
    left: 10
  },
  textInput:{
    height: 48, 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginLeft: 40, 
    fontSize: 17
  },
  separatorContainer:{
    paddingTop: 35,
    borderBottomColor: '#C8C7CC',
    borderBottomWidth: 1,
  },
  separator:{
    marginLeft: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#6D6D72',
    paddingBottom: 7
  }
})
