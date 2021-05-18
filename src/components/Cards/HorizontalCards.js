/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native'
import { fontStyles } from '../../constants/fontStyles'

const item = require('../../assets/images/item.png')
const start = require('../../assets/images/star.png')
export const HorizontalCards = props => {
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      activeOpacity={0.6}
      style={[styles.defaultConatinerStyle]}>
      <Image
        source={
          props?.restaurant?.profile_image_url &&
          props?.restaurant?.profile_image_url !== 'Not Available'
            ? props?.restaurant?.profile_image_url
            : item
        }
        style={[styles.defaultImageStyle]}
      />
      <View style={[styles.defaultItemContainerStyle]}>
        <Text
          style={[
            fontStyles.ProximaSemiBoldSmall,
            { textTransform: 'capitalize' }
          ]}>
          {props?.restaurant?.name}
        </Text>
        <Text style={[fontStyles.ProximaRegularP2]}>
          {props?.restaurant?.description}
        </Text>
        {/* <View style={{flexDirection: 'row'}}>
                    <Text style={[fontStyles.ProximaRegularP2, distanceStyle]}>
                        {distance}
                    </Text>
                    <Text> . </Text>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={start} style={{top: 2, paddingHorizontal: 3}}/>
                        <Text style={[fontStyles.ProximaRegularP2, ratingStyle]}>
                             {rating}
                        </Text>
                    </View>
                </View> */}
      </View>
    </TouchableOpacity>
  )
}

export const styles = StyleSheet.create({
  defaultConatinerStyle: {
    width: '100%',
    flexDirection: 'row'
  },
  defaultImageStyle: {
    borderRadius: 10,
    width: 100,
    height: 100
  },
  defaultItemContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 10
  }
})
