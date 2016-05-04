import React, { View, ScrollView, Text, TouchableOpacity, PropTypes, StyleSheet, Alert, AsyncStorage} from 'react-native'
import { Form, InputField, Separator, SwitchField, LinkField ,PickerField, DatePickerField, KeyboardAwareScrollView} from 'react-native-form-generator';
import { connect } from 'react-redux'
import formStyles from './Styles/ProfileStyle.js'
import ProgressiveImage from '../Components/ProgressiveImage'
import { Colors, Images, Metrics } from '../Themes'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
// external libs
import Icon from 'react-native-vector-icons/Ionicons'
import Animatable from 'react-native-animatable'
// I18n
import I18n from '../I18n/I18n.js'
import Styles from './Styles/LoginScreenStyle'
const STORAGE_KEY_PROFILE = "PROFILE_ID"

export default class ProfileScreen extends React.Component {

    constructor (props) {
    super(props)
    this.state = {
      profile: {
        firstName: null,
        lastName: null,
        birthday: null,
        gender: null,
        email: null,
        mobile: null,
        groups: null,
        address: null
      },
      saved: false
    }
  }

    static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
  };
  
  componentWillMount () {
    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
    }
    this.props.navigator.state.tapSaveButton = this.tapSaveButton.bind(this)
    if(this.props.profileData.saved){
      this.state.profile = this.props.profileData.profile
      this.state.saved = this.props.profileData.saved
    }
  }

   handleFormFocus(event, reactNode){
   this.refs.scroll.scrollToFocusedInput(event, reactNode)
  }

  tapSaveButton(){
    Alert.alert("Saved")
    const { dispatch } = this.props
    AsyncStorage.getItem(STORAGE_KEY_PROFILE).then((value) => {
      if (value !== null){
        dispatch(Actions.saveProfile(this.state.profile, value))
      } else {
        dispatch(Actions.saveProfile(this.state.profile))
      }
    })
  }

  handleFormChange(formData){
    //formData will be a json object that will contain
    // refs of every field
    //formData.first_name
    //formData.last_name
    this.setState({profile: formData})
  }

  render(){
      const {firstName, lastName, birthday, gender, email, mobile, groups, address} = this.state.profile
      return(
      <KeyboardAwareScrollView ref='scroll'>
        <Form
          style={formStyles.form}
          ref='registrationForm'
          onFocus={this.handleFormFocus.bind(this)}
          onChange={this.handleFormChange.bind(this)}
          label="Personal Information">
          <Separator label='BASIC'/>
          <InputField ref='firstName' placeholder='First Name' value={firstName}
          iconLeft={
          <Icon name='ios-person'
            size={Metrics.icons.x_small}
            style={[formStyles.alignLeft, {color: Colors.formTextColor}]}/>}
          />
          <InputField ref='lastName' placeholder='Last Name' value={lastName}
          iconLeft={
          <Icon name='ios-person-outline'
            size={Metrics.icons.x_small}
            style={[formStyles.alignLeft, {color: Colors.formTextColor}]}/>}
            />
          <DatePickerField ref='birthday' date={birthday}
            minimumDate={new Date('1/1/1900')}
            maximumDate={new Date()} mode='date' placeholder='Birthday' 
            iconRight={
          <Icon name='ios-arrow-right'
            size={Metrics.icons.x_small}
            style={[formStyles.alignRight, {color: Colors.formTextColor}]}/> }
          />
          <PickerField ref='gender' placeholder='Gender' value={gender}
            options={{
              male: 'Male',
              female: 'Female'
            }}
          iconRight={
          <Icon name='ios-arrow-right'
            size={Metrics.icons.x_small}
            style={[formStyles.alignRight, {color: Colors.formTextColor}]}/> }
            />
            <PickerField ref='groups' placeholder='User Groups' value={groups}
            options={{
              policeStation: 'Police Station',
              fireStation: 'Fire Station',
              ambulance: 'Ambulance',
              medicalUser: 'Medical User',
              militarianUser: 'Militarian User',
              volunteer: 'Volunteer',
              other: 'Other'
            }}
          iconRight={
          <Icon name='ios-arrow-right'
            size={Metrics.icons.x_small}
            style={[formStyles.alignRight, {color: Colors.formTextColor}]}/> }
            />
          <Separator label='CONTACT'/>
          <InputField ref='email' placeholder='Email' keyboardType="email-address" value={email}
          iconLeft={
          <Icon name='ios-email-outline'
            size={Metrics.icons.x_small}
            style={[formStyles.alignLeft, {color: Colors.formTextColor}]}/>}   
          />
          <InputField ref='mobile' placeholder='Mobile' keyboardType="phone-pad" value={mobile}
          iconLeft={
          <Icon name='ios-telephone-outline'
            size={Metrics.icons.x_small}
            style={[formStyles.alignLeft, , {color: Colors.formTextColor}]}/>}   
          />
          <Separator label='ADDRESS'/>
          <InputField ref='address' placeholder='Add new address' value={address}
          iconLeft={
          <Icon name='ios-home-outline'
            size={Metrics.icons.x_small}
            style={[formStyles.alignLeft, {color: Colors.formTextColor}]}/>}
          />
        </Form>
      </KeyboardAwareScrollView>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    profileData: state.profileData
  }
}

export default connect(mapStateToProps)(ProfileScreen)

