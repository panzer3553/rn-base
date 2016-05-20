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
        var i = 0;
        var urlArray = [];
        for (i; i < ok.images.length; i++) {
          const okImage =  yield call(getFromServer, 'classes/ImageCollection/' + ok.images[i].objectId)
          if (okImage) {
            urlArray = [...urlArray, okImage.url.url]
          }
        }
  	  	yield put(Actions.getEmergencyByIdSuccess(urlArray))
  	  }
    }
    catch (error) {
	    yield put(Actions.getEmergencyByIdFailure(error))
    }
  }
}