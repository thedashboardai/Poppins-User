/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native'
import homeStyles from '../Home/Home.style'
import Icon from 'react-native-vector-icons/Ionicons'
import Header from '../../components/Header'
import { useState } from 'react'
import { fontStyles } from '../../constants/fontStyles'
import { DEFAULT_THEME_COLOR } from '../../constants/colors'
import Input from '../../components/Input'
import Button from '../../components/Button'
import ImageCropPicker from 'react-native-image-crop-picker'
import OptionsMenu from 'react-native-option-menu'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { updateProfile } from '../../stores/actions/user.action'
import { connect, useDispatch, useSelector } from 'react-redux'
import CustomModal from '../../components/Modal'
import { RNS3 } from 'react-native-s3-upload'
import axios from 'axios'
import Toast from 'react-native-tiny-toast'

const s3Config = {
  keyPrefix: 'poppins/user-profile-pics/',
  bucket: 'winesource-website',
  region: 'us-west-1',
  accessKey: 'AKIASIEVADAQ7NTPKH6J',
  secretKey: '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',
  successActionStatus: 201
}

const Profile = ({ navigation, userDetails, updateProfile }) => {
  const [image, setImage] = useState(userDetails.payload.name.slice(0, 2))
  const [fullName, setFullName] = useState(userDetails.payload.name)
  const [phoneNo, setphoneNo] = useState(userDetails.payload.phone)
  const [userName, setuserName] = useState(userDetails.payload.username)
  const [userImage, setuserImage] = useState(
    userDetails.payload?.profile_image_url
  )
  const [email, setemail] = useState(userDetails.payload.email)
  const [userId, setuserId] = useState(userDetails.payload.id)
  const [show, setshow] = useState(false)
  const [imgUrl, setImgUrl] = useState('')
  const [cust_id, setCustId] = useState(
    useSelector(state => state.userReducer.userId)
  )
  const dispatch = useDispatch()

  const openImageLibrary = async () => {
    try {
      let image = await ImageCropPicker.openPicker({
        multiple: false
      })
      console.log(image)
      const imgObj = {
        name: (image?.filename ? image.filename : userName) + '.png',
        uri: image.path,
        type: image.mime
      }

      setImage(imgObj)
      upload(imgObj)
    } catch (error) {
      console.error(error)
    }
  }

  const openCamera = async () => {
    try {
      let image = await ImageCropPicker.openCamera({
        // multiple: false
      })
      console.log(image)
      const imgObj = {
        name: image.filename,
        uri: image.path,
        type: image.mime
      }
      setImage(imgObj)
      upload(imgObj)
    } catch (error) {
      console.log(error)
    }
  }

  const onUpdate = async () => {
    var index = fullName.indexOf(' ')
    var obj = {
      username: userName,
      first_name: fullName.slice(0, index),
      last_name: fullName.slice(index, fullName.length),
      email: email,
      phone: phoneNo
    }
    const { status } = await updateProfile(obj)
    if (status) {
      setshow(true)
    }
  }

  const upload = async selectedFile => {
    console.log(selectedFile)
    const response = await RNS3.put(selectedFile, s3Config)
    if (response.status !== 201) {
      Alert.alert('Failed to upload image. Try again!')
    }
    console.log(response.body)

    setImgUrl(response.body?.postResponse?.location)
    try {
      const res = await axios.post(
        'http://poppins-lb-1538414865.us-east-2.elb.amazonaws.com/users/update_image_url/' +
          cust_id,
        {
          image_url: response.body?.postResponse?.location
        }
      )
      console.log('PPPPPPPPPPPPPP', res)
      if (res.data.code === 200) {
        dispatch({ type: 'UPDATED_PROFILE_SUCCESS', payload: res.data })
        Toast.show('Image Uploaded')
      }
    } catch (e) {
      console.error('PPPPPPPPPPPPP', e, cust_id)
    }
    /*
     * {
     *   Response: {
     *     bucket: "bucket-name",
     *     key: "directory-name/filename-to-be-uploaded",
     *     location: "https:/your-aws-s3-bucket-url/directory-name/filename-to-be-uploaded"
     *   }
     * }
     */
  }

  console.log('user', userDetails, decodeURIComponent(userImage))

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
      <CustomModal
        modalVisibel={show}
        successIcon
        title="Profile Updated"
        discription=""
        buttons={[
          {
            title: 'Close',
            onPress: () => {
              navigation.navigate('Home')
              setshow(false)
            }
          }
        ]}
      />
      <Header
        centerText="Profile"
        leftIconName="arrow-back"
        leftButtonPress={navigation.goBack}
      />
      <SafeAreaView style={homeStyles.SafeAreaView2}>
        <ScrollView>
          <View>
            <View style={styles.imageContainer}>
              {userImage !== 'Not Available' ? (
                <View
                  style={{
                    width: 84,
                    height: 84,
                    borderRadius: 100,
                    overflow: 'hidden'
                  }}>
                  <Image
                    source={{
                      uri: userImage
                    }}
                    ro
                    style={{ height: 84, width: 84 }}
                  />
                </View>
              ) : typeof image == 'string' ? (
                <View style={styles.avatarTitleContainer}>
                  <Text style={[fontStyles.ProximaBoldH1, styles.avatarText]}>
                    {image}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    width: 84,
                    height: 84,
                    borderRadius: 100,
                    overflow: 'hidden'
                  }}>
                  <Image source={image} ro style={{ height: 84, width: 84 }} />
                </View>
              )}

              {/* <TouchableOpacity onPress={() => {

              }} activeOpacity={0.7} style={{ marginTop: 10 }}>
                <Text style={[fontStyles.ProximaRegularP1, styles.imageChangText]}>Tap to change</Text>
              </TouchableOpacity> */}

              <OptionsMenu
                color={DEFAULT_THEME_COLOR}
                customButton={
                  <Text
                    style={[
                      fontStyles.ProximaRegularP1,
                      styles.imageChangText
                    ]}>
                    Tap to change
                  </Text>
                }
                options={['Choose from photos', 'Open Camera', 'Cancel']}
                actions={[openImageLibrary, openCamera]}
              />
            </View>

            <View>
              <View style={styles.blockContainer}>
                <Input
                  label="User Name"
                  keyboardType="default"
                  value={userName}
                  onChangeText={e => setuserName(e)}
                />
              </View>
              <View style={styles.blockContainer}>
                <Input
                  label="Full Name"
                  keyboardType="default"
                  value={fullName}
                  onChangeText={e => setFullName(e)}
                />
              </View>
              <View style={styles.blockContainer}>
                <Input
                  label="Mobile Number"
                  keyboardType="default"
                  type="phoneInput"
                  value={phoneNo}
                  onChangeText={e =>
                    setphoneNo(e.dialCode + e.unmaskedPhoneNumber)
                  }
                  // changeNumberButton
                  // changeNumberButtonPress={() => navigation.navigate("ChangeNumber")}
                />
              </View>
              <View style={styles.blockContainer}>
                <Input
                  label="Email Address"
                  keyboardType="default"
                  value={email}
                  onChangeText={e => setemail(e)}
                  rightComponent
                  renderRightComponent={() => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ChangeNumber')}
                      style={{ right: 30, top: 5 }}>
                      <Text
                        style={[
                          fontStyles.ProximaSemiBoldSmall,
                          { color: DEFAULT_THEME_COLOR }
                        ]}>
                        CHANGE
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={[
            styles.blockContainer,
            { position: 'absolute', bottom: 20, width: '100%' }
          ]}>
          <Button
            onPress={() => onUpdate()}
            title="Save"
            titleStyle={fontStyles.ProximaSemiBoldSmall}
          />
        </View>
      </SafeAreaView>
    </>
  )
}

const mapStateToProps = state => ({
  userDetails: state.userReducer.user
})

const mapDispatchToProps = {
  updateProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    backgroundColor: '#F1F2FA',
    paddingVertical: 20,
    alignItems: 'center'
  },
  avatarTitleContainer: {
    backgroundColor: '#FFBE00',
    height: 84,
    width: 84,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: '#fff'
  },
  imageChangText: {
    color: DEFAULT_THEME_COLOR,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 10
  },
  blockContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 10
  }
})
