import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import createReducer from './CreateReducer'

export const INITIAL_STATE = Immutable({
	fetch: false,
	imageLinks: null,
	error: false
})

const get = (state, action) =>
	state.merge({
	  fetch: true
	})

const success = (state, action) =>
	state.merge({
	  imageLinks: action.links
	})

const failure = (state, action) =>
	state.merge({
	  error: true
	})

const ACTION_HANDLERS = {
	[Types.FETCH_IMAGES]: get,
	[Types.FETCH_IMAGES_SUCCESS]: success,
	[Types.FETCH_IMAGES_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)