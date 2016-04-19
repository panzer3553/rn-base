import createAction from './CreateAction'
import Types from './Types'

const startup = () => createAction(Types.STARTUP)

const attemptLogin = (username, password) =>
  createAction(Types.LOGIN_ATTEMPT, { username, password })
const loginSuccess = (username) =>
  createAction(Types.LOGIN_SUCCESS, { username })
const loginFailure = (errorCode) =>
  createAction(Types.LOGIN_FAILURE, { errorCode })
const logout = () => createAction(Types.LOGOUT)

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
  requestLocation,
  receiveLocation,
  receiveLocationFailure,
  requestMapJSON,
  receiveMapJSON,
  receiveMapJSONFailure,
  saveProfile,
}