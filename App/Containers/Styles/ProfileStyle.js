import { StyleSheet } from 'react-native'
import {Colors, Metrics} from '../../Themes'

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

    form: {
      marginTop: 40,
      backgroundColor: "white",
      padding: 8
    },

    form_div_1: {
      backgroundColor: "white",
      padding: 8
    },

    checkboxRow: {
      marginTop: 1,
      width: Metrics.screenWidth * 2 / 3,
      backgroundColor: Colors.snow,
      paddingLeft: 8,
      flexDirection: "row",
      alignItems:"center",
    },

    checkboxText:{
      color: "#000",
      textAlign:"center",
      fontSize:14,
    }, 

    checkbox: {

    },

    pickerContainer: {
      backgroundColor: Colors.snow,
      paddingLeft: 8,
      paddingBottom: 8,
      flexDirection: "row",
      borderBottomColor:"#999",
      borderBottomWidth: 1,
      //alignItems: 'center',
    },

    dropDownIcon: {
      position: 'absolute',
      right: 8,  
      marginTop: 8,
    },

    label: {
      fontSize: 16,
      marginTop: 8,
      marginLeft: 12,
    }
})
