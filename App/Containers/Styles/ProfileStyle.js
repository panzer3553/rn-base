import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  alignRight:{
    marginTop: 9, 
    position:'absolute', 
    right: 1
  },
  alignLeft:{
    marginTop: 8, 
    marginRight: 4, 
    marginLeft: 8
  },
  alignLeft1:{
    marginTop: 4, 
    marginRight: 4, 
    marginLeft: 8
  },
  form: {
    backgroundColor: "white",
    padding: 8
  },
  form_div_1: {
    backgroundColor: "white",
    borderBottomColor: "white",
    borderBottomWidth: 0.5
  },
  checkboxRow: {
    marginTop: 1,
    backgroundColor: Colors.snow,
    paddingLeft: 8,
    flexDirection: "row",
    alignItems:"center"
  },
  checkboxText:{
    color: "#000",
    textAlign:"center",
    fontSize:14
  }, 
  checkbox: {
    // add for customizing later
  },
  pickerContainer: {
    backgroundColor: Colors.snow,
    paddingLeft: 8,
    paddingBottom: 8,
    flexDirection: "row",
    borderBottomColor:"#999",
    borderBottomWidth: 1
  },
  dropDownIcon: {
    position: 'absolute',
    right: 8,  
    marginTop: 4
  },
  label: {
    fontSize: 16,
    marginTop: 4,
    marginLeft: 12
  }
})
