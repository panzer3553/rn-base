import { watchStartup } from './StartupSaga'
import { watchLoginAttempt } from './LoginSaga'
import { watchLocationRequest, watchJsonRequest } from './MapScreenSaga'
//import { watchLoginAttempt } from './PushNotificationSaga'

// start the daemons
export default [
  watchLoginAttempt,
  watchLocationRequest,
  watchJsonRequest,
  //watchNotificationRequest,
]
