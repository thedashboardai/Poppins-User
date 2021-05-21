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
import { useEffect } from 'react'
import orderStatus from '../../constants/orderStatus'
import axios from 'axios'
import { NotificationCard } from '../../components/Cards/NotificationCard'
import { Button } from 'native-base'
import { Rating, AirbnbRating } from 'react-native-ratings'
import Header from '../../components/Header'
import { TextInput } from 'react-native-gesture-handler'

const mcDonald = require('../../assets/images/mcDonald.png')

const AddReview = ({ navigation, route, img = mcDonald }) => {
  const [order, setOrder] = useState(route?.params?.order)
  const [MerchantRating, setMerchantRating] = useState('')
  const [MerchantReview, setMerchantReview] = useState('')
  const [AppReview, setAppReview] = useState('')
  const [AppRating, setAppRating] = useState(0)

  const restaurantRatingCompleted = rating => {
    console.log('Rating is: ' + rating)
    setMerchantRating(rating)
  }

  const appRatingCompleted = rating => {
    console.log('Rating is: ' + rating)
    setAppRating(rating)
  }

  const submitRating = async () => {
    console.log(
      'LLLLLLLLLLLLLLLLLLLLLLLLLLLLL',
      order,
      MerchantRating,
      MerchantReview,
      AppRating,
      AppReview
    )
    try {
      const res = await axios.post(
        'http://poppins-lb-1538414865.us-east-2.elb.amazonaws.com/reviews/add_rating',
        {
          order_id: order?.id,
          merchant_id: order?.merch_id,
          merchant_rating: MerchantRating,
          experience_rating: AppRating,
          merchant_review: MerchantReview,
          experience_review: AppReview
        }
      )
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkk', res.data);
      if (res.data.code === 200) {
        navigation.navigate('Home')
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <ScrollView style={[styles.blockContainer, { top: 10 }]}>
      <View style={styles.main}>
        {/* <Text>Add Review #{order?.id}</Text> */}
        <View style={[styles.blockContainer]}>
          <Header centerText="Restaurant Rating" />
          <View style={{ padding: 12 }}>
            <AirbnbRating
              count={5}
              reviews={[
                '🤮 Terrible',
                '😟 Bad',
                '😐 OK',
                '😀 Good',
                '🤩 Holy 🐮'
              ]}
              defaultRating={4}
              size={30}
              onFinishRating={restaurantRatingCompleted}
            />
          </View>

          <Header centerText="Restaurant Review" />

          <TextInput
            style={{ backgroundColor: '#fff' }}
            multiline={true}
            numberOfLines={4}
            onChangeText={text => setMerchantReview(text)}
            value={MerchantReview}
            placeholder="Loved It!"
          />
        </View>
        {/* <View style={styles.divider} /> */}

        <View style={[styles.blockContainer]}>
          <Header centerText="App Rating" />
          <View style={{ padding: 12 }}>
            <AirbnbRating
              count={5}
              reviews={[
                '🤮 Terrible',
                '😟 Bad',
                '😐 OK',
                '😀 Good',
                '🤩 Holy 🐮'
              ]}
              defaultRating={4}
              size={30}
              onFinishRating={appRatingCompleted}
            />
          </View>
          <Header centerText="App Review" />

          <TextInput
            style={{ backgroundColor: '#fff' }}
            multiline={true}
            numberOfLines={4}
            onChangeText={text => setAppReview(text)}
            value={AppReview}
            placeholder="Loved It!"
          />

          <Text
            style={{
              backgroundColor: '#FFBE00',
              textAlign: 'center',
              padding: 12,
              fontWeight: 'bold',
              marginTop: 14
            }}
            onPress={submitRating}>
            Submit
          </Text>
        </View>
      </View>
    </ScrollView>
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

export default connect(mapStateToProps, null)(AddReview)
