import React, { View, ScrollView, Text, TouchableOpacity, PropTypes, StyleSheet} from 'react-native'
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
export default class ProfileScreen extends React.Component {

    constructor (props) {
    super(props)
    this.state = {
      form: null
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
  }

  componentDidMount(){
    console.log(this.form);
  }

   handleFormFocus(event, reactNode){
   this.refs.scroll.scrollToFocusedInput(event, reactNode)
  }

  handleFormChange(formData){
    this.setState({form: formData});
  }

  render(){
    return(
      <KeyboardAwareScrollView ref='scroll'>
        <Form
          style={formStyles.form}
          ref={(ref) => { this.form = ref }}
          onFocus={this.handleFormFocus.bind(this)}
          onChange={this.handleFormChange.bind(this)}
          label="Personal Information">
          <Separator label='BASIC'/>
          <InputField ref='ios-person' placeholder='First Name' iconLeft={
          <Icon name='person'
            size={Metrics.icons.x_small}
            style={[formStyles.alignLeft, {color: Colors.iconColor}]}/>}
          />
          <InputField ref='last_name' placeholder='Last Name'
          iconLeft={
          <Icon name='ios-person-outline'
            size={Metrics.icons.x_small}
            style={[formStyles.alignLeft, {color: Colors.iconColor}]}/>}
            />
          <DatePickerField ref='birthday'
            minimumDate={new Date('1/1/1900')}
            maximumDate={new Date()} mode='date' placeholder='Birthday' 
            iconLeft={
          <Icon name='ios-arrow-right'
            size={Metrics.icons.x_small}
            style={[formStyles.alignLeft, {color: Colors.iconColor}]}/>}   
            iconRight={
          <Icon name='ios-arrow-right'
            size={Metrics.icons.x_small}
            style={[formStyles.alignRight, {color: Colors.iconColor}]}/> }
          />
          <PickerField ref='gender' placeholder='Gender'
            options={{
              male: 'Male',
              female: 'Female'
            }}
          iconRight={
          <Icon name='ios-arrow-right'
            size={Metrics.icons.x_small}
            style={[formStyles.alignRight, {color: Colors.iconColor}]}/> }
          iconLeft={
          <Icon name='ios-arrow-right'
            size={Metrics.icons.x_small}
            style={[formStyles.alignLeft, {color: Colors.iconColor}]}/>}   
            />
          <Separator label='CONTACT'/>
          <InputField ref='email' placeholder='Email' keyboardType="email-address"
          iconRight={
          <Icon name='ios-arrow-right'
            size={Metrics.icons.x_small}
            style={[formStyles.alignRight, {color: Colors.iconColor}]}/> }
          iconLeft={
          <Icon name='android-mail'
            size={Metrics.icons.x_small}
            style={[formStyles.alignLeft, {color: Colors.iconColor}]}/>}   
          />
          <InputField ref='mobile' label='Mobile' placeholder='mobile' keyboardType="phone-pad"
          iconRight={
          <Icon name='ios-arrow-right'
            size={Metrics.icons.x_small}
            style={[formStyles.alignRight, {color: Colors.iconColor}]}/> }
          iconLeft={
          <Icon name='ios-telephone-outline'
            size={Metrics.icons.x_small}
            style={[formStyles.alignLeft, , {color: Colors.iconColor}]}/>}   
          />
          <Separator label='ADDRESS'/>
          <InputField ref='address' placeholder='Add new address'
          iconRight={
          <Icon name='ios-arrow-right'
            size={Metrics.icons.x_small}
            style={[formStyles.alignRight, {color: Colors.iconColor}]}/> }
          iconLeft={
          <Icon name='android-home'
            size={Metrics.icons.x_small}
            style={[formStyles.alignLeft, {color: Colors.iconColor}]}/>}
          />
        </Form>
      </KeyboardAwareScrollView>
      )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(ProfileScreen)

