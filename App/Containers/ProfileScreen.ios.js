import React, { View, ScrollView, Text, TouchableOpacity, PropTypes, StyleSheet, Alert, AsyncStorage} from 'react-native'
import { Form, InputField, Separator, SwitchField, LinkField ,PickerField, DatePickerField, KeyboardAwareScrollView} from 'react-native-form-generator'
import { connect } from 'react-redux'
import FormCityPicker from '../Components/FormCityPicker'
import formStyles from './Styles/ProfileStyle.js'
import { Colors, Images, Metrics } from '../Themes'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
// external libs
import Icon from 'react-native-vector-icons/Ionicons'
import Animatable from 'react-native-animatable'
// I18n
import I18n from '../I18n/I18n.js'
import Styles from './Styles/LoginScreenStyle'
import {MKCheckbox, MKColor} from 'react-native-material-kit' 
const STORAGE_KEY_PROFILE = "PROFILE_ID"

export default class ProfileScreen extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  }

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
        groups: [],
        address: null,
      },
      city: null,
      countryCode: null,
      saved: false,
      editUserGroup: false,
    }
  }
  
  componentWillMount () {
    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
    }
    this.props.navigator.state.tapSaveButton = this.tapSaveButton.bind(this)
    if(this.props.profileData.saved){
      this.state.profile = this.props.profileData.profile
      this.state.saved = this.props.profileData.saved
      this.state.city = this.props.profileData.profile.city
    }
  }

   handleFormFocus (event, reactNode) {
   this.refs.scroll.scrollToFocusedInput(event, reactNode)
  }

  tapSaveButton(){
    Alert.alert("Saved")
    const { dispatch } = this.props
    AsyncStorage.getItem(STORAGE_KEY_PROFILE).then((value) => {
      if (value !== null)
        dispatch(Actions.saveProfile({...this.state.profile, city: this.state.city, country: this.state.countryCode}, value))
      else 
        dispatch(Actions.saveProfile({...this.state.profile, city: this.state.city, country: this.state.countryCode}))
    })
  }

  handleFormChange (formData) {
    //formData will be a json object that will contain
    // refs of every field
    //formData.first_name
    //formData.last_name
    this.setState({profile: formData})
  }

  handleEditUserGroup () {
    this.setState({
      editUserGroup: !this.state.editUserGroup,
    })
  }

  onCheckedItem (item) {
    const {firstName, lastName, birthday, gender, email, mobile, groups, address} = this.state.profile
    let i = this.indexOfGroupId(groups, item.groupId)

    if (i > -1) {
      this.setState({
        profile: {
          firstName: null,
          lastName: null,
          birthday: null,
          gender: null,
          email: null,
          mobile: null,
          groups: [...groups.filter((_, idx) => idx !== i)],
          address: null
        }
      })
    }
    else {
      this.setState({
        profile: {
          firstName: null,
          lastName: null,
          birthday: null,
          gender: null,
          email: null,
          mobile: null,
          groups: [...groups, item.groupId],
          address: null
        }
      })
    }
  }

  indexOfGroupId (groups, groupId) {
    for (let i = 0; i < groups.length; i++) {
      if (groups[i] == groupId) {
          return i
      }
    }    
    return -1
  }

  isAvailbleInGroup (groups, groupId) {
    let index = this.indexOfGroupId(groups, groupId)
    if(index > -1) {
      return true
    }
    return false
  }

  render () {
    const {firstName, lastName, birthday, gender, email, mobile, groups, address} = this.state.profile
    const {city} = this.state
    const groupData = [
      { label: 'Police station', groupId: 'policeStation' },
      { label: 'Fire station', groupId: 'fireStation' },
      { label: 'Ambulance', groupId: 'ambulance' },
      { label: 'Medical User', groupId: 'medicalUser' },
      { label: 'Militarian User', groupId: 'militarianUser' },
      { label: 'Volunteer', groupId: 'volunteer' },
      { label: 'Normal', groupId: 'Normal' }
    ]
    const renderUserGroupView = !this.state.editUserGroup ? null : (
        <View>
          { groupData.map((item, i) =>
             <TouchableOpacity key ={i} onPress={() => this.onCheckedItem(item)}>
                <View style={formStyles.checkboxRow}>
                  <MKCheckbox 
                    checked={this.isAvailbleInGroup(groups, item.groupId)} 
                    style={formStyles.checkbox}
                    onCheckedChange={(event) => this.onCheckedItem(item)}
                  />
                  <Text numberOfLines={1} style={formStyles.checkboxText}>{item.label}</Text>
                </View>
             </TouchableOpacity>)
          }
        </View>
    )

    return(
      <KeyboardAwareScrollView ref='scroll'>
        <Form
          style={formStyles.form}
          ref='registrationForm'
          onFocus={this.handleFormFocus.bind(this)}
          onChange={this.handleFormChange.bind(this)}
          label="Personal Information">
          <Separator label='BASIC'/>
          <InputField ref='firstName' placeholder='First Name' autoCorrect={false} value={firstName}
          iconLeft={
          <Icon name='ios-person'
            size={Metrics.icons.x_small}
            style={[formStyles.alignLeft, {color: Colors.formTextColor}]}/>}
          />
          <InputField ref='lastName' placeholder='Last Name' autoCorrect={false} value={lastName}
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
        </Form>
        <View>
          <TouchableOpacity 
            style={formStyles.form_div_1}
            onPress={()=> this.handleEditUserGroup()}
          >
            <View style={formStyles.pickerContainer}>
               <Icon name='ios-people-outline'
                size={Metrics.icons.x_small}
                style={[formStyles.alignLeft1, {color: Colors.formTextColor}]}
              />
              <Text style={formStyles.label}>Choose User Groups</Text>
              <Icon 
                  name="ios-arrow-right" 
                  size={Metrics.icons.x_small} 
                  color="black" style={[formStyles.dropDownIcon, {color: Colors.formTextColor}]}>
              </Icon>
            </View>
          </TouchableOpacity>
          {renderUserGroupView}
        </View>
        <Form
            style={formStyles.form_div_1}
            ref='registrationForm'
            onFocus={this.handleFormFocus.bind(this)}
            onChange={this.handleFormChange.bind(this)}
            label='CONTACT'>
          <InputField ref='email' placeholder='Email' keyboardType="email-address" autoCapitalize="none" value={email}
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
        <FormCityPicker value={city} onChange={(value) => this.setState({city: value.name, countryCode: value.country})}/>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profileData: state.profileData,
  }
}

export default connect(mapStateToProps)(ProfileScreen)

