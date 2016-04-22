import Client from '../Services/HttpClient'
import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import config from '../Config/AppSetting'

function * saveToken (token) {
  return fetch(config.url + 'installations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': config.parse_id,
        'X-Parse-REST-API-Key': config.parse_api_key
      },
      body: JSON.stringify({
        deviceToken: token.token,
        deviceType: token.os,
  })
	}).then(response => response.json())
}

export function * watchSaveToken() {
    while(true){  
      const {token} = yield take(Types.SAVE_TOKEN)
      const {ok, error} = yield call(saveToken, token)
      if(error){
        yield put(Actions.saveTokenFailure(error))
      }
      else{
     	  yield put(Actions.saveTokenSuccess(ok)) 
     }
 }
}
