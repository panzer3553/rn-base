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
const STORAGE_KEY_PROFILE = "PROFILE_ID"
const STORAGE_KEY_TOKEN = "TOKEN_ID"
import {AsyncStorage} from 'react-native'

const PARSE_CLOUD_GCD_SENDER_ID = '56113279400'

class PushNotificationsController extends React.Component {
  props: {
    enabled: boolean,
  };

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    const { dispatch } = this.props

    PushNotification.configure({
      onRegister: (token) => {
        try{
          AsyncStorage.setItem(STORAGE_KEY_TOKEN, JSON.stringify(token))
        }catch(error){
          console.error("Save token error")
        }
        AsyncStorage.getItem(STORAGE_KEY_PROFILE).then((value) => {
            if (value !== null){
              console.log("value")
              dispatch(Actions.saveToken(token, value))
            } else {
              console.log("failed")
              dispatch(Actions.saveToken(token))
            }
          })
        },

      // (required) Called when a remote or local notification is opened or received
      onNotification: (notification) => {
        console.log('NOTIFICATION:', notification)
        dispatch(Actions.receivePushNotification(notification))

        const { latitude, longitude } = notification.data.emergency.location
        const desAddress = '' + latitude +  ',' + longitude //'16.074424, 108.2028329' for test

        if ( notification.foreground)
        {
          console.log('is foreground')
          if (Platform.OS === 'ios'){
            VibrationIOS.vibrate()
          }
          const message = notification.message
          const duration = 7000
          const type = 'warning'
          this.showAlertWithCallback(message, type, duration, desAddress)      
        }
        else { // background
          console.log('DES:' + desAddress) 
          const mode = (Platform.OS === 'ios') ? 'dirflg=d' : 'mode=bicycling'
          dispatch(Actions.requestDirection(desAddress, mode))
          console.log('is background')
        }

      },
      senderID: PARSE_CLOUD_GCD_SENDER_ID,
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
    })
    PushNotification.setApplicationIconBadgeNumber(0)
    MessageBarManager.registerMessageBar(this.refs.alert)
  }

  componentWillUnmount() {
     MessageBarManager.unregisterMessageBar()
  }


  // componentDidUpdate(prevProps) {
  //   if (!prevProps.enabled && this.props.enabled) {
  //     PushNotification.requestPermissions();
  //   }
  // }

  componentWillReceiveProps(){
    
  }




  // componentDidUpdate(prevProps) {
  //   if (!prevProps.enabled && this.props.enabled) {
  //     PushNotification.requestPermissions();
  //   }
  // }

  componentWillReceiveProps(){
    
  }

  showAlertWithCallback(message, type, duration, desAddress) {
    // Simple show the alert with the manager
    MessageBarManager.showAlert({
      message: message,
      alertType: type,
      duration: duration,
      //viewTopInset : 15,
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


export default connect(mapStateToProps)(PushNotificationsController)
