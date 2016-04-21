import Client from '../Services/HttpClient'
import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'

function * saveProfile (profile) {
  return fetch('https://api.parse.com/1/classes/Profile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'htqpp4xRds01PrnaGs6IuNpp5LnEdmyQ3iTVglvX',
        'X-Parse-REST-API-Key': 'M6D4OV9Dd12hfOnaknCh3BNSnUk0AXBA6nk57OnH'
      },
      body: JSON.stringify(
        profile
      )
	}).then(response => response.json())
}

export function * watchSaveProfile () {
    const {profile} = yield take(Types.SAVE_PROFILE)
    const ok = yield call(saveProfile, profile)
    if(error){
    	yield put(Actions.saveProfileFailure(error))
    }
    else{
   		yield put(Actions.saveProfileSuccess(ok)) 
	}
}
