/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React, { useEffect } from 'react'
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import { fontStyles } from '../../constants/fontStyles'
const Splash = require('../../assets/images/Splash.png')
const LandingScreen = ({ navigation, user, authToken }) => {
  useEffect(() => {
    console.log('authToken', authToken, 'user', user)
    if (user && authToken) {
      navigation.navigate('Home')
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={Splash} style={styles.backgroundImage}>
        <View style={styles.mainContainer}>
          <Text style={[fontStyles.ProximaBoldH1, { color: '#fff' }]}>
            POPPINS
          </Text>

          <View style={styles.bottomItems}>
            <Button
              onPress={() => navigation.navigate('SignUp')}
              title={'Create Account'}
              titleStyle={[fontStyles.ProximaSemiBold, { color: '#000' }]}
              backgroundColor={'#F6BD3E'}
            />
            <Button
              onPress={() => navigation.navigate('SignIn')}
              title={'Have an account? Sign in'}
              titleStyle={[fontStyles.ProximaSemiBold]}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%'
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomItems: {
    position: 'absolute',
    bottom: 50,
    width: '100%'
  }
})

const mapStateToProps = state => ({
  user: state.userReducer.user,
  authToken: state.userReducer.authToken
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen)
