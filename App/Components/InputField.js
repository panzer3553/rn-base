import React from 'react'
import { TouchableOpacity, Text,View, StyleSheet, PropTypes, TextInput } from 'react-native'
import formStyles from './Styles/FieldStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, Metrics } from '../Themes'

export default class PickerField extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      value: props.value
    }
    this._onChangeText = this._onChangeText.bind(this)
  }

  _onChangeText(event){
  	let value = event.nativeEvent.text
  	this.setState({value: value})
  	if(this.props.onValueChange)
  	  this.props.onValueChange(value)
  }

  render () {
    return (
      <View style={formStyles.inputContainer}>
        <Icon name={this.props.icon} size={30} color={Colors.drawerColor} style={formStyles.iconTextInput}/>
        <TextInput placeholder={this.props.placeholder} underlineColorAndroid="white" placeholderTextColor='#C8C7CC'
         style={formStyles.textInput} value={this.state.value} onChange={this._onChangeText}/>
      </View>
    )
  }
}