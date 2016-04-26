import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import I18n from '../I18n/I18n.js'
import Linking from 'Linking'
import React, {
	Platform,
} from 'react-native'


function showDirectionPromised(url) {

  	const direction 	= {}

    Linking.canOpenURL(url).then(
    	supported => direction.on({ supported })  
	).catch(
		err => direction.on({ err }) 
	)

	return { showDirection: () => new Promise( supported => direction.on = supported) }
}

export function * showDirectionOnMap (desAddress, srcAddress, mode) {

	const baseUrl 		= (Platform.OS === 'ios') ? 'http://maps.apple.com/?' : 'http://maps.google.com/maps?'
    const directionUrl 	= baseUrl + 'saddr=' + srcAddress + '&daddr=' + desAddress + '&' + mode

	const { showDirection }  = yield call(showDirectionPromised, directionUrl)
	const { err, supported } = yield call(showDirection)

	if (supported) {
		yield put(Actions.receiveDirection())
		Linking.openURL(directionUrl)
	} 
	else if (err) {
		yield put(Actions.receiveDirectionFailure, error)
	}
	else {
		const formatError = 'Don\'t know how to go'
		yield put(Actions.receiveDirectionFailure, formatError)
	}
}

export function * watchDirectionRequest () {
	while (true) {
		const { desAddress, srcAddress, mode } = yield take(Types.MAP_DIRECTION_REQUEST)
		yield call(showDirectionOnMap, desAddress, srcAddress, mode)
	}
}
