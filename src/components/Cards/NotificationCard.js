/* eslint-disable no-console */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useContext } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { DEFAULT_THEME_COLOR } from '../../constants/colors'
import { fontStyles } from '../../constants/fontStyles'
// import { io } from 'socket.io-client'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import orderStatus from '../../constants/orderStatus'
import { Button } from 'native-base'
import { useNavigation } from '@react-navigation/core'
import LocationEnabler from 'react-native-location-enabler'

const mcDonald = require('../../assets/images/mcDonald.png')

const {
  PRIORITIES: { HIGH_ACCURACY },
  useLocationSettings
} = LocationEnabler

export const NotificationCard = ({
  title = 'McDonalds',
  description = 'You are 1 mile out. Your order is in the proximity lane.',
  img = mcDonald,
  time = '8:00 am',
  containerStyle = {},
  descriptionStyle = {},
  divider = true,
  eta,
  Merchant,
  order,
  status,
  location
}) => {
  const [Status, setStatus] = useState(status)
  const [Order, setOrder] = useState(order)
  const navigation = useNavigation()

  const [cust_id, setCustId] = useState(
    useSelector(state => state.userReducer.userId)
  )

  const [enabled, requestResolution] = useLocationSettings(
    {
      priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
      alwaysShow: true, // default false
      needBle: true // default false
    },
    false /* optional: default undefined */
  )

  // useEffect(() => {
  //   socket.on(cust_id + ' order updates', param => {
  //     if (param?.id === Order.id && param?.status_id != Order?.status_id) {
  //       console.log('UUUUUUUUUU', Order)
  //       setOrder(param)
  //     }
  //   })

  //   return () => {
  //     socket?.off(cust_id + ' order updates', null)
  //   }
  // }, [])

  return (
    <>
      <View style={[styles.rowSpacBtw, containerStyle]}>
        <View style={[styles.row, { width: '100%', paddingHorizontal: 0 }]}>
          <Image
            source={
              Merchant?.profile_image_url &&
              Merchant?.profile_image_url !== 'Not Available'
                ? { uri: Merchant?.profile_image_url }
                : img
            }
            style={styles.imgStyle}
          />
          <View>
            <Text style={[fontStyles.ProximaSemiBold]}>
              #{Order?.id} {title}
              {/* ({orderStatus[Order?.status_id]}) */}
            </Text>
            <Text
              style={[
                fontStyles.ProximaRegularP2,
                { color: '#6A7C92', minWidth: '80%', flexWrap: 'wrap' },
                descriptionStyle
              ]}>
              {`${description.street}, ${description?.city}, ${description?.state}, ${description?.country}, ${description?.zip_code}`}
            </Text>
            {/* <Text>
              {description?.latitude}, {description?.longitude}
            </Text> */}
            {/* <View>
              <Text
                style={[
                  fontStyles.ProximaRegularP2,
                  { color: DEFAULT_THEME_COLOR, right: 10 }
                ]}>
                {eta?.text}
              </Text>
            </View> */}
            {/* {orderStatus[order?.status_id] !== 'Placed' &&
            orderStatus[order?.status_id] !== 'Rejected' &&
            orderStatus[order?.status_id] !== 'Cancelled' ? ( */}
            {order?.status_id != 5 ? (
              <TouchableOpacity
                onPress={() => {
                  if (!enabled) {
                    requestResolution()
                  }
                  navigation.navigate('TrackOrder', {
                    orderId: order?.id,
                    MerchantAddress: description,
                    eta: eta,
                    location: location,
                    order: order
                  })
                }}>
                <Text style={{ color: 'purple' }}>Track</Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text style={{ color: 'gray', fontStyle: 'italic' }}>
                  Waiting for Restaurant to Accept
                </Text>
              </View>
            )}
            {/* ) : (
              <></>
            )} */}
          </View>
        </View>
      </View>
      {divider && <View style={styles.divider} />}
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  rowSpacBtw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    paddingVertical: 15
  },
  imgStyle: {
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    right: 10,
    marginHorizontal: 5
  },
  divider: {
    backgroundColor: '#F1F2FA',
    height: 1,
    width: '100%'
  }
})
