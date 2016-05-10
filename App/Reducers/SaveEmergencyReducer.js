import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import createReducer from './CreateReducer'

export const INITIAL_STATE = Immutable({
  emergency: null,
  saved: false,
  error: null,
  errorCode: null,
  ok: null
})

const save = (state, action) =>
  state.merge({
    emergency: action.emergency,
    saved: true
  })

const success = (state, action) =>
  state.merge({
  	error:false,
    ok: action.ok,
    errorCode: null
  })

const failure = (state, action) =>
  state.merge({
  	error: true,
  	errorCode: action.error
  })
  
const ACTION_HANDLERS = {
  [Types.SAVE_EMERGENCY]: save,
  [Types.SAVE_EMERGENCY_SUCCCESS]: success,
  [Types.SAVE_EMERGENCY_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)