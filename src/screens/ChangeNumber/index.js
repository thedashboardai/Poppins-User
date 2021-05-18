import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { DEFAULT_THEME_COLOR } from '../../constants/colors'
import { fontStyles } from '../../constants/fontStyles'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ChangeNumber = ({ navigation }) => {


    return (
        <View style={styles.mainContainer}>
            <View style={[styles.blockContainer, { marginTop: Platform.OS == "android" ? 0 : 50 }]}>

                <TouchableOpacity onPress={navigation.goBack} style={{}}>
                    <Ionicons name="arrow-back" size={25} />
                </TouchableOpacity>

                <View style={[styles.itemContainer, { marginTop: 10 }]}>
                    <Text style={fontStyles.ProximaBoldH1}>New Email Address</Text>
                </View>
                <View style={[styles.itemContainer]}>
                    <Text style={[fontStyles.ProximaRegularP2, { color: "#6A7C92" }]}>
                        Please enter a new email address to generate
                        a OTP
                    </Text>
                </View>
            </View>

            <View style={[styles.blockContainer, { marginTop: 30 }]}>
                <Input  label="Email Address" />
            </View>

            <View style={[styles.blockContainer, { marginTop: 30 }]}>
                <Button onPress={() => {
                    navigation.navigate("VerificationOTP", { from: "change_email" })
                }} title="Submit" titleStyle={fontStyles.ProximaSemiBold} />
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
export default ChangeNumber;