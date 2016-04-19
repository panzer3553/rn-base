// An All Components Screen is a great way to dev and quick-test components
import React, { 
    View, 
    ScrollView, 
    Text, 
    TouchableOpacity, 
    PropTypes, 
    StyleSheet,
    Alert,
    TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/AllComponentsScreenStyle'
import { Colors, Images, Metrics } from '../Themes'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import MapScreen from '../Components/MapScreen'
import BubblePopUp from './BubblePopUp.js'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import {MKButton,MKColor} from 'react-native-material-kit'
import Communications from 'react-native-communications'
// I18n
import I18n from '../I18n/I18n.js'

var fireItems = [ 
     {icon: 'fire', text: 'Show Info Screen', func: 'showHelpScreen'}, 
     {icon: 'fire', text: 'Show Location', func: 'showUserLocation'}, 
     {icon: 'fire', text: 'Location Info', func: 'JSONLocation'}, 
    ]

export default class AllComponentsScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isPopupShow: false,
      items: [],
    }

    this.handlePressLogin = this.handlePressLogin.bind(this)
    this.handlePressLogout = this.handlePressLogout.bind(this)
    this.handleRequestLocation  = this.handleRequestLocation.bind(this)
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool,
    dispatch: PropTypes.func,
    latitude:  PropTypes.number,
    longitude: PropTypes.number,
  }


  componentWillMount () {
    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
    }
  }

  // fires when the user presses the login button
  handlePressLogin () {
    const { navigator } = this.props
    const route = Routes.LoginScreen
    navigator.push(route)
  }

  // fires when the user presses the logout button
  handlePressLogout () {
    const { dispatch } = this.props
    dispatch(Actions.logout())
  }

  handleRequestLocation() {
    const { dispatch } = this.props
    dispatch(Actions.requestLocation())
  }

  handleShowPopUp (_items) {
    this.setState({items: _items})
    this.setState({isPopupShow: true})
  }

  handleClosePopUp () {
    this.setState({isPopupShow: false})
  }



  renderLoginButton () {
    return (
      <View style={styles.loginBox}>
        <TouchableOpacity onPress={this.handlePressLogin}>
          <View style={styles.loginButton}>
            <Text style={styles.loginText}>{I18n.t('signIn')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderLogoutButton () {
    return (
      <View style={styles.loginBox}>
        <TouchableOpacity onPress={this.handlePressLogout}>
          <View style={styles.loginButton}>
            <Text style={styles.loginText}>{I18n.t('logOut')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    const { loggedIn } = this.props
    //console.log('__' + Metrics.screenHeight )
    const PlainFab = MKButton.plainFab()
    .withStyle({width:80, height: 80})
    .build();
    const SmallPlainFab = MKButton.plainFab()
    .withStyle({width:60, height: 60})
    .build();


    if (this.state.isPopupShow) {
        return (
          <View style={styles.screenContainer}>
            <MapScreen />
            <View style={styles.infoIconContainer}>
              <SmallPlainFab onPress={this.handleShowPopUp.bind(this, fireItems)}>
                <Icon name="info" 
                    size={Metrics.icons.small} 
                    color={Colors.error} 
                />
              </SmallPlainFab>
            </View>
            <BubblePopUp  
                items={this.state.items}
                elementWidth={Metrics.screenWidth * 4 / 5}
                elementHeight={30}
                isVisible={this.state.isPopupShow}
                onClose={this.handleClosePopUp.bind(this)}
                navigator={this.props.navigator}
                dispatch={this.props.dispatch}
            />
         </View>
      )
    }

    return (
      <View style={styles.screenContainer}>
        <MapScreen />
        <View style={styles.infoIconContainer}>
          <SmallPlainFab onPress={this.handleShowPopUp.bind(this, fireItems)}>
            <Icon name="info" 
                size={Metrics.icons.small} 
                color={Colors.error} 
            />
          </SmallPlainFab>
        </View>
        <View style={styles.icons_group_container}>
         <PlainFab  onPress={this.showConfirmDialog.bind(this, I18n.t('urgentCallTitle'),
                                                     I18n.t('urgentFireCallMessage'),
                                                     '+84982709185')}>
            <Icon 
              name='ambulance'
              size={Metrics.icons.medium} 
              color={Colors.error} 
            />
          </PlainFab>
          <PlainFab  onPress={this.showConfirmDialog.bind(this, I18n.t('urgentCallTitle'),
                                                     I18n.t('urgentAmbulanceCallMessage'),
                                                     '+84982709185' )}>
            <Icon 
              name='ambulance'
              size={Metrics.icons.medium} 
              color={Colors.error} 
            />
          </PlainFab>
          <PlainFab  onPress={this.showConfirmDialog.bind(this, I18n.t('urgentCallTitle'),
                                                     I18n.t('urgentPoliceCallMessage'),
                                                     '+84982709185' )}>
            <Icon 
              name='bell'
              size={Metrics.icons.medium} 
              color={Colors.error} 
              />
          </PlainFab>
        </View>   
     </View> 
    )
  }

  showConfirmDialog (_title, _message, _phoneNumber) {

     Alert.alert(
            _title,
            _message + _phoneNumber,
            [
               {text: 'Cancel', onPress: () => console.log('Cancel')},
              {text: 'OK', onPress: () =>  Communications.phonecall(_phoneNumber, false)},
            ]
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.username !== null,
    latitude: state.mapscreen.latitude,
    longitude: state.mapscreen.longitude,
  }
}

export default connect(mapStateToProps)(AllComponentsScreen)