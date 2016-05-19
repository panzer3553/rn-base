import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import config from '../Config/AppSetting'

function postForm(form) {
  var formData = new FormData();

  for (var k in form) {
      formData.append(k, form[k]);
  }
  return formData
}

function * fetchImages (id) {
  return fetch(config.URL + 'classes/Emergency/ISnEIfvxAo',{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': config.PARSE_ID,
      'X-Parse-REST-API-Key': config.PARSE_API_KEY
    },
    data: '"include":"images"'
	}).then(response => response.json())
}

export function * watchFetchImages() {
  while(true){  
    const {id} = yield take(Types.FETCH_IMAGES)
    try{
      const links = yield call(fetchImages, id)
      yield put(Actions.fetchImagesSuccess(links)) 
    }catch(e){
      yield put(Actions.fetchImagesFailure(e.message))
    }
  }
}