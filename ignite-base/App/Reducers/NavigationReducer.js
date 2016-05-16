import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import createReducer from './CreateReducer'

export const INITIAL_STATE = Immutable({
  tab: 'home',
})

const navigate = (state, action) =>
  state.merge({ tab: action.tab })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.NAVIGATION]: navigate,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
