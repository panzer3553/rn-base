
import React, { Platform } from 'react-native'
import Immutable from 'seamless-immutable'
import Types from '../Actions/Types'
import createReducer from './CreateReducer'

export const INITIAL_STATE = Immutable({
  server: [],
  notification: null,
  enabled: Platform.OS === 'ios' ? null : true,
  registered: false,
  seen: {},
})
      
const receiveNotification = (state, action) =>
  state.merge({
    notification: action.notification
  })

const turnOnPushNotifications = (state, action) =>
  state.merge({
    enabled: true,
  })

const skipPushNotifications = (state, action) =>
  state.merge({
    enabled: false,
  })

const registerPushNotifications = (state, action) =>
  state.merge({
    registered: true,
  })

const ACTION_HANDLERS = {
  [Types.RECEIVED_PUSH_NOTIFICATION]: receiveNotification,
  [Types.TURNED_ON_PUSH_NOTIFICATIONS]: turnOnPushNotifications,
  [Types.SKIPPED_PUSH_NOTIFICATIONS]: skipPushNotifications,
  [Types.REGISTERED_PUSH_NOTIFICATIONS]: registerPushNotifications,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
