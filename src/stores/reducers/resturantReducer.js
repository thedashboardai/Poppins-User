import {
  ERROR,
  GET_ALL_MERCHANT_PROCESSED,
  GET_ALL_MERCHANT_PROCESSING
} from '../constants'

const initialState = {
  isLoading: false,
  resturants: null
}

export const resturant = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case GET_ALL_MERCHANT_PROCESSING:
      return {
        ...state,
        isLoading: true
      }
    case GET_ALL_MERCHANT_PROCESSED:
      return {
        ...state,
        isLoading: false,
        resturants: payload.payload
      }
    case ERROR:
      return {
        isLoading: false
      }
    default:
      return state
  }
}
