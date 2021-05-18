/* eslint-disable no-console */
/* eslint-disable react-native/no-inline-styles */
import React, { createRef, forwardRef, useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'
import ActionSheet from 'react-native-actions-sheet'
import { fontStyles } from '../../constants/fontStyles'
import { ItemCard } from '../Cards/ItemCard'
import { NumericInput } from '../NumericInput/index'
import Input from '../Input'
import Button from '../Button/index'
import { FlavouredList } from '../FlavourList'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Toast from 'react-native-tiny-toast'

export const ItemDetail = forwardRef(
  (
    {
      onClose = () => ref.current?.setModalVisible(),
      goTo = () => {},
      closeModal = () => {},
      item,
      merch_id
    },
    ref
  ) => {
    const [qty, setQty] = useState(1)
    const [cust_id, setCustId] = useState(
      useSelector(state => state.userReducer.userId)
    )

    useEffect(() => {
      console.log('yo', item)
    }, [])

    const AddToCart = async () => {
      try {
        const response = await axios.post(
          'https://poppins-order-service.herokuapp.com/order_creation/add_to_cart',
          {
            item_id: item.id,
            menu_id: item.menu_id,
            is_customized: false,
            cust_id: cust_id,
            merch_id: merch_id,
            quantity: qty
          }
        )
        if (response.data.code === 200) {
          Toast.show('Item added to cart!')
        }
      } catch (e) {
        console.error(e, cust_id, merch_id, item.menu_id, item.id)
      }
    }

    return (
      <ActionSheet containerStyle={styles.mainContainer} ref={ref}>
        <View style={[styles.container]}>
          <View style={[styles.blockContainer]}>
            <ItemCard item={item} />
            <View style={styles.itemContainer}>
              <Text style={[fontStyles.ProximaRegularP2]}>
                {item?.description}
              </Text>
            </View>
          </View>
          {/* <View style={[styles.blockContainer, { marginVertical: 15 }]}>
            <FlavouredList />
            <FlavouredList />
          </View> */}
          <View
            style={[styles.blockContainer, styles.row, { marginVertical: 15 }]}>
            <Text style={[fontStyles.ProximaRegularP2]}>Quantity</Text>
            <NumericInput
              containerStyle={{ left: 20 }}
              inputContainerStyle={{ marginHorizontal: 4, borderRadius: 5 }}
              showBtn={false}
              size={80}
              minValue={1}
              intialValue={qty}
              onChange={e => setQty(e)}
            />
          </View>
          {/* <View style={[styles.blockContainer]}>
            <View style={styles.row}>
              <Text style={fontStyles.ProximaRegularP2}>
                Special Instruction
              </Text>
              <Text style={[fontStyles.ProximaRegularP2, { color: '#6A7C92' }]}>
                {' '}
                Optional
              </Text>
            </View>
            <Input
              containerStyle={{ top: -20 }}
              label={''}
              placeholder="Add any special instructions"
              keyboardType="default"
            />
          </View> */}
        </View>

        <View style={[styles.itemContainer, { marginBottom: 10 }]}>
          <Button
            title={`Add to Cart - $${item?.base_price * qty}`}
            onPress={() => {
              AddToCart()
              closeModal(false)
            }}
          />
        </View>
      </ActionSheet>
    )
  }
)

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
    // width:'99%',
    // borderRadius: 20
  },
  container: {
    // flex: 1,
    paddingVertical: Platform.OS == 'ios' ? 20 : 10
  },
  blockContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  itemContainer: {
    paddingVertical: 5
  },
  row: {
    flexDirection: 'row'
  },
  closeContainerStyle: {
    bottom: 5,
    backgroundColor: '#6A7C92',
    borderRadius: 20
  }
})
