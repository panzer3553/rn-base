import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import createReducer from './CreateReducer'

export const INITIAL_STATE = Immutable({
  firstLoad: true,
})

// login attempts
const skip = (state, action) =>
  state.merge({ firstLoad: false })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.SKIP_SWIPER]: skip,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)