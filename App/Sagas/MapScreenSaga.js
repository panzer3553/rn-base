import Client from '../Services/HttpClient'
import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import I18n from '../I18n/I18n.js'
import React from 'react-native'
import Linking from 'Linking'


var API_KEY 	= 'AIzaSyA5tP4bdbtsuyicrzzsZkoZ9gmxRovDiMc';
var OUTPUT_TYPE = 'json'; // 'xml';
var DEBUG_TAG 	= 'MAP_SCREEN_SAGA';

function userPositionPromised() {

  const position = {}
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition (
      location  => position.on({location}),
      error     => position.on({error}),
      { enableHighAccuracy: true }
    )
  }

  return { getLocation: () => new Promise(location => position.on = location) }
}

export function * getUserLocation() {

  const { getLocation } = yield call(userPositionPromised)
  const { error, location } = yield call(getLocation)

  if (error) {
    yield put(Actions.receiveLocationFailure(error))
  } 
  else {
    yield put(Actions.receiveLocation(location.coords.latitude, location.coords.longitude))
  }
}

export function * getLocationInfo (_latitude, _longitude, _output) {

	const strUrl 		= 'http://maps.google.com/maps/api/geocode/' + 
                     _output + 
                     '?latlng=' + 
                     _latitude + ',' + _longitude + 
                     '&sensor=true' +
                     '&language=en;'
  console.log(strUrl)
	const client 	= Client({ baseUrl: strUrl});
	const response 	= yield call (client.get);

	const { ok, json } = response;
	if (ok) {
    yield put(Actions.receiveJsonByCoords(json.results[0]))   
	}
	else {
    const error = 'Please check your internet connection | link!'
    yield put(Actions.receiveJsonByCoordsFailure(error))
	}

}


export function * watchLocationRequest () {

	while (true) {
		const action = yield take (Types.MAP_LOCATION_REQUEST)
		yield call(getUserLocation)
	}
}

export function * watchJsonRequest () {

  while(true) {
    const { latitude,  longitude, type} = yield take(Types.MAP_JSON_REQUEST)
    yield call(getLocationInfo, latitude, longitude, OUTPUT_TYPE)
  }
}



