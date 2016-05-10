import { take, put, select } from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import config from '../Config/AppSetting'

export function * uploadImage (data) {
	return fetch(config.url + 'classes/Image/', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'image/png',
			'X-Parse-Application-Id': config.parse_id,
			'X-Parse-REST-API-Key': config.parse_api_key,
		},
		body: JSON.stringify({ data: data })
	}).then(response => response.json())
}

export function * watchUploadImage () {
  while (true) {
  	const {data} = yield take(Types.UPLOAD_IMAGE)
  	console.log('Data:' + data)
  	try {
  		const ok =  yield call(uploadImage, data)
  		if (ok) {
  			yield put(Types.UPLOAD_IMAGE_SUCCESS)
  		}
  	}
  	catch (error) {
		yield put(Types.UPLOAD_IMAGE_FAILURE, error)
  	}
  }
}
