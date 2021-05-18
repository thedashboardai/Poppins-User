//example api request: replace with your API request here in folder API
import axios from 'axios'

export const getUser = () => {
  try {
    return Promise.resolve({
      status: 'success',
      data: [
        { id: 1, name: 'Fira' },
        { id: 2, name: 'Nadia' },
        { id: 3, name: 'Handy' },
        { id: 4, name: 'Fakara' }
      ]
    })
  } catch (e) {
    return Promise.reject(e)
  }
}


export const getApi = async (url, data, token) => {
  try {
    let response = await axios.get(url + data, {
      headers: {
        "Accept": "application/json",
        'Authorization': `Bearer ${token}`, 
      }
    })
    console.log(response, "response")
    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data
      })
    }
  } catch (e) {
    return Promise.reject(e)
  }
}

export const postApi = async (url, data, auth) => {
  console.log(url, data)
  try {
    let response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': `Bearer ${auth}`, 
      }
    })
    console.log(response, "response")
    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data
      })
    }
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports = {
  getUser,
  postApi,
  getApi
}