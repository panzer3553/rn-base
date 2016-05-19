import { combineReducers } from 'redux'
import LoginReducer from './LoginReducer'
import MapScreenReducer from './MapScreenReducer'
import SaveProfileReducer from './SaveProfileReducer'
import SaveEmergencyReducer from './SaveEmergencyReducer'
import SaveTokenReducer from './SaveTokenReducer'
import NotificationReducer from './NotificationReducer'
import MapDirectionReducer  from './MapDirectionReducer'
import NavigationReducer from './NavigationReducer'
import UploadImageReducer from './UploadImageReducer'
import GetEmergencyByIdReducer from './GetEmergencyByIdReducer'
import EmergencyReducer from './EmergencyReducer'

// glue all the reducers together into 1 root reducer
export default combineReducers({
  login: LoginReducer,
  mapscreen: MapScreenReducer,
  profileData: SaveProfileReducer,
  emergencyData: SaveEmergencyReducer,
  tokenData: SaveTokenReducer,
  notificationData: NotificationReducer,
  direction: MapDirectionReducer,
  uploadImage: UploadImageReducer, 
  getEmergency: GetEmergencyByIdReducer,
  navigation: NavigationReducer,
  emergencyReceive: EmergencyReducer
}) 

// Put reducer keys that you do NOT want stored to persistence here
export const persistentStoreBlacklist = ['login', 'emergencyData', 'mapscreen', 'navigation', 'emergencyReceive']
