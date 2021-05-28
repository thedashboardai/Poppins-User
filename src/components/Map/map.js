/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React, { useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Alert,
  Image,
  PermissionsAndroid
} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Button from '../Button'
import MapViewDirections from 'react-native-maps-directions'
import axios from 'axios'
import { useState } from 'react'
import { useInterval } from '../../utils/useInterval'
import orderStatus from '../../constants/orderStatus'
import PushNotification from 'react-native-push-notification'
import { showNotification } from '../../..'
import { usePubNub } from 'pubnub-react'
import { useRef } from 'react'
import KeepAwake from 'react-native-keep-awake'
import Header from '../Header'
import MapboxNavigation from '@homee/react-native-mapbox-navigation'
import GetLocation from 'react-native-get-location'
import { useDispatch } from 'react-redux'

const origin = { latitude: 37.3318456, longitude: -122.0296002 }
const destination = { latitude: 22.270041, longitude: 73.149727 }
const GOOGLE_MAPS_APIKEY = 'AIzaSyDDv41SppPP1dkdSe2nwqI3LWYZ3WtGLQs'

export const Map = ({
  containerStyle = {},
  mapStyle = {},
  location = {
    latitude: 0,
    longitude: 0
  },
  MerchantAddress,
  eta,
  order,
  desti
}) => {
  const [dest, setDest] = useState([
    MerchantAddress?.latitude,
    MerchantAddress?.longitude
  ])
  const [Eta, setEta] = useState(eta)
  const [Loading, setLoading] = useState(false)
  const [Notify, setNotify] = useState(true)
  const [UsrLocation, setUsrLocation] = useState([0, 0])

  const dispatch = useDispatch()

  const MapRef = useRef()

  const pubnub = usePubNub()

  useEffect(() => {
    console.log('33333333333333333333333333333333', dest, MerchantAddress)
    // getEta()
  }, [])

  // const getEta = async () => {
  //   setLoading(true)
  //   console.log('@@@@@@@@@@@@@@@@@@@@@@@', UsrLocation, MerchantAddress)
  //   const res = await axios.get(
  //     `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${parseFloat(
  //       UsrLocation?.latitude
  //     )},${parseFloat(UsrLocation?.longitude)}&destinations=${parseFloat(
  //       MerchantAddress.latitude
  //     )},${parseFloat(
  //       MerchantAddress.longitude
  //     )}&key=AIzaSyDDv41SppPP1dkdSe2nwqI3LWYZ3WtGLQs`
  //   )
  //   console.log(
  //     'ETA $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',
  //     res.data.rows[0].elements[0]?.duration
  //   )
  //   if (
  //     res.data.rows[0].elements[0]?.duration &&
  //     res.data.rows[0].elements[0]?.duration?.value != Eta?.value
  //   ) {
  //     MapRef.current.animateCamera(
  //       {
  //         center: UsrLocation,
  //         pitch: UsrLocation?.pitch,
  //         heading: UsrLocation?.heading,
  //         altitude: UsrLocation?.altitude
  //       },
  //       2
  //     )
  //     // if (res.data.rows[0].elements[0]?.duration.value != eta?.value) {
  //     setEta(
  //       res.data.rows[0]?.elements[0]?.duration
  //         ? res.data.rows[0]?.elements[0]?.duration
  //         : { text: 'NA', value: 'NA' }
  //     )

  //     // if (res.data.rows[0].elements[0]?.duration.value <= 207) {
  //     //   console.log(
  //     //     '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
  //     //   )
  //     //   if (Notify) {
  //     //     showNotification(
  //     //       'Poppins: You are 3 mins away. Order #' + order?.id, 'Resatuarant Notified'
  //     //       order
  //     //     )
  //     //     setNotify(false)
  //     //   }
  //     // }
  //     setLoading(false)

  //     try {
  //       pubnub.publish(
  //         {
  //           channel: 'eta',
  //           message: {
  //             eta: res.data.rows[0].elements[0]?.duration,
  //             order: order,
  //             location: UsrLocation
  //           }
  //         },
  //         function (status, response) {
  //           console.log('Publish Result: ', status, response)
  //         }
  //       )
  //     } catch (e) {
  //       console.error('PUBNUB ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', e)
  //     }
  //   }
  //   // if (res.data.rows[0].elements[0]?.duration) {
  //   //   updateEta(res.data.rows[0].elements[0]?.duration)
  //   // }
  // }

  // const updateEta = async eta => {
  //   if (orderStatus[order?.status_id] == 'Placed') {
  //     return
  //   }
  //   const res = await axios.put(
  //     'https://poppins-order-service.herokuapp.com/locations/update_order_eta/' +
  //       order?.id,
  //     {
  //       order_eta_secs: eta?.value
  //     }
  //   )
  //   console.log(res.data)
  // }

  const sendEta = async eta => {
    try {
      pubnub.publish(
        {
          channel: 'eta',
          message: {
            eta: eta,
            order: order,
            location: UsrLocation,
            arrival: false
          }
        },
        function (status, response) {
          console.log('Publish Result: ', status, response)
        }
      )
    } catch (e) {
      console.error('PUBNUB ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', e)
    }
  }

  const arrivalNotice = async () => {
    try {
      pubnub.publish(
        {
          channel: 'eta',
          message: {
            order: order,
            arrival: true
          }
        },
        function (status, response) {
          console.log('Publish Result: ', status, response)
        }
      )
    } catch (e) {
      console.error('PUBNUB ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', e)
    }
  }

  function getRegionForCoordinates(points) {
    // points should be an array of { latitude: X, longitude: Y }
    let minX,
      maxX,
      minY,
      maxY

      // init first point
    ;(point => {
      minX = point.latitude
      maxX = point.latitude
      minY = point.longitude
      maxY = point.longitude
    })(points[0])

    // calculate rect
    points.map(point => {
      minX = Math.min(minX, point.latitude)
      maxX = Math.max(maxX, point.latitude)
      minY = Math.min(minY, point.longitude)
      maxY = Math.max(maxY, point.longitude)
    })

    const midX = (minX + maxX) / 2
    const midY = (minY + maxY) / 2
    const deltaX = maxX - minX
    const deltaY = maxY - minY

    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY
    }
  }

  function fancyTimeFormat(duration) {
    if (!Number.isInteger(duration)) {
      duration = 0
    }
    // Hours, minutes and seconds
    var hrs = Math.floor(duration / 3600)
    var mins = Math.floor((duration % 3600) / 60)
    var secs = Math.floor(duration % 60)

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = ''

    if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
    }

    ret += '' + mins + ':' + (secs < 10 ? '0' : '')
    ret += '' + secs
    return ret
  }
  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000
    })
      .then(loc => {
        console.log('JJJJJJJJJJJJJJJJJJJJ', loc)
        setUsrLocation([loc?.latitude, loc?.longitude])
        // dispatch({ type: 'SET_LOCATION', payload: location })
      })
      .catch(error => {
        const { code, message } = error
        console.error(code, message)
        // if (Platform.OS == 'android' && !enabled) {
        //   navigation.navigate('EnableLocation')
        //   setEnabled(true)
        // }
      })
  }

  useEffect(() => {
    getLocation()
    setDest([MerchantAddress?.latitude, MerchantAddress?.longitude])
  }, [])

  console.log(
    'RRRRRRRRRRRRRRRRRRRRRRRR',
    parseFloat(dest[0]),
    parseFloat(dest[1]),
    parseFloat(UsrLocation[0]),
    parseFloat(UsrLocation[1])
  )
  return (
    <View style={[styles.container, containerStyle]}>
      {/* <Text style={{ fontWeight: 'bold' }}>
        ETA: {fancyTimeFormat(Eta?.value)}
      </Text> */}

      {dest[0] && UsrLocation[0] ? (
        <MapboxNavigation
          style={{ height: '100%', width: '100%' }}
          origin={[parseFloat(UsrLocation[1]), parseFloat(UsrLocation[0])]}
          destination={[parseFloat(dest[1]), parseFloat(dest[0])]}
          // origin={[-97.760288, 30.273566]}
          // destination={[-97.918842, 30.494466]}
          trackUserLocation
          // shouldSimulateRoute
          showsEndOfRouteFeedback
          onLocationChange={event => {
            const { latitude, longitude } = event.nativeEvent
            console.log('QQQQQQQQQQQQQQQQQQQ', event.nativeEvent)
          }}
          onRouteProgressChange={event => {
            const {
              distanceTraveled,
              durationRemaining,
              fractionTraveled,
              distanceRemaining
            } = event.nativeEvent
            sendEta(durationRemaining)
            console.log('YYYYYYYYYYYYYYYYYYYYYYYYYY', event.nativeEvent)
          }}
          onError={event => {
            const { message } = event.nativeEvent
            console.error('YYYYYYYYYYYYYYYYYYYYYYYYYY', event.nativeEvent)
          }}
          onCancelNavigation={event => {
            // User tapped the "X" cancel button in the nav UI
            // or canceled via the OS system tray on android.
            // Do whatever you need to here.
            console.log(event.nativeEvent)
          }}
          onArrive={() => {
            // Called when you arrive at the destination.
            arrivalNotice()
          }}
        />
      ) : (
        <></>
      )}
    </View>
  )
}

const { height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    height: Platform.OS == 'ios' ? height - 90 : height - 70,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 30
  },
  map: {
    height: 200,
    width: '100%'
  }
})
