import { combineReducers } from 'redux'
import LoginReducer from './LoginReducer'
import MapScreenReducer from './MapScreenReducer'
import SaveProfileReducer from './SaveProfileReducer'
import SaveEmergencyReducer from './SaveEmergencyReducer'
import SaveTokenReducer from './SaveTokenReducer'
import SkipSwiperReducer from './SkipSwiperReducer'
import NotificationReducer from './NotificationReducer'
import MapDirectionReducer  from './MapDirectionReducer'
// glue all the reducers together into 1 root reducer
export default combineReducers({
  login: LoginReducer,
  mapscreen: MapScreenReducer,
  profileData: SaveProfileReducer,
  emergencyData: SaveEmergencyReducer,
  tokenData: SaveTokenReducer,
  firstLoad: SkipSwiperReducer,
  notificationData: NotificationReducer,
  direction: MapDirectionReducer,
})

// Put reducer keys that you do NOT want stored to persistence here
export const persistentStoreBlacklist = ['login', 'emergencyData']
