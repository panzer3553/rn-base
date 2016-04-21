

import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import createReducer from './CreateReducer'

export const INITIAL_STATE = Immutable({
	latitude:  null,
	longitude: null,
	fetching:  null,
	errorCode: null,
})

const request= (state, action) => 
	state.merge({
		fetching: true,
		latitude: action.latitude,
		longitude: action.longitude,
	})

const receive = (state, action) =>
	state.merge({
		fetching: false,
		latitude: action.latitude,
		longitude: action.longitude,
		errorCode: null,
	})

const failure = (state, action) =>
	state.merge({
		fetching: 	false,
		latitude: 	null,
		longitude: 	null,
		errorCode: 	true,
	})

const ACTION_HANDLERS = {
	[Types.MAP_LOCATION_REQUEST]: request,
	[Types.MAP_LOCATION_RECEIVE]: receive,
	[Types.MAP_LOCATION_FAILURE]: failure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
