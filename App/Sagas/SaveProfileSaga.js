import Client from '../Services/HttpClient'
import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import config from '../Config/AppSetting'
const STORAGE_KEY_PROFILE = "PROFILE_ID"
const STORAGE_KEY_TOKEN = "TOKEN_ID"
import {AsyncStorage} from 'react-native'

function * saveProfile (profile, objectId) {
  if(objectId){
    return fetch(config.url + 'classes/Profile/' + objectId, {
      method: 'PUT',
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

export function saveToken (token, profileId) {
  if(profileId == null){
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
        deviceType: token.os    
      })
    }).then(response => response.json())
  }else{
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
        profile: {
          __type: 'Pointer',
          className: 'Profile',
          objectId: profileId
        }
      })
    }).then(response => response.json())
  }
}

export function * watchSaveProfile () {
  while(true){
    const { profile, objectId } = yield take(Types.SAVE_PROFILE)
    try{
      if(objectId){
        const ok = yield call(saveProfile, profile, objectId)
        console.log(ok)
        yield put(Actions.saveProfileSuccess()) 
      }else{
        const ok = yield call(saveProfile, profile)
        AsyncStorage.setItem(STORAGE_KEY_PROFILE, ok.objectId)
        yield put(Actions.saveProfileSuccess()) 
        AsyncStorage.getItem(STORAGE_KEY_TOKEN).then((value) => {
          if (value !== null)
            saveToken(JSON.parse(value), ok.objectId)
          else 
            console.log("failed")
        })
      }
    }catch(error){
      yield put(Actions.saveProfileFailure(error.message))
    }
	}
}

