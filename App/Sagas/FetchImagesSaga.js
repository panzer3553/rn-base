import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import config from '../Config/AppSetting'

function fetchImages (id) {
  return fetch(config.URL + 'classes/Emergency/' + id + '?include=images',{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': config.PARSE_ID,
      'X-Parse-REST-API-Key': config.PARSE_API_KEY
    },
	}).then(response => response.json())
}

export function * watchFetchImages() {
  while(true){  
    const {id} = yield take(Types.FETCH_IMAGES)
    try{
      const response = yield call(fetchImages, id)
      let links = null
      if(response.images){
        links = response.images.map((value, index) => value.url.url)
      }
      yield put(Actions.fetchImagesSuccess(links || [])) 
    }catch(e){
      yield put(Actions.fetchImagesFailure(e.message))
    }
  }
}