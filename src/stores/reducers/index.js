import { combineReducers } from 'redux'
import userReducer from './user.reducer'
import { resturant } from './resturantReducer'
//insert another reducers here to be combined

const reducers = combineReducers({
  userReducer,
  resturant
})

export default reducers
