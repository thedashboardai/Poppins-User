/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React, { useState, createRef, useEffect } from 'react'
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
import { connect, useDispatch, useSelector } from 'react-redux'
import { fontStyles } from '../../constants/fontStyles'
import { FlatList } from 'react-native-gesture-handler'
import { PopularResturantsCard } from '../../components/Cards/PopularResturantCards'
import { HorizontalCards } from '../../components/Cards/HorizontalCards'
import SearchHeader from '../../components/SearchHeader'
import { SearchFilter } from '../../components/SearchFilter/index'
import { ItemDetail } from '../../components/ItemDetails/ItemDetail'
import { getAllMerchant } from '../../stores/actions/resturantAction'
import Button from '../../components/Button'
import { useFocusEffect, useIsFocused } from '@react-navigation/core'
import Header from '../../components/Header'
import axios from 'axios'
import Cart from '../../components/Cart'

const Home = ({ navigation, user, resturants, getAllMerchant }) => {
  const FilterRef = createRef()
  const itemRef = createRef()
  const isFocused = useIsFocused()
  const [cust_id, setCustId] = useState(
    useSelector(state => state.userReducer.userId)
  )
  const [ShowCart, setShowCart] = useState(false)

  const getCart = async () => {
    try {
      const response = await axios.get(
        'https://poppins-order-service.herokuapp.com/order_creation/get_cart_frontend/' +
          cust_id
      )
      const cart_content = await response.data
      if (cart_content?.payload.id) {
        setShowCart(true)
      } else {
        setShowCart(false)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getAllMerchant()
    getCart()
  }, [isFocused])

  // console.log('resturants', resturants)
  const [showFilter, setShowFilter] = useState(false)

  return (
    <View style={styles.mainContainer}>
      <SearchFilter ref={FilterRef} />
      <ItemDetail ref={itemRef} />
      <SafeAreaView>
        <ScrollView>
          <SearchHeader
            Component={TouchableOpacity}
            placeholder="Burger, Pizza, Salad etc"
            containerStyle={{ marginTop: Platform.OS == 'android' ? 15 : 50 }}
            editable={false}
            onSearchContainerPress={() => navigation.navigate('Search')}
            onRightIconPress={() => FilterRef.current?.setModalVisible()}
          />
          {/* <View style={styles.blockContainer}>
            <Text style={fontStyles.ProximaSemiBold}>Popular Near You</Text>
          </View> */}
          {/* <View style={[styles.blockContainer, {}]}>
            <FlatList
              horizontal={true}
              data={resturants}
              renderItem={({ item, index }) => {
                return (
                  <View key={index} style={{ marginHorizontal: 10 }}>
                    <PopularResturantsCard
                      onPress={() => navigation.navigate('ViewResturant')}
                    />
                  </View>
                )
              }}
              showsHorizontalScrollIndicator={false}
            />
          </View> */}
          <View
            style={{
              backgroundColor: '#F1F2FA',
              width: '100%',
              height: 5,
              marginVertical: 5,
              bottom: 5
            }}
          />
          <View style={styles.blockContainer}>
            <Text style={fontStyles.ProximaSemiBold}>More Restaurants</Text>
          </View>
          <View style={[styles.blockContainer, {}]}>
            <FlatList
              data={resturants}
              renderItem={({ item, index }) => {
                return (
                  <View key={item.id} style={{ margin: 10 }}>
                    <HorizontalCards
                      restaurant={item}
                      onPress={() => {
                        navigation.navigate('ResturantMenu', {
                          props: {
                            restaurant: item,
                            cust_id: cust_id
                          }
                        })
                      }}
                    />
                  </View>
                )
              }}
              showsHorizontalScrollIndicator={false}
            />
            <View style={{ height: 100, width: 100 }} />
          </View>
        </ScrollView>
      </SafeAreaView>
      {ShowCart ? <Cart navigation={navigation} /> : <></>}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1
  },
  blockContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 10
  },
  itemContainer: {
    paddingVertical: 5
  }
})
const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    resturants: state.resturant.resturants
  }
}

const mapDispatchToProps = {
  getAllMerchant
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
