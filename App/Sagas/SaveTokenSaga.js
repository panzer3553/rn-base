import Client from '../Services/HttpClient'
import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import config from '../Config/AppSetting'
import {Platform} from 'react-native'

export function * saveToken (token, profileId) {
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
          pushType: Platform.OS === 'android' ? 'gcm' : undefined,
          GCMSenderId: Platform.OS === 'android' ? '395124388701' : undefined            
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
          deviceType: token.os,
          deviceToken: token.token,
          deviceType: token.os,
          pushType: Platform.OS === 'android' ? 'gcm' : undefined,
          GCMSenderId: Platform.OS === 'android' ? '395124388701' : undefined,      
          profile: {
            __type: 'Pointer',
            className: 'Profile',
            objectId: profileId
        }
      })
    }).then(response => response.json())
  }
}

export function * watchSaveToken() {
  while(true) {  
    const {token, profileId} = yield take(Types.SAVE_TOKEN)
    try {
      const ok = yield call(saveToken, token, profileId)
      yield put(Actions.saveTokenSuccess(ok)) 
    }
    catch(error) {
     	yield put(Actions.saveTokenFailure(error.message))
    }
  }
}
