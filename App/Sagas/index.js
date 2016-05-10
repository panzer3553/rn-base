import { 
  watchLocationRequest, 
  watchJsonRequest, 
  watchUpdateLocationAndSaveEmergengy,
} from './MapScreenSaga'
import { watchStartup } from './StartupSaga'
import { watchLoginAttempt } from './LoginSaga'
import { watchSaveProfile } from './SaveProfileSaga'
import { watchSaveEmergency} from './SaveEmergencySaga'
import { watchSaveToken } from './SaveTokenSaga'
import { watchDirectionRequest } from './MapDirectionSaga'
import { watchReceiveNotification } from './PushNotificationSaga'

// start the daemons
export default [
  watchLoginAttempt,
  watchLocationRequest,
  watchJsonRequest,
  watchSaveProfile,
  watchSaveEmergency,
  watchSaveToken,
  watchDirectionRequest,
  watchReceiveNotification,
  watchUpdateLocationAndSaveEmergengy,
]
