import { combineReducers } from 'redux'
import LoginReducer from './LoginReducer'
import MapScreenReducer from './MapScreenReducer'
import SaveProfileReducer from './SaveProfileReducer'

// glue all the reducers together into 1 root reducer
export default combineReducers({
  login: LoginReducer,
  mapscreen: MapScreenReducer,
  profileData: SaveProfileReducer 
})

// Put reducer keys that you do NOT want stored to persistence here
export const persistentStoreBlacklist = ['login']