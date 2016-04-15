

import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import createReducer from './CreateReducer'

export const INITIAL_STATE = Immutable({
	latitude:  null,
	longitude: null,
	fetching:  null,
	errorCode: null,
	json: null,
})

const request= (state, action) => 
	state.merge({
		fetching: true,
		latitude: action.latitude,
		longitude: action.longitude,
		json: null,
	})

const receive = (state, action) =>
	state.merge({
		fetching: false,
		latitude: action.latitude,
		longitude: action.longitude,
		errorCode: null,
		json: action.json,
	})

const failure = (state, action) =>
	state.merge({
		fetching: 	false,
		latitude: 	null,
		longitude: 	null,
		errorCode: 	true,
		json: null,
	})

const ACTION_HANDLERS = {
	[Types.MAP_LOCATION_REQUEST]: request,
	[Types.MAP_LOCATION_RECEIVE]: receive,
	[Types.MAP_LOCATION_FAILURE]: failure,
	[Types.MAP_JSON_REQUEST]: request,
	[Types.MAP_JSON_RECEIVE]: receive,
	[Types.MAP_JSON_FAILURE]: failure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
