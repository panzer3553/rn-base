import React from 'react'
import { TouchableOpacity, Text,View, StyleSheet, Alert, ToastAndroid, PropTypes } from 'react-native'
import formStyles from './Styles/PickerFieldStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import DialogAndroid from 'react-native-dialogs'
const options = { 
  "gender":{
    "items": [
    "Twitter",
    "Google+",
    "Instagram",
    "Facebook"
  ],
  "title": "Social Networks",
  itemsCallbackSingleChoice: (id, text) => ToastAndroid.show(id + ": " + text, ToastAndroid.SHORT)
  },
}
export default class PickerField extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      value : props.value
    }
    this.showDialog = this.showDialog.bind(this)
  }

  showDialog () {
  var dialog = new DialogAndroid()
  dialog.set(options.gender)
  dialog.show()
  }

  render () {
    return (
      <View>
      <TouchableOpacity style={[formStyles.fieldContainer, formStyles.horizontalContainer]}>
        <Icon name={this.props.icon} size={24} color="#4F8EF7" style={formStyles.alignLeft}/>
        <Text style={formStyles.fieldText}>{this.props.placeholder}</Text>
        <View style={[formStyles.alignRight, formStyles.horizontalContainer]}>
          <Text style={formStyles.fieldValue}>{this.state.value || ""}</Text>
        </View>
        <Icon name="angle-right" size={24} color="#4F8EF7" style={formStyles.alignRight}/>
      </TouchableOpacity>
      </View>
    )
  }
}
