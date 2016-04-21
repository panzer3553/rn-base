import Client from '../Services/HttpClient'
import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'

import I18n from '../I18n/I18n.js'
import React from 'react-native'
import Platform from 'Platform'
import VibrationIOS from 'VibrationIOS'

function normalizeData(str: string | Object): Object {
  if (str && typeof str === 'object') {
    return str
  }

  try {
    return JSON.parse(str);
  } 
  catch (e) {
    return { }
  }
}

export function * async function storeDeviceToken(deviceToken: string): Promise<Action> {
  console.log('Got device token', deviceToken)
  const pushType = Platform.OS === 'android' ? 'gcm' : undefined
  await updateInstallation({
    pushType,
    deviceToken,
    deviceTokenLastModified: Date.now(),
  })

  yield put(Actions.REGISTERED_PUSH_NOTIFICATIONS)
}

export * function turnOnPushNotifications(): Action {
  yield put(Actions.TURNED_ON_PUSH_NOTIFICATIONS)
}

export * function skipPushNotifications(): Action {
  yield put(Actions.SKIPPED_PUSH_NOTIFICATIONS)
}

export * function receivePushNotification(notification): ThunkAction {
  return (dispatch) => {
    const {foreground, message } = notification;
    const data = normalizeData(notification.data)

    if (!foreground) {
      dispatch(switchTab('notifications'));
    }

    if (foreground) {
      dispatch(loadNotifications());
      dispatch(loadSurveys())

      if (Platform.OS === 'ios') {
        VibrationIOS.vibrate()
      }
    }

    if (data.e) {
      return
    }

    const timestamp = new Date().getTime()
    yield put(	Actions.RECEIVED_PUSH_NOTIFICATION, 
    		  	notification: {
			        text: message,
			        url: data.url,
			        time: timestamp,
      		})
  }
}

export * function markAllNotificationsAsSeen(): Action {
  yield put(Actions.SEEN_ALL_NOTIFICATIONS)
}


export function * watchNotificationRequest () {

}