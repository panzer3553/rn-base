import React from 'react'
import { TouchableOpacity, Text,View, StyleSheet, Alert, ToastAndroid, PropTypes } from 'react-native'
import formStyles from './Styles/FieldStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors, Metrics } from '../Themes'
import _ from 'lodash'
import DialogAndroid from 'react-native-dialogs'

export default class PickerField extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      value : props.value,
      keys: props.options,
      options: Object.values(props.options),
      title: props.title
    }
    this.openDialog = this.openDialog.bind(this)
  }

  makeOptions () {
    return {
      title: this.state.title,
      "items": this.state.options,
      itemsCallback: (id, text) => this.onHandeChange(text)
    }
  }

  onHandeChange (text) {
    let value = _.invert(this.props.options)[text]
    this.setState({value: value})
    if(this.props.onValueChange)
      this.props.onValueChange(value)
  }

  openDialog () {
    var dialog = new DialogAndroid();
    dialog.set(this.makeOptions());
    dialog.show();
   }

  render () {
    return (
      <TouchableOpacity style={[formStyles.fieldContainer, formStyles.horizontalContainer]} onPress={() => this.openDialog()}>
        <Icon name={this.props.icon} size={24} color={Colors.drawerColor} style={formStyles.alignLeft}/>
        <Text style={formStyles.fieldText}>{this.props.placeholder}</Text>
        <View style={[formStyles.alignRight, formStyles.horizontalContainer]}>
          <Text style={formStyles.fieldValue}>{this.state.value ? this.props.options[this.state.value] : ""}</Text>
        </View>
        <Icon name="angle-right" size={24} color={Colors.drawerColor} style={formStyles.alignRight}/>
      </TouchableOpacity>
    )
  }
}
