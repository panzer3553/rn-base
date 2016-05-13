import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import createReducer from './CreateReducer'

export const INITIAL_STATE = Immutable({
	data: null,
	error: null
})

const upload = (state, action) =>
	state.merge({
		data: action.data
	})

const success = (state, action) =>
	state.merge({
	})

const failure = (state, action) =>
	state.merge({
		error: action.error
	})

const ACTION_HANDLERS = {
	[Types.UPLOAD_IMAGE]: upload,
	[Types.UPLOAD_IMAGE_SUCCESS]: success,
	[Types.UPLOAD_IMAGE_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)