import React from 'react'
import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { DEFAULT_THEME_COLOR } from '../../constants/colors'
import { fontStyles } from '../../constants/fontStyles'
import { userRegister } from '../../stores/actions/user.action'
import RenderError from '../../utils/renderError'

const SignUp = ({ navigation, userRegister }) => {
  const [firstName, setFirstName] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastName, setLastName] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [VehicleModel, setVehicleModel] = useState('')
  const [VehicleColor, setVehicleColor] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const validate = () => {
    setFirstNameError(firstName ? '' : 'First Name is required')
    setLastNameError(lastName ? '' : 'Last Name is required')
    setUsernameError(username ? '' : 'Username is required')
    setPhoneError(phone ? '' : 'Phone is required')
    setEmailError(email ? '' : 'Email is required')
    setPasswordError(password ? '' : 'Password is required')

    if (firstName && lastName && username && email && password && phone) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async () => {
    let formStatus = validate()

    if (formStatus) {
      const user = {
        username: username,
        first_name: firstName,
        last_name: lastName,
        password: password,
        email: email,
        phone: phone,
        vehicle_make_model: VehicleModel,
        vehicle_color: VehicleColor
      }
      let { status } = await userRegister(user)
      if (status) {
        navigation.navigate('SignIn')
      }

      // alert("done")
    } else {
      // alert("errors")
      validate()
    }
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.blockContainer,
              { marginTop: Platform.OS == 'android' ? 0 : 50 }
            ]}>
            <View style={styles.itemContainer}>
              <Text style={fontStyles.ProximaBoldH1}>Create an account</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={[fontStyles.ProximaRegularP2, { color: '#6A7C92' }]}>
                Please enter details below below
              </Text>
            </View>
          </View>

          <View style={styles.blockContainer}>
            <Input
              label="First Name"
              onChangeText={setFirstName}
              value={firstName}
              keyboardType="default"
            />
            <RenderError errorText={firstNameError} />
          </View>
          <View style={styles.blockContainer}>
            <Input
              label="Last Name"
              onChangeText={setLastName}
              value={lastName}
              keyboardType="default"
            />
            <RenderError errorText={lastNameError} />
          </View>
          <View style={styles.blockContainer}>
            <Input
              label="Username"
              onChangeText={setUsername}
              value={username}
              keyboardType="default"
            />
            <RenderError errorText={usernameError} />
          </View>
          <View style={styles.blockContainer}>
            <Input
              label="Enter Email"
              onChangeText={setEmail}
              value={email}
              keyboardType="default"
            />
            <RenderError errorText={emailError} />
          </View>
          <View style={styles.blockContainer}>
            <Input
              label="Phone"
              onChangeText={setPhone}
              value={phone}
              keyboardType="default"
            />
            <RenderError errorText={phoneError} />
          </View>
          <View style={styles.blockContainer}>
            <Input
              label="Vehicle Model"
              onChangeText={setVehicleModel}
              value={VehicleModel}
              keyboardType="default"
            />
          </View>
          <View style={styles.blockContainer}>
            <Input
              label="Vehicle Color"
              onChangeText={setVehicleColor}
              value={VehicleColor}
              keyboardType="default"
            />
          </View>
          <View style={styles.blockContainer}>
            <Input
              label="Password"
              isPassword
              onChangeText={setPassword}
              value={password}
              keyboardType="default"
            />
            <RenderError errorText={passwordError} />
          </View>

          <View style={styles.blockContainer}>
            <Button
              onPress={() => navigation.navigate('ForgotPassword')}
              title="Forgot Password?"
              titleStyle={[fontStyles.ProximaRegularP2, { color: '#000' }]}
              backgroundColor="transparent"
            />
          </View>

          <View style={styles.blockContainer}>
            <Button
              title="Sign up"
              titleStyle={fontStyles.ProximaSemiBold}
              onPress={handleSubmit}
            />
          </View>

          <View style={styles.signUpText}>
            <Text style={fontStyles.ProximaRegularP1}>Have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text
                style={[
                  fontStyles.ProximaRegularP1,
                  { color: DEFAULT_THEME_COLOR }
                ]}>
                {' '}
                Sign in
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.blockContainer}>
            <Button
              onPress={() => {}}
              title={'Connect with Facebook'}
              titleStyle={[fontStyles.ProximaSemiBold, {}]}
              type="facebook"
            />
          </View>
          <View style={styles.blockContainer}>
            <Button
              onPress={() => {}}
              title={'Connect with Google'}
              titleStyle={[fontStyles.ProximaSemiBold]}
              type={'google'}
            />
          </View>
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

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  userRegister
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
