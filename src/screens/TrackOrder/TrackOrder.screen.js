/* eslint-disable no-console */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform
} from 'react-native'
import { fontStyles } from '../../constants/fontStyles'
// ES6 import or TypeScript
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import orderStatus from '../../constants/orderStatus'
import axios from 'axios'
import getDirections from 'react-native-google-maps-directions'
import { NotificationCard } from '../../components/Cards/NotificationCard'
import { Map } from '../../components/Map/map'
import { useInterval } from '../../utils/useInterval'
import GetLocation from 'react-native-get-location'
import { Button } from 'native-base'
import LocationEnabler from 'react-native-location-enabler'
import { usePubNub } from 'pubnub-react'
import { showNotification } from '../../..'

const mcDonald = require('../../assets/images/mcDonald.png')

const {
  PRIORITIES: { HIGH_ACCURACY },
  useLocationSettings
} = LocationEnabler

const TrackOrder = ({ navigation, route, img = mcDonald }) => {
  const [order, setOrder] = useState(route?.params?.order)
  const [image, setImage] = useState('RD')
  const [Merchant, setMerchant] = useState([])
  const [location, setLocation] = useState(route?.params?.location)

  const [MerchantAddress, setMerchantAddress] = useState(
    route?.params?.MerchantAddress
  )
  const [eta, setEta] = useState(route?.params?.eta)
  // const socket = io('https://poppins-order-service.herokuapp.com')
  const [cust_id, setCustId] = useState(
    useSelector(state => state.userReducer.userId)
  )
  const [userLocation, setuserLocation] = useState(
    useSelector(state => state.userReducer.location)
  )
  const dispatch = useDispatch()
  const pubnub = usePubNub()
  const [channels] = useState(['orderStatus'])

  let PlacedNotify = true

  const [enabled, requestResolution] = useLocationSettings(
    {
      priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
      alwaysShow: true, // default false
      needBle: true // default false
    },
    false /* optional: default undefined */
  )

  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000
    })
      .then(location => {
        console.log(location)
        setLocation({
          latitude: location.latitude,
          longitude: location.longitude
        })
        dispatch({ type: 'SET_LOCATION', payload: location })
      })
      .catch(error => {
        const { code, message } = error
        console.error(code, message)
        requestResolution()
      })
  }

  useInterval(() => {
    getLocation()
  }, 3000)

  const updateOrderStatus = event => {
    const orderObj = event?.message?.order
    if (orderObj?.cust_id !== cust_id || orderObj?.id !== order?.id) {
      return
    }

    if (event?.message?.type === 'COMPLETE') {
      navigation.navigate('AddReview', { order: order })
    }
  }

  useEffect(() => {
    const orderStatusListener = pubnub.addListener({
      message: updateOrderStatus
    })
    pubnub.subscribe({ channels })
  }, [])

  return (
    <View style={[styles.blockContainer, { top: 10 }]}>
      <View style={styles.main}>
        {order ? (
          <View style={[styles.blockContainer]}>
            {/* {orderStatus[order?.status_id] !== 'Placed' &&
            orderStatus[order?.status_id] !== 'Rejected' &&
            orderStatus[order?.status_id] !== 'Cancelled' &&
            MerchantAddress?.latitude &&
            MerchantAddress?.latitude !== 'Unavailable' ? ( */}
            <Map
              mapStyle={[styles.mapStyle, { overflow: 'hidden' }]}
              containerStyle={[styles.mapStyle, styles.mapContainer]}
              location={location}
              MerchantAddress={MerchantAddress}
              eta={eta}
              order={order}
            />
            {/* ) : (
              <View style={[styles.blockContainer, { top: 10 }]}>
                <Text>Order not in track state</Text>
                <Button title="Go back" onPress={() => navigation.goBack()} />
              </View>
            )} */}
            {/* <NotificationCard
              img={img}
              title={Merchant.name}
              description={MerchantAddress}
              merchant={Merchant}
              order={order}
              eta={eta}
              status={order?.status_id}
              divider={false}
              containerStyle={{
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                borderColor: '#F1F2FA',
                borderWidth: 1
              }}
              descriptionStyle={{ width: '85%' }}
            /> */}
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    // borderBottomRightRadius: 100,
    width: '100%',
    alignSelf: 'center'
  },
  blockContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 10
  },
  itemContainer: {
    paddingVertical: 5
  },
  mapStyle: {
    height: '100%',
    width: '100%'
  },
  mapContainer: {
    justifyContent: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden'
  },
  divider: {
    borderWidth: 1,
    borderColor: '#707070'
  }
})

const mapStateToProps = state => ({
  userDetails: state.userReducer.user
})

export default connect(mapStateToProps, null)(TrackOrder)
