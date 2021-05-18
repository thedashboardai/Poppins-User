/* eslint-disable no-console */
import { Alert } from 'react-native'
import { getApi } from '../../api/fakeApiUser'
import base_url from '../../constants/base_url'
import {
  GET_ALL_MERCHANT_PROCESSING,
  GET_ALL_MERCHANT_PROCESSED,
  ERROR
} from '../constants'

export const getAllMerchant = user => {
  return async (dispatch, getState) => {
    const { authToken, userId } = getState().userReducer
    try {
      dispatch({ type: GET_ALL_MERCHANT_PROCESSING })
      let { data } = await getApi(
        `${base_url}/merchants/get_all_merchants`,
        '',
        authToken
      )

      console.log(' getAllMerchant response', data)

      if (data.code == 200) {
        dispatch({ type: GET_ALL_MERCHANT_PROCESSED, payload: data })
        return Promise.resolve({ status: true })
      } else {
        Alert.alert('error', data.message)
        return Promise.resolve({ status: false })
      }
    } catch ({ message }) {
      dispatch({ type: ERROR })
      console.log(message)
      // return Promise.reject({ status: false, message })
    }
  }
}
