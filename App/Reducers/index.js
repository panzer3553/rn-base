import { combineReducers } from 'redux'
import LoginReducer from './LoginReducer'
import MapScreenReducer from './MapScreenReducer'
import SaveProfileReducer from './SaveProfileReducer'
import SaveEmergencyReducer from './SaveEmergencyReducer'
import SaveTokenReducer from './SaveTokenReducer'
import NotificationReducer from './NotificationReducer'
import NavigationReducer from './NavigationReducer'
import UploadImageReducer from './UploadImageReducer'
import EmergencyReducer from './EmergencyReducer'
import FetchImageReducer from './FetchImageReducer'
// glue all the reducers together into 1 root reducer
export default combineReducers({
  login: LoginReducer,
  mapscreen: MapScreenReducer,
  profileData: SaveProfileReducer,
  emergencyData: SaveEmergencyReducer,
  tokenData: SaveTokenReducer,
  notificationData: NotificationReducer,
  uploadImage: UploadImageReducer, 
  navigation: NavigationReducer,
  emergencyReceive: EmergencyReducer,
  emergencyImages: FetchImageReducer
}) 

// Put reducer keys that you do NOT want stored to persistence here
export const persistentStoreBlacklist = ['login', 'emergencyData', 'mapscreen', 'navigation', 'emergencyReceive', 'uploadImage', 'emergencyImages']
