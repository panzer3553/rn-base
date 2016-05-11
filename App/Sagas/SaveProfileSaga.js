import Client from '../Services/HttpClient'
import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import config from '../Config/AppSetting'
import {AsyncStorage, Platform} from 'react-native'

function * saveProfile (profile, objectId) {
  if(objectId) {
    return fetch(config.URL + 'classes/Profile/' + objectId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': config.PARSE_ID,
        'X-Parse-REST-API-Key': config.PARSE_API_KEY
      },
      body: JSON.stringify(
        profile
      )
    }).then(response => response.json())
  }
  return fetch(config.URL + 'classes/Profile', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': config.PARSE_ID,
      'X-Parse-REST-API-Key': config.PARSE_API_KEY
    },
    body: JSON.stringify(
      profile
    )
	}).then(response => response.json())
}

export function saveToken (token, profileId) {
  if(profileId == null) {
    return fetch(config.URL + 'installations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': config.PARSE_ID,
        'X-Parse-REST-API-Key': config.PARSE_API_KEY
      },
      body: JSON.stringify({
        deviceToken: token.token,
        deviceType: token.os,
        pushType: Platform.OS === 'android' ? config.PUSH_TYPE : null,
        GCMSenderId: Platform.OS === 'android' ? config.PARSE_CLOUD_GCD_SENDER_ID : null        
      })
    }).then(response => response.json())
  }
  else {
    return fetch(config.URL + 'installations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': config.PARSE_ID,
        'X-Parse-REST-API-Key': config.PARSE_API_KEY
      },
      body: JSON.stringify({
        deviceToken: token.token,
        deviceType: token.os,
        pushType: Platform.OS === 'android' ? config.PUSH_TYPE : null,
        GCMSenderId: Platform.OS === 'android' ? config.PARSE_CLOUD_GCD_SENDER_ID : null,      
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
  while(true) {
    const { profile, objectId } = yield take(Types.SAVE_PROFILE)
    try {
      if(objectId) {
        const ok = yield call(saveProfile, profile, objectId)
        yield put(Actions.saveProfileSuccess()) 
      }
      else {
        const ok = yield call(saveProfile, profile)
        AsyncStorage.setItem(config.STORAGE_KEY_PROFILE, ok.objectId)
        yield put(Actions.saveProfileSuccess()) 

        AsyncStorage.getItem(config.STORAGE_KEY_TOKEN).then((value) => {
          if (value !== null)
            saveToken(JSON.parse(value), ok.objectId)
          else 
            console.log('failed')
        })
      }
    }
    catch(error) {
      yield put(Actions.saveProfileFailure(error.message))
    }
	}
}

