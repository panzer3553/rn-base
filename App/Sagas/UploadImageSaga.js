import { take, call, put, select } from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import config from '../Config/AppSetting'

export function * saveToServer (path, _method, _body) {
  return fetch(config.URL + path, 
  {
    method: _method,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': config.PARSE_ID,
        'X-Parse-REST-API-Key': config.PARSE_API_KEY
    },
    body: JSON.stringify(_body)
  }).then(response => response.json())

}

export function * getFromServer (path, _method) {
  return fetch(config.URL + path, 
  {
    method: _method,
    headers: {
        'X-Parse-Application-Id': config.PARSE_ID,
        'X-Parse-REST-API-Key': config.PARSE_API_KEY
    }
  }).then(response => response.json())

}

export function * watchUploadImage () {
  while (true) {
  	const {data, emergencyObjectId} = yield take(Types.UPLOAD_IMAGE)
   	try {
        const uploadBody = {base64: data.data}
        const ok = yield call(saveToServer, 'files/' + 'picture.jpg', 'POST', uploadBody)
        if (ok) {
          //console.log('OK' + JSON.stringify(ok))
          const imageCollectionBody = {
            emergencyId: {
                __type: "Pointer",
                className: "Emergency",
                objectId: emergencyObjectId
            },
            url: {
              __type: 'File',
              name: ok.name 
            }
          }
          const resSaveUrl = yield call(saveToServer, 'classes/ImageCollection', 'POST', imageCollectionBody)
          //console.log(resSaveUrl.objectId)
          if (resSaveUrl) {
            const updateEmergencyBody = {
              images: {
                  __op: "Add",
                  objects: [
                      {
                          __type: "Pointer",
                          className: "ImageCollection",
                          objectId: resSaveUrl.objectId
                      }
                  ]
              }
            }
            const resUpdateEmergency = yield call( saveToServer, 'classes/Emergency/' + emergencyObjectId,'PUT', updateEmergencyBody)
            //console.log(resUpdateEmergency)
            const resGetImageCollectionId = yield call(getFromServer, 'classes/Emergency/' + emergencyObjectId, 'GET') 
            console.log('TEST:' + JSON.stringify(resGetImageCollectionId))
          }
        } 
  	}
  	catch (error) {
		  yield put(Actions.UPLOAD_IMAGE_FAILURE, error)
  	}
    
    
  }
}
