import { take, call, put, select } from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import config from '../Config/AppSetting'


export function * getFromServer (path) {
  return fetch(config.URL + path, 
  {
    method: 'GET',
    headers: {
        'X-Parse-Application-Id': config.PARSE_ID,
        'X-Parse-REST-API-Key': config.PARSE_API_KEY
    }
  }).then(response => response.json())
}

export function * watchGetEmergencyById () {
  while(true) {
    const {emergencyId}  = yield take(Types.GET_EMERGENCY_BY_ID)
    try {
      const ok = yield call(getFromServer, 'classes/Emergency/' + emergencyId)
	  if (ok) {
	  	yield put(Actions.GET_EMERGENCY_BY_ID_SUCCESS, ok.images)
	  }
    }
    catch (error) {
	  yield put(Actions.GET_EMERGENCY_BY_ID_FAILURE, error)
    }
  }
}