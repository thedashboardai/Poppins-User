/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { NotificationCard } from '../../components/Cards/NotificationCard'
import Header from '../../components/Header'
import { NotificationEmpty } from './EmptyNotification'

export const Notification = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header
        centerText={'Notification'}
        leftButtonPress={() => navigation.goBack()}
      />
      {[].length ? (
        [].map((val, ind) => {
          return <NotificationCard key={ind} />
        })
      ) : (
        <Text style={{ textAlign: 'center', marginTop: '50%' }}>
          No Notification
        </Text>
      )}
      {/* <View style={styles.main}>
                <NotificationEmpty />
            </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgStyle: {
    height: 200,
    width: 200
  }
})
