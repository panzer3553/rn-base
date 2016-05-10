import Client from '../Services/HttpClient'
import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import config from '../Config/AppSetting'

function * saveEmergency (emergency) {
  return fetch(config.URL + 'classes/Emergency', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': config.PARSE_ID,
      'X-Parse-REST-API-Key': config.PARSE_API_KEY
    },
    body: JSON.stringify(
      emergency
    )
	}).then(response => response.json())
}

export function * watchSaveEmergency() {
  while(true){  
    const {emergency} = yield take(Types.SAVE_EMERGENCY)
    try{
      const ok = yield call(saveEmergency, emergency)
      yield put(Actions.saveEmergencySuccess(ok)) 
    }catch(e){
      yield put(Actions.saveEmergencyFailure(e.message))
    }
  }
}
