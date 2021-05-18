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
  const pubnub = usePubNub()

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
            merchant={Merchant}
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
