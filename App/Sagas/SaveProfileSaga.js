import Client from '../Services/HttpClient'
import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import config from '../Config/AppSetting'
const STORAGE_KEY_PROFILE = "PROFILE_ID"
import {AsyncStorage} from 'react-native'

function * saveProfile (profile) {
  return fetch(config.url + 'classes/Profile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': config.parse_id,
        'X-Parse-REST-API-Key': config.parse_api_key
      },
      body: JSON.stringify(
        profile
      )
	}).then(response => response.json())
}

export function * watchSaveProfile () {
  while(true){
    const {profile} = yield take(Types.SAVE_PROFILE)
    const ok = yield call(saveProfile, profile)
    if(ok){
      AsyncStorage.setItem(STORAGE_KEY_PROFILE, ok.objectId)
   	  yield put(Actions.saveProfileSuccess(ok)) 
    }else{
      yield put(Actions.saveProfileFailure())
    }
	 }
  }

