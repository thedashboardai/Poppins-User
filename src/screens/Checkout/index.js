/* eslint-disable no-console */
/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  Image
} from 'react-native'
import Button from '../../components/Button'
import Header from '../../components/Header'
import { Map } from '../../components/Map/map'

import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomModal from '../../components/Modal'
import { useState } from 'react'
import {
  Body,
  Left,
  ListItem,
  Right,
  Thumbnail,
  Text as NativeBaseText
} from 'native-base'
import { fontStyles } from '../../constants/fontStyles'
import { DEFAULT_THEME_COLOR } from '../../constants/colors'
import RadioButtonRN from 'radio-buttons-react-native'
import PaymentRadio from '../../components/SelectPaymentRadio'
import Input from '../../components/Input'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { usePubNub } from 'pubnub-react'
import { showNotification } from '../../..'

const mapImage = require('../../assets/images/maps.png')
const creditCardImage = require('../../assets/images/credit-card.png')
const payPalImage = require('../../assets/images/paypal.png')

const percentImage = require('../../assets/images/percent.png')

const Checkout = ({ navigation }) => {
  const [selected, setselected] = useState(0)
  const [subTotal, setsubTotal] = useState(0)
  const [orderId, setorderId] = useState(0)
  const [items, setItems] = useState([])
  const [itemDetails, setItemDetails] = useState([])
  const [Merchant, setMerchant] = useState([])
  const [MerchantAddress, setMerchantAddress] = useState([])
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [cust_id, setCustId] = useState(
    useSelector(state => state.userReducer.userId)
  )
  const [Details, setDetails] = useState(
    useSelector(state => state.userReducer.ItemDetails)
  )
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()

  const pubnub = usePubNub()

  const GetCart = async () => {
    try {
      const response = await axios.get(
        'https://poppins-order-service.herokuapp.com/order_creation/get_cart_frontend/' +
          cust_id
      )
      const cart_content = await response.data
      if (cart_content?.payload.id) {
        //   Toast.show('Item added to cart!')
        console.log('@@@@@@@@@@@', cart_content)
        setorderId(cart_content?.payload.id)
        const res = await axios.get(
          'https://poppins-order-service.herokuapp.com/order_creation/get_order_items/' +
            cart_content?.payload.id
        )
        // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&', res.data.payload.length)
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
        // console.log('///////////////', requests.length)
        Promise.all(requests).then(result => {
          let op = []
          op = result.map(r => r.data.payload)
          //   console.log('!!!!!!!!!!!!!!!!!!', op)
          dispatch({ type: 'FETCH_ITEM_DETAILS', payload: op })
          //   console.log(
          //     ':::::::::::::::::::::::::::',
          //     Details?.find(e => e.id == 15)
          //   )
        })
        let sum = 0
        res.data.payload.map(item => {
          //   console.log('------------------------------')
          let itemObj = Details?.find(e => e.id == item?.item_id)
          //   console.log(item, itemObj)
          sum += itemObj?.base_price * item?.quantity
        })
        setsubTotal(sum)

        const merchRes = await axios.get(
          ' http://poppins-lb-1538414865.us-east-2.elb.amazonaws.com/merchants/get_merchant/' +
            cart_content.payload.merch_id
        )
        setMerchant(merchRes.data.payload)
        const merchAddressRes = await axios.get(
          ' http://poppins-lb-1538414865.us-east-2.elb.amazonaws.com/merchants/get_address/' +
            cart_content.payload.merch_id
        )
        setMerchantAddress(merchAddressRes.data.payload)
        // console.log(merchAddressRes.data.payload)
      }
    } catch (e) {
      console.error(e, cust_id)
    }
  }

  const placeOrder = async () => {
    const res = await axios.post(
      'https://poppins-order-service.herokuapp.com/order_creation/place_order/' +
        orderId,
      {
        amount_usd: subTotal
      }
    )
    console.log(res.data)
    if (res.data.code === 200) {
      setOrderPlaced(true)
      try {
        pubnub.publish(
          {
            channel: 'orderStatus',
            message: {
              type: 'NEW',
              order: res?.data?.payload
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
  }

  useEffect(() => {
    // console.log('no')
    GetCart()
  }, [])

  return (
    <View style={styles.mainContainer}>
      <CustomModal
        modalVisibel={show}
        successIcon
        title="Your order has been placed"
        discription="You will receive a notification when you're nearby!"
        buttons={[
          {
            title: 'Close',
            onPress: () => {
              navigation.navigate('Orders', { orderId: orderId })
              setShow(false)
            }
          }
        ]}
      />
      <Header
        centerText={'Checkout'}
        leftButtonPress={() => navigation.goBack()}
        containerStyle={{ marginTop: 20 }}
      />
      <CustomModal
        modalVisibel={orderPlaced}
        successIcon
        title="Your order has been placed"
        discription={"You will receive a notification when you're nearby!"}
        buttons={[
          {
            title: 'Close',
            onPress: () => {
              setOrderPlaced(false)
              navigation.navigate('Orders', { orderId: orderId })
            }
          }
        ]}
      />
      {/* <SafeAreaView> */}
      <ScrollView>
        <View style={styles.mainContainer}>
          <ListItem
            itemDivider={false}
            avatar
            style={styles.resturantDetailsContainer}>
            <Left style={styles.rdLeftContainer}>
              <Thumbnail style={{ height: 20, width: 15 }} source={mapImage} />
            </Left>
            <Body style={styles.rdBody}>
              <Text style={[fontStyles.ProximaSemiBold]}>
                {Merchant ? Merchant?.name : 'Poppins'}
              </Text>
              <Text style={[fontStyles.ProximaRegularP2, styles.addressText]}>
                {MerchantAddress.street
                  ? MerchantAddress?.street +
                    ', ' +
                    MerchantAddress?.city +
                    ', ' +
                    MerchantAddress?.state +
                    ', ' +
                    MerchantAddress?.country +
                    ', ' +
                    MerchantAddress?.zip_code
                  : 'Arizona'}
              </Text>
            </Body>
          </ListItem>

          {Details?.length ? (
            items?.map(item => (
              <View style={styles.cartDetails}>
                <View>
                  <Text style={[fontStyles.ProximaSemiBoldSmall]}>
                    {item.quantity} x{' '}
                    {Details?.find(e => e?.id == item?.item_id)?.name}
                  </Text>
                  {/* <TouchableOpacity style={{ marginTop: 15 }}>
                    <Text
                      style={[fontStyles.ProximaSemiBoldSmall, styles.edit]}>
                      Edit
                    </Text>
                  </TouchableOpacity> */}
                </View>
                <Text style={fontStyles.ProximaRegularP2}>
                  ${Details?.find(e => e?.id == item?.item_id)?.base_price}
                </Text>
              </View>
            ))
          ) : (
            <></>
          )}

          {/* <View style={styles.paymentContainer}>
            <PaymentRadio
              title={'Credit / Debit Card (1345)'}
              leftImage={creditCardImage}
              selected={selected == 0}
              onPress={() => setselected(0)}
            />
            <PaymentRadio
              title={'Paypal'}
              selected={selected == 1}
              leftImage={payPalImage}
              containerStyle={{ marginTop: 10 }}
              imageStyle={{ width: 25, marginStart: 5 }}
              onPress={() => setselected(1)}
            />

            <Text
              style={[fontStyles.ProximaSemiBoldSmall, styles.addCouponText]}>
              Add Coupon
            </Text>

            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                borderRadius: 10,
                overflow: 'hidden'
              }}>
              <View style={{ width: '80%' }}>
                <Input
                  containerStyle={{
                    width: '100%',
                    borderRadius: 0,
                    borderTopLeftRadius: 10
                  }}
                  label={''}
                  placeholder="Coupon Code"
                  keyboardType="default"
                />
              </View>
              <View
                style={{
                  width: '20%',
                  backgroundColor: '#FFBE00',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 13,
                  marginTop: 25,
                  borderTopRightRadius: 10
                }}>
                <Image
                  source={percentImage}
                  style={{ height: 30, width: 30 }}
                />
              </View>
            </View>
          </View> */}

          {/* <Button
                        onPress={() => setShow(true)}
                        title="Place Order"
                        containerStyle={{ marginTop: 20 }}
                    /> */}

          {Details?.length ? (
            <View style={styles.orderDetails}>
              <View style={styles.orderDetailsSubContainer}>
                <Text style={fontStyles.ProximaRegularP2}>Subtotal</Text>
                <Text style={fontStyles.ProximaRegularP2}>${subTotal}</Text>
              </View>
              <View style={styles.orderDetailsSubContainer}>
                <Text style={fontStyles.ProximaRegularP2}>Fees & Taxes</Text>
                <Text style={fontStyles.ProximaRegularP2}>$0.00</Text>
              </View>
              <View style={styles.orderDetailsSubContainer}>
                <Text style={fontStyles.ProximaSemiBold}>Total</Text>
                <Text style={fontStyles.ProximaSemiBold}>${subTotal}</Text>
              </View>

              <Button
                title="Place Order"
                containerStyle={{ marginTop: 20 }}
                onPress={placeOrder}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F1F2FA',
    flex: 1
  },
  resturantDetailsContainer: {
    // borderBottomColor: ""
    backgroundColor: '#fff',
    width: '100%',
    marginStart: 0
    // paddingStart: 10,
  },
  rdLeftContainer: {
    width: '6%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingStart: 10
  },
  addressText: {
    fontSize: 12,
    color: '#6A7C92',
    marginTop: 10
  },
  rdBody: {
    // paddingVertical: 15,
  },
  cartDetails: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  edit: {
    color: DEFAULT_THEME_COLOR
  },
  paymentContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginTop: 5
  },
  addCouponText: {
    marginStart: 20,
    marginTop: 20
  },
  orderDetails: {
    backgroundColor: '#fff',
    marginTop: 5,
    paddingVertical: 15,
    paddingBottom: 30
  },
  orderDetailsSubContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '90%',
    justifyContent: 'space-between',
    paddingVertical: 15
  }
})

export default Checkout
