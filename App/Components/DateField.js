import React from 'react'
import { TouchableOpacity, Text,View, StyleSheet, DatePickerAndroid, PropTypes } from 'react-native'
import formStyles from './Styles/FieldStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors, Metrics } from '../Themes'
export default class DateField extends React.Component {

  constructor(props){
    super(props)
    this.state = {value: props.value}
  }

  async showPicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        let date = new Date(year, month, day)
        this.setState({value: date.toString()})
        if(this.props.onValueChange){
          this.props.onValueChange(date)
        }
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  render () {
    return (
      <TouchableOpacity style={[formStyles.fieldContainer, formStyles.horizontalContainer]} onPress={this.showPicker.bind(this)}>
        <Icon name={this.props.icon} size={20} color={Colors.drawerColor} style={[formStyles.alignLeft, {marginTop: 9}]}/>
        <Text style={formStyles.fieldText}>{this.props.placeholder}</Text>
        <View style={[formStyles.alignRight, formStyles.horizontalContainer]}>
          <Text style={formStyles.fieldValue}>{this.state.value ? new Date(this.state.value).toLocaleDateString() : ""}</Text>
        </View>
        <Icon name="angle-right" size={24} color={Colors.drawerColor} style={formStyles.alignRight}/>
      </TouchableOpacity>
    )
  }
}