import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import CodeInput from 'react-native-confirmation-code-input'
// import {  } from 'react-native-gesture-handler'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { DEFAULT_THEME_COLOR } from '../../constants/colors'
import { fontStyles } from '../../constants/fontStyles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomModal from '../../components/Modal'
import { useState } from 'react'


const VerificationOTP = ({ navigation, route }) => {
    const [emailChangeModal, setEmailChangeModal] = useState(false)
    const { from } = route.params

    const handleContinue = () => {
        if (route?.params?.from == "change_email") {
            setEmailChangeModal(true)
        } else {
            navigation.navigate("ChangePassword", { from: from })
        }
    }

    return (
        <View style={styles.mainContainer}>
            <CustomModal
                title={"Email address Updated"}
                successIcon
                discription={"You can use the new email address to login to your account"}
                modalVisibel={emailChangeModal}
                buttons={[
                    {
                        title: "Close",
                        onPress: () => {
                            setEmailChangeModal(false)
                            navigation.navigate("Profile")
                        }
                    }
                ]}
            />
            <View style={[styles.blockContainer, { marginTop: Platform.OS == "android" ? 0 : 50 }]}>

                {route?.params?.from == "change_email" && <TouchableOpacity onPress={navigation.goBack} style={{}}>
                    <Ionicons name="arrow-back" size={25} />
                </TouchableOpacity>}

                <View style={[styles.itemContainer, { marginTop: 10 }]}>
                    <Text style={fontStyles.ProximaBoldH1}>{(from && from == "changePassword") ? "Change Password" : "Verification"
                    }</Text>
                </View>
                <View style={[styles.itemContainer]}>
                    <Text style={[fontStyles.ProximaRegularP2, { color: "#6A7C92" }]}>
                        We have sent you an SMS with code to number
                        +1202-555-0110
                    </Text>
                </View>
            </View>

            <View style={styles.blockContainer}>
                <CodeInput
                    activeColor='#F1F2FA'
                    inactiveColor='#F1F2FA'
                    codeLength={6}
                    inputPosition='center'
                    size={50}
                    onFulfill={() => { }}
                    codeInputStyle={{ borderWidth: 1.5, backgroundColor: "#F1F2FA", borderRadius: 10, color: "#000" }}
                />
            </View>

            <View style={[styles.signUpText, { marginTop: 60 }]}>
                <Text style={fontStyles.ProximaRegularP1}>Didn't recieve code?</Text>
                <TouchableOpacity>
                    <Text style={[fontStyles.ProximaRegularP1, { color: DEFAULT_THEME_COLOR }]}> Resend (33s)</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.blockContainer, { marginTop: 30 }]}>
                <Button onPress={handleContinue} title="Continue" titleStyle={fontStyles.ProximaSemiBold} />
                {/* <View style={[styles.blockContainer, { marginTop: 30 }]}>
                    <Button
                        onPress={() => {
                            
                        }
                        }
                        title="Continue"
                        titleStyle={fontStyles.ProximaSemiBold} />
                </View> */}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        flex: 1,
    },
    blockContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    itemContainer: {
        paddingVertical: 5,
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
export default VerificationOTP;