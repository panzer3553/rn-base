import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import createReducer from './CreateReducer'

export const INITIAL_STATE = Immutable({
  profile: null,
  saved: null
})

const saveProfile = (state, action) =>
  state.merge({
    profile: action.profile,
    saved: true
  })

 const ACTION_HANDLERS = {
  [Types.SAVE_PROFILE]: saveProfile,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)

