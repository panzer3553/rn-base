// An All Components Screen is a great way to dev and quick-test components
import React, { View, ScrollView, Text, TouchableOpacity, PropTypes, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/AllComponentsScreenStyle'
import ProgressiveImage from '../Components/ProgressiveImage'
import { Colors, Images, Metrics } from '../Themes'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'

// I18n
import I18n from '../I18n/I18n.js'
import MapView from 'react-native-maps';
import VectorIcon from 'react-native-vector-icons/Ionicons'
import mapstyle from './Styles/MapScreenStyle'
import FakePopup from './FakePopupScreen'
import fakePopupStyle from './Styles/FakePopupScreenStyle'
import CircleIcon from '../Components/CircleIcon'
import MapScreen from '../Components/MapScreen'

var fireItems = [ 
      {icon: 'fire', text: 'item1', func: 'call1'}, 
      {icon: 'fire', text: 'item2', func: 'call2'}, 
      {icon: 'fire', text: 'item3', func: 'call3'}, 
      {icon: 'fire', text: 'item4', func: 'call4'}, 
      {icon: 'fire', text: 'item5', func: 'call5'}, 
      {icon: 'fire', text: 'item6', func: 'call6'},
    ];

var ambulanceItems  = [ 
      {icon: 'ambulance', text: 'item1', func: 'call1'}, 
      {icon: 'ambulance', text: 'item2', func: 'call2'}, 
      {icon: 'ambulance', text: 'item3', func: 'call3'}, 
      {icon: 'ambulance', text: 'item4', func: 'call4'}, 
      {icon: 'ambulance', text: 'item5', func: 'call5'}, 
      {icon: 'ambulance', text: 'item6', func: 'call6'},
    ];
var policeItems =  [ 
      {icon: 'bell', text: 'item1', func: 'call1'}, 
      {icon: 'bell', text: 'item2', func: 'call2'}, 
      {icon: 'bell', text: 'item3', func: 'call3'}, 
      {icon: 'bell', text: 'item4', func: 'call4'}, 
      {icon: 'bell', text: 'item5', func: 'call5'}, 
      {icon: 'bell', text: 'item6', func: 'call6'},
    ];

const POP_UP_FIRE = 0;
const POP_UP_AMBULANCE = 1;
const POP_UP_POLICE = 2;

export default class AllComponentsScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isPopupShow: false,
      leftPosClick: null,
      topPopUpPos: null,
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
    temperature: PropTypes.number,
    city: PropTypes.string,
    latitude:  PropTypes.number,
    longitude: PropTypes.number,
  };

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

  handleRequestCall() {
    const { dispatch } = this.props
    dispatch(Actions.requestCall())
  }

  handleRequestShowDirection() {
    //temp do nothing
  }

  handleShowPopUp (_items, left, top) {
    this.setState({items: _items})
    this.setState({isPopupShow: true})
    this.setState({leftPosClick: left})
    this.setState({topPopUpPos: top})
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
    const { loggedIn, temperature, city } = this.props

    return (
      <View style={styles.screenContainer}>
        <MapScreen />
                <FakePopup  items={this.state.items}
                    elementWidth={Metrics.screenWidth * 4 / 5}
                    elementHeight={30}
                    topPopUpPos={this.state.topPopUpPos}
                    leftPosClick={this.state.leftPosClick}
                    visibility={this.state.isPopupShow}
                     />
        <View style={mapstyle.icons_container}>
              <CircleIcon
                name='fire-extinguisher'
                size={Metrics.icons.medium}
                color={Colors.error}
                onPress={() => this.props.dispatch(Actions.requestLocation())}
                />
              <CircleIcon
                name='ambulance'
                size={Metrics.icons.medium}
                color={Colors.error}
                />
              <CircleIcon
                name='bell'
                size={Metrics.icons.medium}
                color={Colors.error}
              />
       </View>   
     </View>
    )
  }
}

const style1s = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.username !== null,
    temperature: state.weather.temperature,
    city: state.weather.city,
    latitude: state.mapscreen.latitude,
    longitude: state.mapscreen.longitude
  }
}

export default connect(mapStateToProps)(AllComponentsScreen)
