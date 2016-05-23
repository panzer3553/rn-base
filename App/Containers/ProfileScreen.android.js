// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, PropTypes, StyleSheet, Alert, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/ProfileStyle'
import InputField from '../Components/InputField'
import PickerField from '../Components/PickerField'
import DateField from '../Components/DateField'
import Separator from '../Components/Separator'
import FormCityPicker from '../Components/FormCityPicker'
import Icon from 'react-native-vector-icons/FontAwesome'
import config, { userGroupListData } from '../Config/AppSetting'
import CheckboxGroups from '../Components/CheckboxGroups'
import { Colors, Images, Metrics } from '../Themes'
import NavigationBar from '../Components/NavigationBar' 
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
      country: null,
      userGroups: []
    }
    this.tapSaveButton = this.tapSaveButton.bind(this)   
  }

    componentWillMount () {
    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
    }
    this.props.navigator.state.tapSaveButton = this.tapSaveButton.bind(this)
    if(this.props.profileData.saved){
      const {firstName, lastName, birthday, gender, email, mobile, groups, address, city, country, userGroups} = this.props.profileData.profile
      this.setState({
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        gender: gender,
        email: email,
        mobile: mobile,
        groups: groups,
        address: address,
        city: city,
        country: country,
        userGroups: userGroups
      })
    }
  }

  tapSaveButton () {
    Alert.alert("Saved")
    const { dispatch } = this.props
    const {firstName, lastName, birthday, gender, email, mobile, groups, address, userGroups, city, country} = this.state
    AsyncStorage.getItem(STORAGE_KEY_PROFILE).then((value) => {
      if (value !== null)
        dispatch(Actions.saveProfile({
          firstName: firstName, 
          lastName: lastName, 
          birthday: birthday, 
          gender: gender, 
          email: email, 
          mobile: mobile, 
          groups: groups, 
          adress: address, 
          userGroups: userGroups, 
          city: city, 
          country: country
        }, value))
      else 
        dispatch(Actions.saveProfile(this.state))
     }
    )
  }

  handleEditUserGroup () {
    this.setState({
      editUserGroup: !this.state.editUserGroup,
    })
  }

  onCheckedItem (value) {
    this.setState({
        userGroups: value,
    })
  }

  render () {
    const {firstName, lastName, birthday, gender, email, mobile, userGroups, address, city} = this.state
    const renderUserGroupView = !this.state.editUserGroup ? null : (
      <CheckboxGroups 
        items={userGroupListData}
        onSelect={(value) => this.onCheckedItem(value)}
        checked={userGroups}
        labelColor={'black'}
        iconColor={'blue'}
      />
    )
    const leftItem = {layout: 'icon', icon: 'android-menu', onPress: this.context.openDrawer}
    const rightItem = {layout: 'title', title: 'Save', onPress: this.tapSaveButton}
    return (
      <View style={{flex: 1}}>
        <NavigationBar
          title= {I18n.t('profile')}
          style={{backgroundColor: Colors.drawerColor}}
          leftItem={leftItem}
          rightItem={rightItem}
        />
        <ScrollView style={[styles.screenContainer, {backgroundColor: '#FAFAFA'}]}>
          <Separator label="Basic"/>
          <InputField icon="ios-person" placeholder="First Name" value={firstName} onValueChange={(value) => this.setState({firstName: value})}/>
          <InputField icon="ios-person-outline" placeholder="Last Name" value={lastName} onValueChange={(value) => this.setState({lastName: value})}/>
          <DateField placeholder="Date of birth" icon="birthday-cake" value={birthday} onValueChange={(value) => this.setState({birthday: value})}/>
          <PickerField placeholder="Gender" icon="intersex" 
            options={{
              male: 'Male',
              female: 'Female'
            }}
            title='Select a gender'
            value={gender}
            onValueChange={(value) => this.setState({gender: value})}/>
          <View> 
            <TouchableOpacity 
              style={styles.form_div}
              onPress={()=> this.handleEditUserGroup()}
            >
              <View style={styles.pickerContainer}>
                <Icon name='users'
                  size={Metrics.icons.x_small}
                  style={[styles.alignLeft, {color: Colors.formTextColor}]}
                />
                <Text style={styles.label}>Choose User Groups</Text>
                <Icon 
                    name='angle-right'
                    size={Metrics.icons.x_small} 
                    style={[styles.dropDownIcon, {color: Colors.formTextColor}]}>
                </Icon>
              </View>
            </TouchableOpacity>
            {renderUserGroupView}
          </View>
          <Separator label="Contact"/>
          <InputField icon="ios-email-outline" placeholder="Email" value={email} onValueChange={(value) => this.setState({email: value})}/>
          <InputField icon="ios-telephone-outline" placeholder="Mobile" value={mobile} onValueChange={(value) => this.setState({mobile: value})}/>
          <Separator label="Address"/>
          <InputField icon="ios-home-outline" placeholder="Add a new address" value={address} onValueChange={(value) => this.setState({address: value})}/>
          <FormCityPicker value={city} onChange={(value)=> this.setState({city: value.name, country: value.country})}/>
          <View style={{height: 40}}></View>
        </ScrollView>
      </View>

      
    )
  }
}

ProfileScreen.contextTypes = {
  openDrawer: React.PropTypes.func,
};


const mapStateToProps = (state) => {
  return {
    profileData: state.profileData,
  }
}

export default connect(mapStateToProps)(ProfileScreen)
