// A list of all actions in the system.
export default {
  STARTUP: 'STARTUP',
  LOGIN_ATTEMPT: 'LOGIN_ATTEMPT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT',

  MAP_LOCATION_REQUEST: 'MAP_LOCATION_REQUEST',
  MAP_LOCATION_RECEIVE: 'MAP_LOCATION_RECEIVE',
  MAP_LOCATION_FAILURE: 'MAP_LOCATION_FAILURE',

  MAP_JSON_REQUEST: 'MAP_JSON_REQUEST',
  MAP_JSON_RECEIVE: 'MAP_JSON_RECEIVE',
  MAP_JSON_FAILURE: 'MAP_JSON_FAILURE',

  MAP_DIRECTION_REQUEST:  'MAP_DIRECTION_REQUEST',
  MAP_DIRECTION_RECEIVE: 'MAP_DIRECTION_RECEIVE',
  MAP_DIRECTION_FAILURE: 'MAP_DIRECTION_FAILURE',

  SAVE_PROFILE: 'SAVE_PROFILE',
  SAVE_PROFILE_SUCCCESS: 'SAVE_PROFILE_SUCCCESS',
  SAVE_PROFILE_FAILURE: 'SAVE_PROFILE_FAILURE',

  SAVE_EMERGENCY: 'SAVE_EMERGENCY',
  SAVE_EMERGENCY_SUCCCESS: 'SAVE_EMERGENCY_SUCCCESS',
  SAVE_EMERGENCY_FAILURE: 'SAVE_EMERGENCY_FAILURE',

  TURNED_ON_PUSH_NOTIFICATIONS: 'TURNED_ON_PUSH_NOTIFICATIONS',
  REGISTERED_PUSH_NOTIFICATIONS: 'REGISTERED_PUSH_NOTIFICATIONS',
  SKIPPED_PUSH_NOTIFICATIONS: 'SKIPPED_PUSH_NOTIFICATIONS',
  RECEIVED_PUSH_NOTIFICATION: 'RECEIVED_PUSH_NOTIFICATION',
  SEEN_ALL_NOTIFICATIONS: 'SEEN_ALL_NOTIFICATIONS',
  SAVE_TOKEN: 'SAVE_TOKEN',
  SAVE_TOKEN_SUCCCESS: 'SAVE_TOKEN_SUCCCESS',
  SAVE_TOKEN_FAILURE: 'SAVE_TOKEN_FAILURE',
  LOAD_TOKEN_SUCCESS: 'LOAD_TOKEN_SUCCESS',

  SKIP_SWIPER: 'SKIP_SWIPER',
  UPDATE_LOCATION_AND_SAVE_EMERGENCY: 'UPDATE_LOCATION_AND_SAVE_EMERGENCY',

  UPLOAD_IMAGE: 'UPLOAD_IMAGE',
  UPLOAD_IMAGE_SUCCESS: 'UPLOAD_IMAGE_SUCCESS',
  UPLOAD_IMAGE_FAILURE: 'UPLOAD_IMAGE_FAILURE',

  GET_EMERGENCY_BY_ID: 'GET_EMERGENCY_BY_ID',
  GET_EMERGENCY_BY_ID_SUCCESS: 'GET_EMERGENCY_BY_ID_SUCCESS',
  GET_EMERGENCY_BY_ID_FAILURE: 'GET_EMERGENCY_BY_ID_FAILURE',
}
