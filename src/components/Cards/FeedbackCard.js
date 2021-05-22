/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { DEFAULT_THEME_COLOR } from '../../constants/colors'
import { fontStyles } from '../../constants/fontStyles'
import { Rating, AirbnbRating } from 'react-native-ratings'
import { useEffect } from 'react'

const mcDonald = require('../../assets/images/people.png')
const star = require('../../assets/images/star.png')
export const FeedbackCard = ({
  title = 'Anonymous',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  img = mcDonald,
  time = '8:00 am',
  containerStyle = {},
  descriptionStyle = {},
  divider = true,
  ratingCount = 5,
  ratingValue = 5,
  review
}) => {
  const arr = Array.from(Array(review?.merchant_rating).keys())

  return (
    <>
      <View style={[styles.rowSpacBtw, containerStyle]}>
        <View style={[styles.row, { width: '90%', paddingHorizontal: 10 }]}>
          <Image source={img} style={styles.imgStyle} />
          <View style={{ width: '90%' }}>
            <Text style={[fontStyles.ProximaSemiBoldSmall]}>{title}</Text>
            <View style={{ flexDirection: 'row' }}>
              {arr.map(val => (
                <Text>⭐</Text>
              ))}
            </View>

            {/* <Rating
              ratingCount={review?.merchant_rating}
              startingValue={review?.merchant_rating}
              imageSize={15}
              readonly
              style={{ alignSelf: 'flex-start', marginTop: 10 }}
            /> */}
            <Text
              style={[
                fontStyles.ProximaRegularP2,
                { color: '#6A7C92', width: '100%' },
                descriptionStyle
              ]}>
              {review?.merchant_review}
            </Text>
          </View>
        </View>
        {/* <View>
                <Text style={[fontStyles.ProximaRegularP2, {color: DEFAULT_THEME_COLOR, right: 10}]}>
                    {time}
                </Text>
            </View> */}
      </View>
      {divider && <View style={styles.divider} />}
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
    // width: '100%'
  },
  rowSpacBtw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    paddingVertical: 15,
    width: '100%'
  },
  imgStyle: {
    height: 39,
    width: 39,
    borderRadius: 100,
    // justifyContent: 'center',
    // alignSelf: 'center',
    right: 10,
    marginHorizontal: 5
  },
  divider: {
    backgroundColor: '#F1F2FA',
    height: 1,
    width: '100%'
  }
})
