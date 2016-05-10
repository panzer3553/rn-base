// An All Components Screen is a great way to dev and quick-test components
import React, { View, Text, PropTypes, Alert, AsyncStorage, Platform } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/AllComponentsScreenStyle'
import { Colors, Images, Metrics } from '../Themes'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import MapScreen from '../Components/MapScreen'
import BubblePopUp from './BubblePopUp.js'
import Icon from 'react-native-vector-icons/FontAwesome'
import {MKButton,MKColor} from 'react-native-material-kit'
import Communications from 'react-native-communications'
import PushNotification from 'react-native-push-notification'
import I18n from '../I18n/I18n.js'
import SendIntentAndroid from 'react-native-send-intent'

const fireItems = [ 
  {icon: 'fire', text: 'Show Info Screen', func: 'showHelpScreen'}, 
  {icon: 'fire', text: 'Show Location', func: 'showUserLocation'}, 
  {icon: 'fire', text: 'Location Info', func: 'JSONLocation'}, 
]

const Fab = MKButton.plainFab()
  .withStyle({width:Metrics.button.large, height: Metrics.button.large, borderRadius: Metrics.button.large/2, backgroundColor: Colors.snow})
  .build()

const SmallFab = MKButton.plainFab()
  .withStyle({width:Metrics.button.medium, height: Metrics.button.medium, borderRadius: Metrics.button.medium/2, backgroundColor: Colors.snow})
  .build()

export default class AllComponentsScreen extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.state = {
      isPopupShow: false,
      items: [],
    }
  }

  componentWillMount () {
    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
    }
  }

  handleShowPopUp (_items) {
    this.setState({items: _items})
    this.setState({isPopupShow: true})
  }

  handleClosePopUp () {
    this.setState({isPopupShow: false})
  }

  showConfirmDialog (_title, _message, _phoneNumber, type) {
    Alert.alert(
      _title,
      _message + _phoneNumber,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel')},
        {text: 'OK', onPress: () =>  this.makePhoneCall(_phoneNumber)},
      ]
    )
    const {dispatch} = this.props  
    dispatch(Actions.updateLocationAndSaveEmergency(type))
    // THE EMERGENCY SAVE HAS MOVED TO MAPSCREENSAGA
    //this.saveEmergency({
    //  location: {
    //        __type: 'GeoPoint',
    //        latitude: this.props.latitude,
    //        longitude: this.props.longitude
    //  },
    //  time: new Date(),
    //  type: type,
    //})
    //console.log(this.props)
  }

  makePhoneCall (_phoneNumber) {
    if(Platform.OS === 'android'){
      SendIntentAndroid.sendPhoneCall(_phoneNumber)
    }
    else
      Communications.phonecall(_phoneNumber, false)
  }

  saveEmergency(emergency){
    const {dispatch} = this.props
    dispatch(Actions.saveEmergency(emergency))
  }

  render () {
    const bottomButtons = this.state.isPopupShow ? null : (
        <View style={styles.icons_container}>
          <Fab onPress={this.showConfirmDialog.bind(this, 
            'Do you want to make this call ?',
            'Only make this call when you are in an emergency situation! ' +
            'Please confirm to make the call to FIRE STATION: ',
            '+84982709185', 
            'fire')}>
            <Icon name="fire" size={Metrics.icons.medium} color="red" />
          </Fab>
          <Fab  onPress={this.showConfirmDialog.bind(this, 
            'Do you want to make this call ?',
            'Only make this call when you are in an emergency situation! ' +
            'Please confirm to make the call to  AMBULANCE: ',
            '+84982709185',
             'ambulance')}>
            <Icon name="ambulance" size={Metrics.icons.medium} color="red" />
          </Fab>
          <Fab  onPress={this.showConfirmDialog.bind(this, 
            'Do you want to make this call ?',
            'Only make this call when you are in an emergency situation! ' +
            'Please confirm to make the call to POLICE STATION: ',
            '+84982709185', 
            'police' )}>
            <Icon name="bell" size={Metrics.icons.medium} color="red" />
          </Fab>
       </View>   
    )

    return (
      <View style={styles.screenContainer}>
        <MapScreen />
        <View style={styles.infoIconContainer}>
          <SmallFab onPress={this.handleShowPopUp.bind(this, fireItems)}>
            <Icon name="info" size={Metrics.icons.small} color="red" />
          </SmallFab>
        </View>
        <BubblePopUp  
          items={this.state.items}
          elementWidth={Metrics.screenWidth * 4 / 5}
          elementHeight={Metrics.screenHeight / 15}
          isVisible={this.state.isPopupShow}
          onClose={this.handleClosePopUp.bind(this)}
          navigator={this.props.navigator}
          dispatch={this.props.dispatch}
        />
      {bottomButtons}
     </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    //latitude: state.mapscreen.latitude,
    //longitude: state.mapscreen.longitude,
  }
}

export default connect(mapStateToProps)(AllComponentsScreen)