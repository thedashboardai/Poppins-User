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
  Platform,
  Linking
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
import { Button, Image } from 'native-base'
// import LocationEnabler from 'react-native-location-enabler'
import { usePubNub } from 'pubnub-react'
import { showNotification } from '../../..'
import Header from '../../components/Header'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomModal from '../../components/Modal'

const mcDonald = require('../../assets/images/mcDonald.png')

// const {
//   PRIORITIES: { HIGH_ACCURACY },
//   useLocationSettings
// } = LocationEnabler

const TrackOrder = ({ navigation, route, img = mcDonald }) => {
  const [order, setOrder] = useState(route?.params?.order)
  const [image, setImage] = useState('RD')
  const [Merchant, setMerchant] = useState(route?.params?.Merchant)
  const [location, setLocation] = useState(route?.params?.location)
  const [enabled, setEnabled] = useState(false)
  const [show, setShow] = useState(false)
  const [items, setItems] = useState([])
  const [Details, setDetails] = useState(
    useSelector(state => state.userReducer.ItemDetails)
  )
  const [MerchantAddress, setMerchantAddress] = useState()
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
  let AcceptedNotify = true
  let CookingNotify = true
  let CookedNotify = true
  let CompletedNotify = true
  let RejectedNotify = true

  // const [enabled, requestResolution] = useLocationSettings(
  //   {
  //     priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
  //     alwaysShow: true, // default false
  //     needBle: true // default false
  //   },
  //   false /* optional: default undefined */
  // )

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
  //       dispatch({ type: 'SET_LOCATION', payload: location })
  //     })
  //     .catch(error => {
  //       const { code, message } = error
  //       console.error(code, message)
  //       if (Platform.OS == 'android' && !enabled) {
  //         navigation.navigate('EnableLocation')
  //         setEnabled(true)
  //       }
  //     })
  // }

  // useInterval(() => {
  //   getLocation()
  // }, 3000)

  // const updateOrderStatus = event => {
  //   const orderObj = event?.message?.order
  //   if (orderObj?.cust_id !== cust_id || orderObj?.id !== order?.id) {
  //     return
  //   }

  //   if (event?.message?.type === 'COMPLETE') {
  //     navigation.navigate('AddReview', { order: order })
  //   }
  // }

  const updateOrderStatus = event => {
    const orderObj = event?.message?.order
    if (orderObj?.cust_id !== cust_id || orderObj?.id !== order?.id) {
      return
    }

    console.log(
      'PUBNUB {{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}',
      event
    )

    if (event?.message?.type === 'ACCEPTED') {
      console.log(
        '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
        AcceptedNotify
      )
      if (AcceptedNotify) {
        AcceptedNotify = false
        showNotification(
          'Order #' + orderObj?.id + ' Accepted 😎',
          'Your order has been accepted. You can start driving to pickup  your order.',
          orderObj
        )
      }
      console.log(
        '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&',
        AcceptedNotify
      )
    } else if (event?.message?.type === 'REJECTED') {
      if (RejectedNotify) {
        RejectedNotify = false
        showNotification(
          'Order #' + orderObj?.id + ' Rejected 😭',
          'Your order has been cancelled.',
          orderObj
        )
        navigation.navigate('Home')
      }
    } else if (event?.message?.type === 'NEW') {
      // console.log('88888888888888888888888888888888888', PlacedNotified)
      // if (PlacedNotified.includes(orderObj?.id)) {
      //   return
      // }
      // PlacedNotified.push(orderObj?.id)
      // console.log('77777777777777777777777777777777777', PlacedNotified)
      console.log(
        '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
        PlacedNotify
      )
      if (PlacedNotify) {
        showNotification(
          'Order #' + orderObj?.id + ' Placed',
          'Waiting for confirmation.',
          orderObj
        )
        PlacedNotify = false
      }
    } else if (event?.message?.type === 'PREPARE') {
      if (CookingNotify) {
        CookingNotify = false
        showNotification(
          'Order #' + orderObj?.id + ' Being Carted 🛒',
          'Your order is being carted.',
          orderObj
        )
      }
    } else if (event?.message?.type === 'READY') {
      if (CookedNotify) {
        CookedNotify = false
        showNotification(
          'Order #' + orderObj?.id + ' Carted ✅',
          'Your order is ready.',
          orderObj
        )
      }
    } else if (event?.message?.type === 'COMPLETE') {
      if (CompletedNotify) {
        CompletedNotify = false
        showNotification(
          'Order #' + orderObj?.id + ' Completed 😋',
          'Your order is completed. Enjoy your Meal.',
          orderObj
        )
        navigation.navigate('AddReview', { order: order })
      }
    } else {
      return
    }
  }

  const getOrderItems = async () => {
    const res = await axios.get(
      'https://poppins-order-service.herokuapp.com/order_creation/get_order_items/' +
        order?.id
    )
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&', res.data)
    setItems(res.data.payload)
    const requests = []
    res.data.payload.forEach(item => {
      requests.push(
        axios.get(
          'http://poppins-lb-1538414865.us-east-2.elb.amazonaws.com/internals/get_item/' +
            item.item_id
        )
      )
    })
    console.log('///////////////', requests.length)
    await Promise.all(requests).then(result => {
      let op = []
      op = result.map(r => r.data.payload)
      console.log('!!!!!!!!!!!!!!!!!!', op)
      setDetails(op)
      // dispatch({ type: 'FETCH_ITEM_DETAILS', payload: op })
    })
  }

  const getMerchantDetails = async () => {
    const merchRes = await axios.get(
      'http://poppins-lb-1538414865.us-east-2.elb.amazonaws.com/merchants/get_merchant/' +
        order?.merch_id
    )
    setMerchant(merchRes.data.payload)
    const merchAddressRes = await axios.get(
      'http://poppins-lb-1538414865.us-east-2.elb.amazonaws.com/merchants/get_address/' +
        order?.merch_id
    )
    setMerchantAddress(merchAddressRes.data.payload)
  }

  useEffect(() => {
    getOrderItems()
    getMerchantDetails()
  }, [])

  useEffect(() => {
    const orderStatusListener = pubnub.addListener({
      message: updateOrderStatus
    })
    pubnub.subscribe({ channels })
  }, [])

  return (
    <View style={[styles.blockContainer, { top: 10 }]}>
      <CustomModal
        modalVisibel={show}
        successIcon
        title="Order Items"
        discription={Details?.map(
          (item, index) => index + 1 + '.' + item?.name
        ).join('\n')}
        buttons={[
          {
            title: 'Close',
            onPress: () => {
              setShow(false)
            }
          }
        ]}
      />
      <View style={styles.main}>
        {order ? (
          <View style={[styles.blockContainer]}>
            {/* {orderStatus[order?.status_id] !== 'Placed' &&
            orderStatus[order?.status_id] !== 'Rejected' &&
            orderStatus[order?.status_id] !== 'Cancelled' &&
            MerchantAddress?.latitude &&
            MerchantAddress?.latitude !== 'Unavailable' ? ( */}

            <Header
              centerText={'Order: #' + order?.id}
              leftButtonPress={() => {
                navigation.navigate('Orders')
              }}
            />
            <View style={[styles.containerStyle, styles.rowSpacBtw]}>
              <View
                style={[styles.row, { width: '100%', paddingHorizontal: 0 }]}>
                <View>
                  <Text
                    style={[
                      fontStyles.ProximaRegularP2,
                      { color: '#6A7C92', minWidth: '80%', flexWrap: 'wrap' }
                    ]}>
                    {Merchant?.name} 📍{' '}
                    {`${MerchantAddress?.street}, ${MerchantAddress?.city}, ${MerchantAddress?.state}, ${MerchantAddress?.country}, ${MerchantAddress?.zip_code}`}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={[styles.containerStyle, styles.rowSpacBtw]}>
              <View
                style={[styles.row, { width: '100%', paddingHorizontal: 0 }]}>
                <View>
                  <Text
                    onPress={() => Linking.openURL(`tel:${Merchant?.phone}`)}
                    style={[
                      fontStyles.ProximaRegularP2,
                      { color: '#6A7C92', minWidth: '80%', flexWrap: 'wrap' }
                    ]}>
                    ☎️ {Merchant?.phone}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.divider} />

            <View style={[styles.headerContainer]}>
              <Text
                style={[styles.orderitemstitle]}
                onPress={() => setShow(true)}>
                See Order Items
              </Text>
            </View>

            {MerchantAddress ? (
              <Map
                mapStyle={[styles.mapStyle, { overflow: 'hidden' }]}
                containerStyle={[styles.mapStyle, styles.mapContainer]}
                location={location}
                MerchantAddress={MerchantAddress}
                desti={[
                  parseFloat(MerchantAddress?.latitude),
                  parseFloat(MerchantAddress?.longitude)
                ]}
                eta={eta?.text ? eta : { text: 'NA', value: 0 }}
                order={order}
              />
            ) : (
              <></>
            )}
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
    marginTop: 20
  },
  itemContainer: {
    paddingVertical: 5
  },
  mapStyle: {
    height: '67%',
    width: '100%'
  },
  headerContainer: {
    width: '100%',
    borderBottomColor: '#E6F0FC',
    borderBottomWidth: 1,
    height: Platform.OS == 'ios' ? 70 : 40,
    backgroundColor: '#fff',
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: Platform.OS == 'ios' ? 40 : 0
  },
  orderitemstitle: {
    paddingHorizontal: 20
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
  },
  rowSpacBtw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    paddingVertical: 15
  },
  row: {
    flexDirection: 'row'
  }
})

const mapStateToProps = state => ({
  userDetails: state.userReducer.user
})

export default connect(mapStateToProps, null)(TrackOrder)
