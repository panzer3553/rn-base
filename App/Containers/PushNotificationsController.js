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
    PushNotification.configure({
      onRegister: (token) => {
        const { dispatch } = this.props
        const objectId = this.props.profileId ? this.props.profileId.objectId : null
        dispatch(Actions.saveToken(token, objectId))
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: (notification) => {
        console.log('NOTIFICATION:', notification)
        const { dispatch } = this.props
        dispatch(Actions.receivePushNotification(notification))

        const { latitude, longitude } = notification.data.emergency
        const desAddress = '' + latitude +  ',' + longitude //'16.074424, 108.2028329' for test

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
      senderID: PARSE_CLOUD_GCD_SENDER_ID,
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: false,
      requestPermissions: true
    })

    MessageBarManager.registerMessageBar(this.refs.alert)
    console.log(this.props)
  }

  componentWillUnmount() {
     MessageBarManager.unregisterMessageBar()
  }


  // componentDidUpdate(prevProps) {
  //   if (!prevProps.enabled && this.props.enabled) {
  //     PushNotification.requestPermissions();
  //   }
  // }

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

// const mapStateToProps = (state) => {
//   return {
//     latitude: state.mapscreen.latitude,
//     longitude: state.mapscreen.longitude,
//     profileId: state.profileData.ok
//   }
// }

// export default connect(mapStateToProps)(PushNotificationsController)

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(PushNotificationsController)
