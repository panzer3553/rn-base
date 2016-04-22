import Client from '../Services/HttpClient'
import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'

function * saveToken (token) {
  return fetch('https://api.parse.com/1/installations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'htqpp4xRds01PrnaGs6IuNpp5LnEdmyQ3iTVglvX',
        'X-Parse-REST-API-Key': 'M6D4OV9Dd12hfOnaknCh3BNSnUk0AXBA6nk57OnH'
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
