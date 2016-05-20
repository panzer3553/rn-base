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
  	const {data, emergencyId, selectedImages} = yield take(Types.UPLOAD_IMAGE)
    console.log('ARRAY' + selectedImages)
    var i = 0
    for (i = 0; i < data.length; i++ ) {

      if (!selectedImages[i]) continue // NOT upload unselected image

      try {
          const uploadBody = {base64: data[i].base64, width: data[i].width, height: data[i].height}
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
            }
          } 
    	}
    	catch (error) {
  		  yield put(Actions.uploadImageFailure(error))
    	}

      yield put(Actions.uploadImageSuccess())
    }
    
  }
}
