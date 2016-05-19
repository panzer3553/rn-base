import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import createReducer from './CreateReducer'

export const INITIAL_STATE = Immutable({
	data: null,
})

const receive = (state, action) =>
	state.merge({
	  data: action.data
	})

const ACTION_HANDLERS = {
	[Types.RECEIVE_EMERGENCY]: receive
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)