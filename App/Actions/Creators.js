import createAction from './CreateAction'
import Types from './Types'

const attemptLogin = (username, password) =>
  createAction(Types.LOGIN_ATTEMPT, { username, password })

const loginSuccess = (username) =>
  createAction(Types.LOGIN_SUCCESS, { username })

const loginFailure = (errorCode) =>
  createAction(Types.LOGIN_FAILURE, { errorCode })

const logout = () => createAction(Types.LOGOUT)

const startup = () => createAction(Types.STARTUP)

const requestTemperature = (city) => createAction(Types.TEMPERATURE_REQUEST, { city })
const receiveTemperature = (temperature) => createAction(Types.TEMPERATURE_RECEIVE, { temperature })
const receiveTemperatureFailure = () => createAction(Types.TEMPERATURE_FAILURE)

const requestLocation = () =>
  createAction(Types.MAP_LOCATION_REQUEST)
const receiveLocation = (latitude, longitude) =>
  createAction(Types.MAP_LOCATION_RECEIVE, { latitude, longitude  })
const receiveLocationFailure = (errorCode) =>
  createAction(Types.MAP_LOCATION_FAILURE, {errorCode})
  const requestMapJSON = (latitude, longitude, type) =>
  createAction(Types.MAP_JSON_REQUEST)
const receiveMapJSON = (json) =>
  createAction(Types.MAP_JSON_RECEIVE, { latitude, longitude  })
const receiveMapJSONFailure = (errorCode) =>
  createAction(Types.MAP_JSON_FAILURE, {errorCode})

const addMarker = (latitude, longitude, title) =>
  createAction(Types.MAP_MARKER_ADD, { latitude, longitude, title })
const zoomInMap = (percent) => 
  createAction(Types.MAP_ZOOM_IN)
const zoomOutMap = (percent) =>
  createAction(Types.MAP_ZOOM_OUT, { percent }) 

const requestCall = (phoneNumber) => 
  createAction(Types.CALL_REQUEST, {phoneNumber})
const requestCallReceive = () =>
  createAction(Types.CALL_RECEIVE)
const requestCallFailure = (errorCode) =>
  createAction(Types.CALL_FAILURE, {errorCode})
const saveProfile = (profile) => createAction(Types.SAVE_PROFILE, {profile})
/**
 Makes available all the action creators we've created.
 */
export default {
  attemptLogin,
  loginSuccess,
  loginFailure,
  logout,
  startup,
  requestTemperature,
  receiveTemperature,
  receiveTemperatureFailure,
  requestLocation,
  receiveLocation,
  receiveLocationFailure,
  requestCall,
  requestCallReceive,
  requestCallFailure,
  requestMapJSON,
  receiveMapJSON,
  receiveMapJSONFailure,
  saveProfile
}
