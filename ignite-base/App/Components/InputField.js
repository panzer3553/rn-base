import React from 'react'
import { TouchableOpacity, Text,View, StyleSheet, PropTypes, TextInput } from 'react-native'
import formStyles from './Styles/PickerFieldStyle'
import Icon from 'react-native-vector-icons/Ionicons'

export default class PickerField extends React.Component {

  render () {
    return (
        <View style={formStyles.inputContainer}>
        <Icon name={this.props.icon} size={30} color="#4F8EF7" style={formStyles.iconTextInput}/>
        <TextInput placeholder={this.props.placeholder} underlineColorAndroid="white" placeholderTextColor='#C8C7CC'
         style={formStyles.textInput}/>
        </View>
    )
  }
}