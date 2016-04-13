import Client from '../Services/HttpClient'
import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'

import I18n from '../I18n/I18n.js'
import React from 'react-native'
import BackgroundGeoLocation from 'react-native-background-geolocation'


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
    yield put(Actions.receiveLocationFailure())
  } 
  else {
    yield put(Actions.receiveLocation(location.coords.latitude, location.coords.longitude))
  }
}

export function * getLocationInfo (_latitude, _longitude, _output = OUTPUT_TYPE) {

	var strUrl 		= 'http://maps.googleapis.com/maps/api/geocode/';
	strURL 		   += OUTPUT_TYPE + '?latlng=' + _latitude + ',' + _longitude + '&sensor=true;';

	const client 	= Client({ baseUrl: strURL});
	const response 	= yield call (client.get);

	const { ok, json } = response;
	if (ok) {
		//console.log(DEBUG_TAG + ' getLocationInfo OK');
	}
	else {
		//console.log(DEBUG_TAG + ' getLocationInfo FAILURE');
	}

}


export function * watchLocationRequest () {


	while (true) {
		const action = yield take (Types.MAP_LOCATION_REQUEST)
		yield call(getUserLocation)
	}
}