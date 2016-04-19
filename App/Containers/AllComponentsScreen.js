// An All Components Screen is a great way to dev and quick-test components
import React, { View, Text, PropTypes, StyleSheet, Alert} from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/AllComponentsScreenStyle'
import { Colors, Images, Metrics } from '../Themes'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import {MKButton,MKColor} from 'react-native-material-kit'
// I18n
import I18n from '../I18n/I18n.js'
import VectorIcon from 'react-native-vector-icons/Ionicons'
import mapstyle from './Styles/MapScreenStyle'
import CircleIcon from '../Components/CircleIcon'
import MapScreen from '../Components/MapScreen'
import BubblePopUp from './BubblePopUp.js'
import Communications from 'react-native-communications'

var fireItems = [ 
     {icon: 'fire', text: 'Show Info Screen', func: 'showHelpScreen'}, 
     {icon: 'fire', text: 'Show Location', func: 'showUserLocation'}, 
     {icon: 'fire', text: 'Location Info', func: 'JSONLocation'}, 
   ];

export default class AllComponentsScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isPopupShow: false,
      items: [],
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


  handleShowPopUp (_items) {
    this.setState({items: _items})
    this.setState({isPopupShow: true})
  }

  handleClosePopUp () {
    this.setState({isPopupShow: false})
  }

  render () {
    const PlainFab = MKButton.plainFab()
    .withStyle({width:80, height: 80})
    .build()

    const SmallPlainFab = MKButton.plainFab()
    .withStyle({width:60, height: 60})
    .build()

    const bottomButtons = this.state.isPopupShow ? null : (
        <View style={mapstyle.icons_container}>
          <PlainFab onPress={this.showConfirmDialog.bind(this, 
                                                    'Do you want to make this call ?',
                                                    'Only make this call when you are in an emergency situation! ' +
                                                     'Please confirm to make the call to FIRE STATION: ',
                                                     '+84982709185' )}>
            <Icon name="fire" size={Metrics.icons.medium} color="red" />
          </PlainFab>
          <PlainFab  onPress={this.showConfirmDialog.bind(this, 
                                                    'Do you want to make this call ?',
                                                    'Only make this call when you are in an emergency situation! ' +
                                                     'Please confirm to make the call to  AMBULANCE: ',
                                                     '+84982709185' )}>
            <Icon name="ambulance" size={Metrics.icons.medium} color="red" />
          </PlainFab>
          <PlainFab  onPress={this.showConfirmDialog.bind(this, 
                                                    'Do you want to make this call ?',
                                                    'Only make this call when you are in an emergency situation! ' +
                                                     'Please confirm to make the call to POLICE STATION: ',
                                                     '+84982709185' )}>
            <Icon name="bell" size={Metrics.icons.medium} color="red" />
          </PlainFab>
       </View>   
      )

    return (
      <View style={styles.screenContainer}>
        <MapScreen 
        />
        <View style={styles.infoIconContainer}>
          <SmallPlainFab onPress={this.handleShowPopUp.bind(this, fireItems, Metrics.screenWidth  / 10, 30)}>
            <Icon name="info" size={Metrics.icons.small} color="red" />
          </SmallPlainFab>
        </View>
        <BubblePopUp  items={this.state.items}
            elementWidth={Metrics.screenWidth * 4 / 5}
            elementHeight={30}
            isVisible={this.state.isPopupShow}
            onClose={this.handleClosePopUp.bind(this)}
            navigator={this.props.navigator}
            dispatch={this.props.dispatch}
        />
        {bottomButtons}
     </View>
    )
  }

  showConfirmDialog (_title, _message, _phoneNumber) {

     Alert.alert(
            _title,
            _message + _phoneNumber,
            [
               {text: 'Cancel', onPress: () => console.log("Cancel")},
              {text: 'OK', onPress: () =>  Communications.phonecall(_phoneNumber, false)},
            ]
    )
  }
}


const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(AllComponentsScreen)