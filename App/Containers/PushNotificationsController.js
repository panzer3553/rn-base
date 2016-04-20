'use strict';

import React from 'react-native'
import AppState  from 'AppState'
import Platform ('Platform');
import unseenNotificationsCount from './tabs/notifications/unseenNotificationsCount'
import PushNotificationIOS from 'PushNotificationIOS'
// $FlowIssue
import PushNotification from 'react-native-push-notification'

import  { connect } from 'react-redux'

import type {Dispatch} from './actions/types'

const PARSE_CLOUD_GCD_SENDER_ID = '1076345567071';

class AppBadgeController extends React.Component {
  props: {
    tab: string;
    enabled: boolean;
    badge: number;
    dispatch: Dispatch;
  };

  constructor() {
    super();

    (this: any).handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  handleAppStateChange(appState) {
    if (appState === 'active') {
      this.updateAppBadge();
      if (this.props.tab === 'notifications') {
        this.eventuallyMarkNotificationsAsSeen();
      }
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    const {dispatch} = this.props;
    PushNotification.configure({
      onRegister: ({token}) => dispatch(storeDeviceToken(token)),
      onNotification: (notif) => dispatch(receivePushNotification(notif)),
      senderID: PARSE_CLOUD_GCD_SENDER_ID,
      requestPermissions: this.props.enabled,
    });

    this.updateAppBadge();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.enabled && this.props.enabled) {
      PushNotification.requestPermissions();
    }
    if (this.props.badge !== prevProps.badge) {
      this.updateAppBadge();
    }
    if (this.props.tab === 'notifications' && prevProps.tab !== 'notifications') {
      this.eventuallyMarkNotificationsAsSeen();
    }
  }

  updateAppBadge() {
    if (this.props.enabled && Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(this.props.badge);
      updateInstallation({badge: this.props.badge});
    }
  }

  eventuallyMarkNotificationsAsSeen() {
    const {dispatch} = this.props;
    setTimeout(() => dispatch(markAllNotificationsAsSeen()), 1000);
  }

  render() {
    return null;
  }
}

function select(store) {
  return {
    enabled: store.notifications.enabled === true,
    badge: unseenNotificationsCount(store) + store.surveys.length,
    tab: store.navigation.tab,
  };
}

module.exports = connect(select)(AppBadgeController);