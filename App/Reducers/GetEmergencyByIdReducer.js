import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import createReducer from './CreateReducer'

export const INITIAL_STATE = Immutable({
	imagesInfo: null,
	emergencyId: null,
	error: null
})

const get = (state, action) =>
	state.merge({
	  emergencyId: action.emergencyId
	})

const success = (state, action) =>
	state.merge({
	  imageUrls: [...imagesInfo]
	})

const failure = (state, action) =>
	state.merge({
	  error: action.error
	})

const ACTION_HANDLERS = {
	[Types.UPLOAD_IMAGE]: get,
	[Types.UPLOAD_IMAGE_SUCCESS]: success,
	[Types.UPLOAD_IMAGE_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)