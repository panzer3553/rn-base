import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import createReducer from './CreateReducer'

export const INITIAL_STATE = Immutable({
  token: null,
  saved: false,
  error: null,
  errorCode: null,
  ok: null,
  profileId: null
})

const save = (state, action) =>
  state.merge({
    token: action.token,
    saved: true,
    profileId: action.profileId,
  })

const success = (state, action) =>
  state.merge({
    ok: action.ok,
  	error:false,
    errorCode: null,
  })

const failure = (state, action) =>
  state.merge({
  	error: true,
  	errorCode: action.error
  })
  
 const ACTION_HANDLERS = {
  [Types.SAVE_TOKEN]: save,
  [Types.SAVE_TOKEN_SUCCCESS]: success,
  [Types.SAVE_TOKEN_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)