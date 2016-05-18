import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import createReducer from './CreateReducer'

export const INITIAL_STATE = Immutable({
  profile: null,
  saved: false,
  error: null,
  errorCode: null,
  ok: null,
  city: null
})

const save = (state, action) =>
  state.merge({
    profile: action.profile,
    saved: true,
    city: action.profile.city
  })

const success = (state, action) =>
  state.merge({
  	error:false,
    ok: action.ok
  })

const failure = (state, action) =>
  state.merge({
  	error: true,
  	errorCode: action.error
  })
  
 const ACTION_HANDLERS = {
  [Types.SAVE_PROFILE]: save,
  [Types.SAVE_PROFILE_FAILURE]: failure,
  [Types.SAVE_PROFILE_SUCCCESS]: success
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)

