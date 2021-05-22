/* eslint-disable no-console */
import { Alert } from 'react-native'
import { getUser, postApi, getApi } from '../../api/fakeApiUser'
import base_url from '../../constants/base_url'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ERROR } from '../constants'
export const fetchUserRequest = () => {
  return {
    type: 'FETCH_USER_REQUEST'
  }
}

export const fetchUserSuccess = users => {
  return {
    type: 'FETCH_USER_SUCCESS',
    payload: users
  }
}

export const fetchItemDetails = ItemDetails => {
  return {
    type: 'FETCH_ITEM_DETAILS',
    payload: ItemDetails
  }
}

export const setUserLocation = location => {
  return {
    type: 'SET_LOCATION',
    payload: location
  }
}

export const fetchUserFail = () => {
  return {
    type: 'FETCH_USER_FAILED'
  }
}

export const fetchDataUser = () => async dispatch => {
  try {
    dispatch(fetchUserRequest())
    const { data } = await getUser()
    dispatch(fetchUserSuccess(data))
  } catch (error) {
    dispatch(fetchUserFail())
  }
}

export const userRegister = user => {
  return async dispatch => {
    try {
      dispatch({ type: 'USER_REGISTER_PROCESSING' })
      let { data } = await postApi(`${base_url}/users/create_user`, user)

      console.log('user Registration response', data)

      if (data.code == 200) {
        Alert.alert('Success', 'User Registerd Successfully')
        return Promise.resolve({ status: true })
        // NavigationSer.navigate("SignIn")
      } else {
        Alert.alert('error', data.message)
        return Promise.resolve({ status: false })
      }
    } catch ({ message }) {
      console.log('registration Error', message)
      return Promise.reject({ status: false, message })
    }
  }
}

export const userLogin = user => {
  return async dispatch => {
    try {
      dispatch({ type: 'FETCHING' })
      let { data } = await postApi(`${base_url}/users/login_user`, user)

      if (data.code == 200) {
        dispatch({ type: 'FETCH_USER_SUCCESS', payload: data })
        console.log('user userLogin response', data)
        return Promise.resolve({ status: true })
        // NavigationSer.navigate("SignIn")
      } else {
        Alert.alert('error', data.message)
        dispatch({ type: ERROR })
        return Promise.resolve({ status: false })
      }
    } catch ({ message }) {
      console.log('registration Error', message)
      dispatch({ type: 'CLEAR_PROCESSING' })
      return Promise.reject({ status: false, message })
    }
  }
}

export const forgetPass = obj => {
  return async dispatch => {
    try {
      dispatch({ type: 'FETCHING' })
      let { data } = await postApi(`${base_url}/users/forgot_password`, obj)
      const { payload } = data
      if (data.code == 200) {
        payload.email = obj.email
        dispatch({ type: 'FETCHED_RESET_PASS_TOKEN', payload: payload })
        return Promise.resolve({ status: true })
      } else {
        Alert.alert('error', data.message)
        dispatch({ type: ERROR })
        return Promise.resolve({ status: false })
      }
    } catch ({ message }) {
      dispatch({ type: ERROR })
      Alert.alert('error', message)
      return Promise.reject({ status: false, message })
    }
  }
}

export const changePass = (obj, authToken) => {
  return async dispatch => {
    let { data } = await getApi(
      `${base_url}/users/validate_reset_pw_token/`,
      authToken,
      authToken
    )
    console.log('isValid validate_reset_pw_token', data)

    if (data.code == 200) {
      try {
        dispatch({ type: 'FETCHING' })
        let { data } = await postApi(
          `${base_url}/users/change_password`,
          obj,
          authToken
        )
        console.log('data changePass', data)
        if (data.code == 200) {
          // Alert.alert("Alert", "Password changed successfully")
          return Promise.resolve({ status: true })
        } else {
          Alert.alert('Error', data.message)
          dispatch({ type: ERROR })
          return Promise.resolve({ status: false })
        }
      } catch ({ message }) {
        dispatch({ type: ERROR })
        Alert.alert('error', message)
        return Promise.reject({ status: false, message })
      }
    } else {
      Alert.alert('Error', data.message)
      return Promise.reject({ status: false })
    }
  }
}

export const updateProfile = obj => {
  return async function (dispatch, getState) {
    const { authToken, userId } = getState().userReducer
    dispatch({ type: 'FETCHING' })
    try {
      let { data } = await postApi(
        `${base_url}/users/update_user/${userId}`,
        obj,
        authToken
      )
      if (data.code == 200) {
        dispatch({ type: 'UPDATED_PROFILE_SUCCESS', payload: data })
        return Promise.resolve({ status: true })
      } else {
        dispatch({ type: ERROR })
        Alert.alert('error', data.message)
        return Promise.resolve({ status: false })
      }
    } catch ({ message }) {
      dispatch({ type: ERROR })
      Alert.alert('error', message)
      return Promise.reject({ status: false, message })
    }
  }
}

export const logout = () => {
  return async function (dispatch) {
    await AsyncStorage.clear()
    dispatch({ type: 'LOGOUT_REQUEST' })
    return Promise.resolve({ status: true })
  }
}
