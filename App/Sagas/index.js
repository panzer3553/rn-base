import { watchStartup } from './StartupSaga'
import { watchLoginAttempt } from './LoginSaga'
import { watchLocationRequest, watchJsonRequest } from './MapScreenSaga'
//import { watchLoginAttempt } from './PushNotificationSaga'
import {watchSaveProfile} from './SaveProfileSaga'
import {watchSaveEmergency} from './SaveEmergencySaga'
// start the daemons
export default [
  watchLoginAttempt,
  watchLocationRequest,
  watchJsonRequest,
  watchSaveProfile,
  watchSaveEmergency
]
