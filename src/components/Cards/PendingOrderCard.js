/* eslint-disable no-console */
/* eslint-disable react-native/no-inline-styles */
import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Touchable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import orderStatus from '../../constants/orderStatus'
import { Map } from '../Map/map'
import { NotificationCard } from './NotificationCard'
const mcDonald = require('../../assets/images/mcDonald.png')
import { useNavigation } from '@react-navigation/native'
import { useInterval } from '../../utils/useInterval'
import { useSelector } from 'react-redux'
import { showNotification } from '../../..'
import { usePubNub } from 'pubnub-react'

export const PendingOrderCard = ({
  title = 'McDonalds',
  address = 'You are 1 mile out. Your order is in the proximity lane.',
  img = mcDonald,
  price = '5.00',
  order,
  location
}) => {
  const [Merchant, setMerchant] = useState([])
  const [MerchantAddress, setMerchantAddress] = useState({})
  const [eta, setEta] = useState({})
  const [cust_id, setCustId] = useState(
    useSelector(state => state.userReducer.userId)
  )
  let PlacedNotify = true
  let AcceptedNotify = true
  let CookingNotify = true
  let CookedNotify = true
  let CompletedNotify = true
  let RejectedNotify = true

  const pubnub = usePubNub()
  const [channels] = useState(['orderStatus'])

  const getItemDetials = async () => {
    const merchRes = await axios.get(
      ' http://poppins-lb-1538414865.us-east-2.elb.amazonaws.com/merchants/get_merchant/' +
        order.merch_id
    )
    setMerchant(merchRes.data.payload)
    const merchAddressRes = await axios.get(
      ' http://poppins-lb-1538414865.us-east-2.elb.amazonaws.com/merchants/get_address/' +
        order.merch_id
    )
    setMerchantAddress(merchAddressRes.data.payload)
  }

  const updateOrderStatus = event => {
    const orderObj = event?.message?.order
    if (orderObj?.cust_id !== cust_id || orderObj?.id !== order?.id) {
      return
    }

    console.log(
      'PUBNUB {{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}',
      event
    )

    // if (event?.message?.type === 'ACCEPTED') {
    //   console.log(
    //     '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
    //     AcceptedNotify
    //   )
    //   if (AcceptedNotify) {
    //     AcceptedNotify = false
    //     showNotification(
    //       'Order #' + orderObj?.id + ' Accepted 😎',
    //       'Your order has been accepted. You can start driving to pickup  your order.',
    //       orderObj
    //     )
    //   }
    //   console.log(
    //     '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&',
    //     AcceptedNotify
    //   )
    // } else if (event?.message?.type === 'REJECTED') {
    //   if (RejectedNotify) {
    //     RejectedNotify = false
    //     showNotification(
    //       'Order #' + orderObj?.id + ' Rejected 😭',
    //       'Your order has been cancelled.',
    //       orderObj
    //     )
    //   }
    // } else if (event?.message?.type === 'NEW') {
    //   // console.log('88888888888888888888888888888888888', PlacedNotified)
    //   // if (PlacedNotified.includes(orderObj?.id)) {
    //   //   return
    //   // }
    //   // PlacedNotified.push(orderObj?.id)
    //   // console.log('77777777777777777777777777777777777', PlacedNotified)
    //   console.log(
    //     '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
    //     PlacedNotify
    //   )
    //   if (PlacedNotify) {
    //     showNotification(
    //       'Order #' + orderObj?.id + ' Placed',
    //       'Waiting for restaurant confirmation.',
    //       orderObj
    //     )
    //     PlacedNotify = false
    //   }
    // } else if (event?.message?.type === 'PREPARE') {
    //   if (CookingNotify) {
    //     CookingNotify = false
    //     showNotification(
    //       'Order #' + orderObj?.id + ' Cooking 🍳',
    //       'Your order is in the kitchen.',
    //       orderObj
    //     )
    //   }
    // } else if (event?.message?.type === 'READY') {
    //   if (CookedNotify) {
    //     CookedNotify = false
    //     showNotification(
    //       'Order #' + orderObj?.id + ' Cooked 🍲',
    //       'Your order is ready.',
    //       orderObj
    //     )
    //   }
    // } else if (event?.message?.type === 'COMPLETE') {
    //   if (CompletedNotify) {
    //     CompletedNotify = false
    //     showNotification(
    //       'Order #' + orderObj?.id + ' Completed 😋',
    //       'Your order is completed. Enjoy your Meal.',
    //       orderObj
    //     )
    //   }
    // } else {
    //   return
    // }
  }

  useEffect(() => {
    const orderStatusListener = pubnub.addListener({
      message: updateOrderStatus
    })
    pubnub.subscribe({ channels })
  }, [])

  useEffect(() => {
    getItemDetials()
  }, [order?.status_id])

  //   const updateOrderEta = async () => {
  //     try {
  //       const res = await axios.put(
  //         'http://http://poppins-lb-1538414865.us-east-2.elb.amazonaws.com/locations/update_order_eta/' + order?.id,
  //         {
  //           order_eta_secs: eta?.value
  //         }
  //       )
  //       console.log(res)
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }
  //   useEffect(() => {
  //     if (!eta) {
  //       return
  //     }
  //     updateOrderEta()
  //   }, [])

  return (
    <View style={styles.main}>
      {order ? (
        <View>
          {/* {orderStatus[order?.status_id] !== 'Placed' &&
          orderStatus[order?.status_id] !== 'Rejected' &&
          orderStatus[order?.status_id] !== 'Cancelled' &&
          MerchantAddress?.latitude &&
          MerchantAddress?.latitude !== 'Unavailable' ? (
            <Map
              mapStyle={[styles.mapStyle, { overflow: 'hidden' }]}
              containerStyle={[styles.mapStyle, styles.mapContainer]}
              location={location}
              MerchantAddress={MerchantAddress}
            />
          ) : (
            <></>
          )} */}
          <NotificationCard
            img={img}
            title={Merchant.name}
            description={MerchantAddress}
            Merchant={Merchant}
            order={order}
            time={`$${price}`}
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
            location={location}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    // borderBottomRightRadius: 100,
    width: '95%',
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
    height: 250,
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
