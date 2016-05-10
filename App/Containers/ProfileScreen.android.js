// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import { View, ScrollView, Text, TextInput, PropTypes, Alert, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/AllComponentsScreenStyle'
import InputField from '../Components/InputField'
import PickerField from '../Components/PickerField'
import DateField from '../Components/DateField'
import Separator from '../Components/Separator'
import FormCityPicker from '../Components/FormCityPicker'
import Icon from 'react-native-vector-icons/FontAwesome'
// Components to show examples (only real point of merge conflict)
// I18n
import I18n from '../I18n/I18n.js'
const STORAGE_KEY_PROFILE = "PROFILE_ID"
import Actions from '../Actions/Creators'

export default class ProfileScreen extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      firstName: null,
      lastName: null,
      birthday: null,
      gender: null,
      email: null,      
      mobile: null,
      groups: null,
      address: null,
      city: null,
      country: null
    }
  }

    componentWillMount () {
    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
    }
    this.props.navigator.state.tapSaveButton = this.tapSaveButton.bind(this)
  }

  tapSaveButton(){
    Alert.alert("Saved")
    const { dispatch } = this.props
    AsyncStorage.getItem(STORAGE_KEY_PROFILE).then((value) => {
      if (value !== null)
        dispatch(Actions.saveProfile(this.state, value))
      else 
        dispatch(Actions.saveProfile(this.state.profile))
     }
    )
  }

  render () {
    return (
      <ScrollView style={[styles.screenContainer, {backgroundColor: '#FAFAFA'}]}>
        <Separator label="Basic"/>
        <InputField icon="ios-person" placeholder="First Name" onValueChange={(value) => this.setState({firstName: value})}/>
        <InputField icon="ios-person-outline" placeholder="Last Name" onValueChange={(value) => this.setState({lastName: value})}/>
        <DateField placeholder="Date of birth" icon="birthday-cake" onValueChange={(value) => this.setState({date: value})}/>
        <PickerField placeholder="Gender" icon="intersex" 
          options={{
            male: 'Male',
            female: 'Female'
          }}
          title='Select a gender'
          onValueChange={(value) => this.setState({gender: value})}/>
        <PickerField placeholder="User groups" icon="users" 
          options={{
              policeStation: 'Police Station',
              fireStation: 'Fire Station',
              ambulance: 'Ambulance',
              medicalUser: 'Medical User',
              militarianUser: 'Militarian User',
              volunteer: 'Volunteer',
              other: 'Other'
          }}
          title='Select a user groups'
          onValueChange={(value) => this.setState({groups: value})}
        />
        <Separator label="Contact"/>
        <InputField icon="ios-email-outline" placeholder="Email" onValueChange={(value) => this.setState({email: value})}/>
        <InputField icon="ios-telephone-outline" placeholder="Mobile" onValueChange={(value) => this.setState({mobile: value})}/>
        <Separator label="Address"/>
        <InputField icon="ios-home-outline" placeholder="Add a new address" onValueChange={(value) => this.setState({address: value})}/>
        <FormCityPicker onChange={(value)=> this.setState({city: value.name, country: value.country})}/>
        <Separator/>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profileData: state.profileData,
  }
}
export default connect(mapStateToProps)(ProfileScreen)
