import { take, call, put, select } from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import config from '../Config/AppSetting'

export function * uploadImage (img) {
  return fetch(config.URL + 'files/' + 'picture.jpg', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'Image/jpeg',
      'X-Parse-Application-Id': config.PARSE_ID,
      'X-Parse-REST-API-Key': config.PARSE_API_KEY,
    },
    body: JSON.stringify({ base64: img.data })
  }).then(response => response.json())
}

export function * saveImageLink (fileName) {
  return fetch(config.URL + 'classes/Image', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': config.PARSE_ID,
      'X-Parse-REST-API-Key': config.PARSE_API_KEY,
    },
    body: JSON.stringify({  
      isStatic: true,
      file: {
        '__type': 'File',
        'name': fileName
      }
    })
  }).then(response => response.json())
}

export function * watchUploadImage () {
  while (true) {
  	const {data} = yield take(Types.UPLOAD_IMAGE)
    yield call(uploadImage, data)
   	try {
  		const ok = yield call(uploadImage, data)
  		if (ok) {
        console.log('OK' + JSON.stringify(ok))
        yield call(saveImageLink, ok.name)
  			yield put(Actions.UPLOAD_IMAGE_SUCCESS)
  		}
  	}
  	catch (error) {
		  yield put(Actions.UPLOAD_IMAGE_FAILURE, error)
  	}
  }
}
