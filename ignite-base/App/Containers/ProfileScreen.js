// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import { View, ScrollView, Text, TextInput, PropTypes } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/AllComponentsScreenStyle'
import InputField from '../Components/InputField'
import PickerField from '../Components/PickerField'
import DateField from '../Components/DateField'
import Separator from '../Components/Separator'
import Icon from 'react-native-vector-icons/FontAwesome'
// Components to show examples (only real point of merge conflict)
// I18n
import I18n from '../I18n/I18n.js'

export default class ProfileScreen extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {date: null}
  }

  render () {
    console.log(this.state)
    return (
      <ScrollView style={[styles.screenContainer, {backgroundColor: '#C8C7CC'}]}>
        <Separator label="Basic"/>
        <InputField icon="ios-person" placeholder="First Name"/>
        <InputField icon="ios-person-outline" placeholder="Last Name"/>
        <DateField placeholder="Date of birth" icon="birthday-cake"/>
        <PickerField placeholder="Gender" icon="intersex" 
          options={{
            male: 'Male',
            female: 'Female'
          }} 
          value="male"/>
        <Separator label="Contact"/>
        <InputField icon="ios-email-outline" placeholder="Email"/>
        <InputField icon="ios-telephone-outline" placeholder="Mobile"/>
        <Separator label="Address"/>
        <InputField icon="ios-home-outline" placeholder="Add a new address"/>
        <PickerField placeholder="City" icon="map-marker"/>
      </ScrollView>
    )
  }
}

export default connect()(ProfileScreen)
