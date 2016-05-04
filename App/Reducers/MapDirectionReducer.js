

import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import createReducer from './CreateReducer'

export const INITIAL_STATE = Immutable({
	desAddress: null,
	//srcAddress: null,
	fetching:  null,
	errorCode: null,
})

const directionRequest = (state, action) => 
	state.merge({
		desAddress: action.desAddress,
		//srcAddress: action.srcAddress,
		fetching:  true,
		errorCode: null,
	})

const directionReceive = (state, action) => 
	state.merge({
		fetching:  false,
		errorCode: null,		
	})

const directionFailure = (state, action) => 
	state.merge({
		fetching:  false,
		errorCode: action.error,			
	})

const ACTION_HANDLERS = {
	[Types.MAP_DIRECTION_REQUEST]: directionRequest,
	[Types.MAP_DIRECTION_RECEIVE]: directionReceive,
	[Types.MAP_DIRECTION_FAILURE]: directionFailure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
