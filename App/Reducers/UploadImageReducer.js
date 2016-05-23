import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import createReducer from './CreateReducer'
import {Alert} from 'react-native'

export const INITIAL_STATE = Immutable({
	data: null,
	emergencyId: null,
	selectedImages: null,
	error: null
})

const upload = (state, action) =>
	state.merge({
		data: action.data,
		emergencyId: action.emergencyId,
		selectedImages: action.selectedImages
	})

const success = (state, action) => {
	Alert.alert('Upload Image', 'Upload Image Success')
}

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