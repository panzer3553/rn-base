import React from 'react'
import { TouchableOpacity, Text,View, StyleSheet, DatePickerAndroid, PropTypes } from 'react-native'
import formStyles from './Styles/PickerFieldStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

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
        let str = date.toLocaleDateString()
        this.setState({value: str})
        if(this.props.onChange){
          this.props.onChnage(date)
        }
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  render () {
    return (
      <TouchableOpacity style={[formStyles.fieldContainer, formStyles.horizontalContainer]} onPress={this.showPicker.bind(this)}>
        <Icon name={this.props.icon} size={20} color="#4F8EF7" style={[formStyles.alignLeft, {marginTop: 9}]}/>
        <Text style={formStyles.fieldText}>{this.props.placeholder}</Text>
        <View style={[formStyles.alignRight, formStyles.horizontalContainer]}>
          <Text style={formStyles.fieldValue}>{this.state.value || ""}</Text>
        </View>
        <Icon name="angle-right" size={24} color="#4F8EF7" style={formStyles.alignRight}/>
      </TouchableOpacity>
    )
  }
}