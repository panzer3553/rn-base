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

export function * getFromServer (path) {
  return fetch(config.URL + path, 
  {
    method: 'GET',
    headers: {
        'X-Parse-Application-Id': config.PARSE_ID,
        'X-Parse-REST-API-Key': config.PARSE_API_KEY
    }
  }).then(response => response.json())

}

export function * watchUploadImage () {
  while (true) {
  	const {data, emergencyId} = yield take(Types.UPLOAD_IMAGE)
   	try {
        const uploadBody = {base64: data.data}
        const ok = yield call(saveToServer, 'files/' + 'picture.jpg', 'POST', uploadBody)
        if (ok) {
          const imageCollectionBody = {
            emergencyId: {
                __type: "Pointer",
                className: "Emergency",
                objectId: emergencyId
            },
            url: {
              __type: 'File',
              name: ok.name 
            }
          }

          const resSaveUrl = yield call(saveToServer, 'classes/ImageCollection', 'POST', imageCollectionBody)
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

            const resUpdateEmergency = yield call( saveToServer, 'classes/Emergency/' + emergencyId,'PUT', updateEmergencyBody)
            //const resGetImageCollectionId = yield call(getFromServer, 'classes/Emergency/' + emergencyId) 
            // if (resGetImageCollectionId) {
            //   console.log(resGetImageCollectionId.images[0])
            //   const resGetImage = yield call(getFromServer, 'classes/ImageCollection/' + resGetImageCollectionId.images[0].objectId, 'GET')
            //   console.log('URL:' + resGetImage.url.url)
            // }
          }
        } 
  	}
  	catch (error) {
		  yield put(Actions.UPLOAD_IMAGE_FAILUREe, error)
  	}
    
  }


}
