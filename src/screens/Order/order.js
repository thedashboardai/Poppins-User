/* eslint-disable no-console */
/* eslint-disable react-native/no-inline-styles */
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  PermissionsAndroid
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { CompletedOrderCard } from '../../components/Cards/CompletedOrderCard'
import { PendingOrderCard } from '../../components/Cards/PendingOrderCard'
import Header from '../../components/Header/index'
import { OrderToggle } from '../../components/Toggle/OrderToggle'
// import Geolocation from '@react-native-community/geolocation'
import GetLocation from 'react-native-get-location'
import { useInterval } from '../../utils/useInterval'
import { usePubNub } from 'pubnub-react'
import { showNotification } from '../../..'

export const Order = ({ navigation }) => {
  const [selected, setSeleted] = useState('pending')
  const [PendingOrders, setPendingOrders] = useState([])
  const [CompletedOrders, setCompletedOrders] = useState([])
  const [mylocation, setLocation] = useState()
  const [cust_id, setCustId] = useState(
    useSelector(state => state.userReducer.userId)
  )
  const [userLocation, setuserLocation] = useState(
    useSelector(state => state.userReducer.location)
  )
  const dispatch = useDispatch()
  const pubnub = usePubNub()
  const [channels] = useState(['orderStatus'])

  let PlacedNotified = []

  const getOrders = async () => {
    const res = await axios.get(
      'https://poppins-order-service.herokuapp.com/order_creation/get_orders_by_user/' +
        cust_id
    )
    // console.log('^^^^^^^^^^^^^^^', res.data)
    if (res.data.code === 200) {
      setPendingOrders(
        res.data.payload.filter(
          order =>
            order.status_id === 5 ||
            order.status_id === 6 ||
            order.status_id === 7 ||
            order.status_id === 9
        )
      )
      setCompletedOrders(
        res.data.payload.filter(order => order.status_id === 10)
      )
    }
  }

  // const getLocation = () => {
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 15000
  //   })
  //     .then(location => {
  //       console.log(location)
  //       setLocation({
  //         latitude: location.latitude,
  //         longitude: location.longitude
  //       })
  //       if (userLocation?.latitude != location?.latitude) {
  //         dispatch({ type: 'SET_LOCATION', payload: location })
  //       }
  //     })
  //     .catch(error => {
  //       const { code, message } = error
  //       console.log(code, message)
  //     })
  // }

  // useInterval(() => {
  //   getLocation()
  // }, 3000)

  // const updateOrderStatus = event => {
  //   const orderObj = event?.message?.order
  //   if (orderObj?.cust_id !== cust_id) {
  //     return
  //   }
  //   console.log(
  //     'PUBNUB {{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}',
  //     event
  //   )

  //   getOrders()

    // if (event?.message?.type === 'ACCEPTED') {
    //   showNotification(
    //     'Order #' + orderObj?.id + ' Accepted',
    //     'Your order has been accepted. You can start driving to pickup  your order.',
    //     orderObj
    //   )
    // } else if (event?.message?.type === 'REJECTED') {
    //   showNotification(
    //     'Order #' + orderObj?.id + ' Rejected',
    //     'Your order has been cancelled.',
    //     orderObj
    //   )
    // } else if (event?.message?.type === 'NEW') {
    //   console.log('88888888888888888888888888888888888', PlacedNotified)
    //   if (PlacedNotified.includes(orderObj?.id)) {
    //     return
    //   }
    //   PlacedNotified.push(orderObj?.id)
    //   console.log('77777777777777777777777777777777777', PlacedNotified)
    //   showNotification(
    //     'Order #' + orderObj?.id + ' Placed',
    //     'Waiting for restaurant confirmation.',
    //     orderObj
    //   )
    // } else if (event?.message?.type === 'PREPARE') {
    //   showNotification(
    //     'Order #' + orderObj?.id + ' Cooking',
    //     'Your order is in the kitchen.',
    //     orderObj
    //   )
    // } else if (event?.message?.type === 'READY') {
    //   showNotification(
    //     'Order #' + orderObj?.id + ' Cooked',
    //     'Your order is ready.',
    //     orderObj
    //   )
    // } else if (event?.message?.type === 'COMPLETE') {
    //   showNotification(
    //     'Order #' + orderObj?.id + ' Completed',
    //     'Your order is completed. Enjoy your Meal.',
    //     orderObj
    //   )
    // } else {
    //   return
    // }
  // }

  // useEffect(() => {
  //   const orderStatusListener = pubnub.addListener({
  //     message: updateOrderStatus
  //   })
  //   pubnub.subscribe({ channels })
  // }, [])

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <View
      style={{ backgroundColor: '#fff', paddingBottom: 60 }}
      contentContainerStyle={{ flex: 1 }}>
      <Header
        centerText="Orders"
        leftIcon
        leftIconName="arrow-back-outline"
        leftButtonPress={() => navigation.navigate('Home')}
      />
      {/* <OrderToggle onChange={active => setSeleted(active)} /> */}
      <ScrollView>
        {selected == 'pending' ? (
          <>
            {PendingOrders.map((order, ind) => {
              return (
                <View key={ind} style={[styles.blockContainer, { top: 10 }]}>
                  <PendingOrderCard
                    navigation={navigation}
                    order={order}
                    location={mylocation}
                  />
                </View>
              )
            })}
          </>
        ) : (
          <>
            {CompletedOrders.map((order, ind) => {
              return (
                <View
                  key={ind}
                  style={[styles.blockContainer, { marginVertical: 10 }]}>
                  <CompletedOrderCard navigation={navigation} order={order} />
                </View>
              )
            })}
          </>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  blockContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  itemContainer: {
    paddingVertical: 5
  }
})
