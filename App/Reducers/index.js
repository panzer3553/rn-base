import { combineReducers } from 'redux'
import LoginReducer from './LoginReducer'
import MapScreenReducer from './MapScreenReducer'
import SaveProfileReducer from './SaveProfileReducer'
import SaveEmergencyReducer from './SaveEmergencyReducer'
import SaveTokenReducer from './SaveTokenReducer'
import NotificationReducer from './NotificationReducer'
import MapDirectionReducer  from './MapDirectionReducer'
import UploadImageReducer from './UploadImageReducer'

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
})

// Put reducer keys that you do NOT want stored to persistence here
export const persistentStoreBlacklist = ['login', 'emergencyData']
