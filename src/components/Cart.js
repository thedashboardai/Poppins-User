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
import { connect } from 'react-redux'

const Cart = ({ navigation }) => {
  return (
    <View style={[styles.cart]}>
      <Text
        onPress={() => navigation.navigate('Checkout')}
        title={'View Cart'}
        style={[styles.cartTitle]}>
        🛒 View Cart 👉
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cart: {
    backgroundColor: '#141518',
    color: '#efefef',
    position: 'absolute',
    bottom: 20,
    width: '80%',
    left: '10%',
    borderRadius: 4
  },
  cartTitle: {
    color: '#efefef',
    padding: 12,
    textAlign: 'center'
  }
})
const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, null)(Cart)
