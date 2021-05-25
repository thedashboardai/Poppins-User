/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import Input from '../../components/Input'
import CustomModal from '../../components/Modal'
import { DEFAULT_THEME_COLOR } from '../../constants/colors'
import { fontStyles } from '../../constants/fontStyles'
const store = require('../../assets/images/store.png')

const EnableLocation = ({ navigation, user }) => {
  const [show, setIshow] = useState(false)

  useEffect(() => {
    console.log('EnableLocation useEffect user', user)
  }, [])

  return (
    <View style={styles.mainContainer}>
      <CustomModal
        modalVisibel={show}
        title="Stay updated"
        successIcon={false}
        discription="Turn your GPS ON so POPPINS can serve you up the best experience possible"
        buttons={[
          {
            title: 'Done',
            titleStyle: { ...fontStyles.ProximaSemiBold },
            onPress: () => {
              // Opens the GPS setting window
              Linking.openSettings()
              navigation.goBack()
              setIshow(!show)
            }
          },
          {
            title: 'Not now',
            titleStyle: { ...fontStyles.ProximaSemiBold, color: '#000' },
            onPress: () => setIshow(!show),
            backgroundColor: 'transparent'
          }
        ]}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.blockContainer,
              { marginTop: Platform.OS == 'android' ? 0 : 50, top: 20 }
            ]}>
            <View style={styles.itemContainer}>
              <Text style={fontStyles.ProximaBoldH1}>Enable Your Location</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={[fontStyles.ProximaRegularP2, { color: '#6A7C92' }]}>
                Please allow to use your location to show nearby restaurants on
                the map
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.blockContainer,
              {
                marginVertical: Platform.OS == 'ios' ? 130 : 100,
                alignSelf: 'center'
              }
            ]}>
            <Image source={store} />
          </View>

          <View style={[styles.blockContainer]}>
            <Button
              onPress={() => setIshow(!show)}
              title="Allow Location Access"
              titleStyle={fontStyles.ProximaSemiBold}
            />
          </View>
          {/* <View style={styles.blockContainer}>
                        <Button
                            onPress={() => {navigation.navigate('Selectlocation')}}
                            title={"Enter Source Address"}
                            lightTheme
                            titleStyle={[fontStyles.ProximaSemiBold]}
                        />
                    </View> */}
        </View>
      </ScrollView>
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
    paddingHorizontal: 15
  },
  itemContainer: {
    paddingVertical: 5
  },
  signUpText: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 25
  },
  bottomItems: {
    position: 'absolute',
    bottom: 100,
    width: '100%'
  }
})

const mapStateToProps = state => ({
  user: state.userReducer.user
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(EnableLocation)
