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

const requestJsonByCoords = (latitude, longitude) =>
  createAction(Types.MAP_JSON_REQUEST, {latitude, longitude})
const receiveJsonByCoords = (json) =>
  createAction(Types.MAP_JSON_RECEIVE, { json })
const receiveJsonByCoordsFailure = (errorCode) =>
  createAction(Types.MAP_JSON_FAILURE, {errorCode})

const requestDirection = (desAddress, mode) => 
  createAction(Types.MAP_DIRECTION_REQUEST, { desAddress, mode })
const receiveDirection = () =>
  createAction(Types.MAP_DIRECTION_RECEIVE)
const receiveDirectionFailure = (error) => 
  createAction(Types.MAP_DIRECTION_FAILURE, { error })

const saveProfile = (profile, objectId) =>
  createAction(Types.SAVE_PROFILE, {profile, objectId})
const saveProfileSuccess = (ok) =>
  createAction(Types.SAVE_PROFILE_SUCCCESS, {ok})
const saveProfileFailure = (error) =>
  createAction(Types.SAVE_PROFILE_FAILURE, {error})

const saveEmergency= (emergency) => 
  createAction(Types.SAVE_EMERGENCY, {emergency})
const saveEmergencySuccess = (ok) =>
  createAction(Types.SAVE_EMERGENCY_SUCCCESS, {ok})
const saveEmergencyFailure = (error) =>
  createAction(Types.SAVE_EMERGENCY_FAILURE, {error})

const turnOnPushNotifications = () =>
  createAction(Types.TURNED_ON_PUSH_NOTIFICATIONS)
const storeDeviceToken = (deviceToken) =>
  createAction(Types.REGISTERED_PUSH_NOTIFICATIONS)
const skipPushNotifications = () =>
  createAction(Types.SKIPPED_PUSH_NOTIFICATIONS)
const receivePushNotification = (notification) =>
  createAction(Types.RECEIVED_PUSH_NOTIFICATION, {notification})
const markAllNotificationsAsSeen = () =>
  createAction(Types.SEEN_ALL_NOTIFICATIONS)
const saveToken = (token, profileId) => 
  createAction(Types.SAVE_TOKEN, {token, profileId})
const saveTokenSuccess = (ok) =>
  createAction(Types.SAVE_TOKEN_SUCCCESS, {ok})
const saveTokenFailure = (error) =>
  createAction(Types.SAVE_TOKEN_FAILURE, {error})
const loadTokenSuccess = () =>
  createAction(Types.LOAD_TOKEN_SUCCESS)

const skipSwiper = () => 
  createAction(Types.SKIP_SWIPER)

const updateLocationAndSaveEmergency = (emergencyType, profileId) =>
  createAction(Types.UPDATE_LOCATION_AND_SAVE_EMERGENCY, {emergencyType, profileId})

const uploadImage = (data, emergencyId, selectedImages) =>
  createAction(Types.UPLOAD_IMAGE, {data, emergencyId, selectedImages})
const uploadImageSuccess = () =>
  createAction(Types.UPLOAD_IMAGE_SUCCESS)
const uploadImageFailure = (error) =>
  createAction(Types.UPLOAD_IMAGE_FAILURE, {error})
const getEmergencyById = (emergencyId) =>
  createAction(Types.GET_EMERGENCY_BY_ID, {emergencyId})
const getEmergencyByIdSuccess = (imagesInfo) =>
  createAction(Types.GET_EMERGENCY_BY_ID_SUCCESS, {imagesInfo})
const getEmergencyByIdFailure = (error) => 
  createAction(Types.GET_EMERGENCY_BY_ID_FAILURE, {error})

const navigate = (tab) => createAction(Types.NAVIGATION, {tab})

const receiveEmergency = (data) => createAction(Types.RECEIVE_EMERGENCY, {data})
/**
 Makes available all the action creators we've created.
 */
const fetchImages = (id) => createAction(Types.FETCH_IMAGES, {id})
const fetchImagesSuccess = (links) => createAction(Types.FETCH_IMAGES_SUCCESS, {links})
const fetchImagesFailure = (error) => createAction(Types.FETCH_IMAGES_FAILURE, {error})

export default {
  attemptLogin,
  loginSuccess,
  loginFailure,
  logout,
  startup,
  requestLocation,
  receiveLocation,
  receiveLocationFailure,
  requestJsonByCoords,
  receiveJsonByCoords,
  receiveJsonByCoordsFailure,
  requestDirection,
  receiveDirection,
  receiveDirectionFailure,
  saveProfile,
  saveProfileSuccess,
  saveProfileFailure,
  saveEmergency,
  saveEmergencySuccess,
  saveEmergencyFailure,
  saveToken,
  saveTokenSuccess,
  saveTokenFailure,
  saveProfileFailure,
  turnOnPushNotifications,
  storeDeviceToken,
  skipPushNotifications,
  receivePushNotification,
  markAllNotificationsAsSeen,
  loadTokenSuccess,
  skipSwiper,
  updateLocationAndSaveEmergency,
  uploadImage,
  uploadImageSuccess,
  uploadImageFailure,
  getEmergencyById,
  getEmergencyByIdSuccess,
  getEmergencyByIdFailure,
  navigate,
  receiveEmergency,
  fetchImages,
  fetchImagesSuccess,
  fetchImagesFailure
}
