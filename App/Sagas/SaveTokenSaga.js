import Client from '../Services/HttpClient'
import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import config from '../Config/AppSetting'
import {Platform} from 'react-native'

export function * saveToken (token, profileId) {
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
          deviceType: token.os,
          pushType: Platform.OS === 'android' ? 'gcm' : null,
          GCMSenderId: Platform.OS === 'android' ? '395124388701' : null,
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
          deviceType: token.os,
          deviceToken: token.token,
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
    while(true){  
      const {token, profileId} = yield take(Types.SAVE_TOKEN)
      try{
        const ok = yield call(saveToken, token, profileId)
        yield put(Actions.saveTokenSuccess(ok)) 
      }
      catch(error){
     	  yield put(Actions.saveTokenFailure(error.message))
     }
 }
}
