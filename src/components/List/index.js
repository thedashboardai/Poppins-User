/* eslint-disable react-native/no-inline-styles */
import { Thumbnail } from 'native-base'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { fontStyles } from '../../constants/fontStyles'

// const profileImage = require("../../assets/images/profile.png")

import Ionicons from 'react-native-vector-icons/Ionicons'
import { DEFAULT_THEME_COLOR } from '../../constants/colors'
import { useSelector } from 'react-redux'

const List = ({
  avatar = false,
  leftIcon = false,
  leftIconName = '',
  leftIconColor = DEFAULT_THEME_COLOR,
  lefIconSize = 20,
  rightIcon = true,
  avatarText = '',
  avatarImage = '',
  title = '',
  subtitle = '',
  rightIconName = 'chevron-forward',
  titleStyle = {},
  subTitleStyle = {},
  containerStyle = {},
  onPress = () => {},
  image = '',
  defaultKey = false,
  divider = false
}) => {
  const [userImage, setuserImage] = useState(
    useSelector(state => state?.userReducer.user.payload?.profile_image_url)
  )

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[styles.mainContainer, containerStyle]}>
        {avatar && (
          <>
            {userImage !== 'Not Available' ? (
              <View
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: 100,
                  overflow: 'hidden'
                }}>
                <Image
                  ro
                  source={{ uri: decodeURIComponent(userImage) }}
                  style={{ height: 84, width: 84 }}
                />
              </View>
            ) : (
              <View>
                {typeof avatarImage == 'string' ? (
                  <View style={styles.avatarTitleContainer}>
                    <Text style={[fontStyles.ProximaBoldH1, styles.avatarText]}>
                      {avatarText}
                    </Text>
                  </View>
                ) : (
                  <Thumbnail circular={false} source={avatarImage} />
                )}
              </View>
            )}
          </>
        )}
        {leftIcon && (
          <View>
            <Ionicons
              name={leftIconName}
              size={lefIconSize}
              color={leftIconColor}
            />
          </View>
        )}

        <View style={styles.centerComponentContainer}>
          {defaultKey ? (
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[
                  fontStyles.ProximaSemiBold,
                  styles.nameText,
                  titleStyle
                ]}>
                {title}
              </Text>
              <Text
                style={[
                  fontStyles.ProximaSemiBold,
                  styles.nameText,
                  { left: 10 }
                ]}>
                default
              </Text>
            </View>
          ) : (
            <Text
              style={[fontStyles.ProximaSemiBold, styles.nameText, titleStyle]}>
              {title}
            </Text>
          )}
          {subtitle ? (
            <Text
              style={[
                fontStyles.ProximaRegularP2,
                styles.subtitleText,
                subTitleStyle
              ]}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {rightIcon && (
          <View style={{ position: 'absolute', right: 15 }}>
            <Ionicons name={rightIconName} size={25} color={'#D3D8DF'} />
          </View>
        )}
      </TouchableOpacity>
      {divider && <View style={styles.dividerStyle} />}
    </>
  )
}

export default List

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  avatarTitleContainer: {
    backgroundColor: '#FFBE00',
    height: 60,
    width: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: '#fff'
  },
  centerComponentContainer: {
    marginStart: 10
  },
  nameText: {
    color: '#6905DB'
  },
  subtitleText: {
    color: '#6A7C92',
    marginVertical: 3
  },
  dividerStyle: {
    backgroundColor: '#F1F2FA',
    height: 1
  }
})
