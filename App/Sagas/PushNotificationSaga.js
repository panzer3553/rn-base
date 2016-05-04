import Client from '../Services/HttpClient'
import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import I18n from '../I18n/I18n.js'
import React, {
  Platform
} from 'react-native'
import VibrationIOS from 'VibrationIOS'

function normalizeData(str: string | Object) {
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

export function * storeDeviceToken(deviceToken: string)  {
  console.log('Got device token', deviceToken)
  //const pushType = Platform.OS === 'android' ? 'gcm' : undefine

  yield put(Actions.REGISTERED_PUSH_NOTIFICATIONS)
}

export function * turnOnPushNotifications () {
  yield put(Actions.TURNED_ON_PUSH_NOTIFICATIONS)
}

export function * skipPushNotifications () {
  yield put(Actions.SKIPPED_PUSH_NOTIFICATIONS)
}

export function * receivePushNotification (notification) {
  console.log('NOTIFICATION ' + notification)
  yield put(Actions.RECEIVED_PUSH_NOTIFICATION)
}


export function * watchNotificationRequest () {

}

export function * watchReceiveNotification () {
  while (true) {
    const { notification } = yield take(Types.RECEIVED_PUSH_NOTIFICATION)
    yield call(receivePushNotification, notification)
  }

}