'use strict';

import React, {
  Platform,
  View,
} from 'react-native'
import PushNotification from 'react-native-push-notification'
import  { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import VibrationIOS from 'VibrationIOS'
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

const PARSE_CLOUD_GCD_SENDER_ID = '56113279400'

class AppBadgeController extends React.Component {
  props: {
    enabled: boolean,
  };

  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    // let isLocationAvailble = true
    // if (    (!this.props.latitude)
    //     ||  (!this.props.latitude)
    // ) 
    // {
    //   isLocationAvailble = false
    // }


    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: (token) => {
        console.log('TOKEN:', token)
        const { dispatch } = this.props
        dispatch(Actions.saveToken(token))
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: (notification) => {
        console.log('NOTIFICATION:', notification)
        const { dispatch } = this.props
        dispatch(Actions.receivePushNotification(notification))

        //const { latitude, longitude } = notification.data.emergency
        const desAddress = '16.074424, 108.2028329'//'' + latitude +  ',' + longitude
        console.log()
        if ( notification.foreground)
        {
          if (Platform.OS === 'ios'){
            VibrationIOS.vibrate()
          }
          const title = 'smartSOS'
          const message = notification.message
          const duration = 7000
          const type = 'error'
          this.showAlertWithCallback(title, message, type, duration, desAddress)      
        }
        else { // background
          const { dispatch } = this.props
          // const srcAddress = '' + this.props.latitude +  ',' 
          //                   + this.props.longitude 
          console.log('DES:' + desAddress) 
          //console.log('SRC:' + srcAddress)
          const mode = (Platform.OS === 'ios') ? 'dirflg=d' : 'mode=bicycling'
          dispatch(Actions.requestDirection(desAddress, mode))

        }

      },

      // ANDROID ONLY: (optional) GCM Sender ID.
      senderID: PARSE_CLOUD_GCD_SENDER_ID,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
        * IOS ONLY: (optional) default: true
        * - Specified if permissions will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true
    })

    MessageBarManager.registerMessageBar(this.refs.alert)
  }

  componentWillUnmount() {
     MessageBarManager.unregisterMessageBar()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.enabled && this.props.enabled) {
      PushNotification.requestPermissions();
    }
  }

  showAlertWithCallback(title, message, type, duration, desAddress) {
    // Simple show the alert with the manager
    MessageBarManager.showAlert({
      title: title,
      message: message,
      avatar: "http://www.icon100.com/up/4250/128/83-circle-error.png",
      alertType: type,
      duration: duration,
      onTapped: this.alertCustomCallBack.bind(this, desAddress),
    })
  }

  alertCustomCallBack (desAddress) {
      const srcAddress = '' + this.props.latitude +  ',' 
                            + this.props.longitude 
      console.log('DES:' + desAddress) 
      console.log('SRC:' + srcAddress)
      const mode = (Platform.OS === 'ios') ? 'dirflg=d' : 'mode=bicycling'
      const { dispatch } = this.props
      dispatch(Actions.requestDirection(desAddress, mode))
  }

  render() {
    return (
      <MessageBarAlert ref="alert" />
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    latitude: state.mapscreen.latitude,
    longitude: state.mapscreen.longitude,

  }
}

export default connect(mapStateToProps)(AppBadgeController)