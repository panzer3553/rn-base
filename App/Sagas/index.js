import { fork } from 'redux-saga/effects'
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
import { watchReceiveNotification } from './PushNotificationSaga'
import { watchUploadImage } from './UploadImageSaga'
import {watchFetchImages} from './FetchImagesSaga'
// start the daemons
export default function * root() {
  yield fork(watchLoginAttempt),
  yield fork(watchLocationRequest),
  yield fork(watchJsonRequest),
  yield fork(watchSaveProfile),
  yield fork(watchSaveEmergency),
  yield fork(watchSaveToken),
  yield fork(watchReceiveNotification),
  yield fork(watchUpdateLocationAndSaveEmergengy),
  yield fork(watchUploadImage),
  yield fork(watchFetchImages)
}
