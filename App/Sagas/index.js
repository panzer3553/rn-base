import { watchStartup } from './StartupSaga'
import { watchLoginAttempt } from './LoginSaga'
import { 
	watchLocationRequest, 
	watchJsonRequest, 
	watchUpdateLocationAndSaveEmergengy,
} from './MapScreenSaga'
import { watchSaveProfile } from './SaveProfileSaga'
import { watchSaveEmergency} from './SaveEmergencySaga'
import { watchSaveToken } from './SaveTokenSaga'
import { watchDirectionRequest } from './MapDirectionSaga'
import { watchReceiveNotification } from './PushNotificationSaga'
import { watchUploadImage } from './UploadImageSaga'

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
  watchUploadImage,
]
