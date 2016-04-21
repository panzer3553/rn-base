import Client from '../Services/HttpClient'
import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'

function * saveEmergency (emergency) {
  return fetch('https://api.parse.com/1/classes/Emergency', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'htqpp4xRds01PrnaGs6IuNpp5LnEdmyQ3iTVglvX',
        'X-Parse-REST-API-Key': 'M6D4OV9Dd12hfOnaknCh3BNSnUk0AXBA6nk57OnH'
      },
      body: JSON.stringify(
        emergency
      )
	}).then(response => response.json())
}

export function * watchSaveEmergency() {
    while(true){  
      const {emergency} = yield take(Types.SAVE_EMERGENCY)
      const {ok, error} = yield call(saveEmergency, emergency)
      if(error){
        yield put(Actions.saveEmergencyFailure(error))
      }
      else{
     	  yield put(Actions.saveEmergencySuccess(ok)) 
     }
 }
}
