import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { DEFAULT_THEME_COLOR } from '../../constants/colors'
import { fontStyles } from '../../constants/fontStyles'
import { forgetPass } from '../../stores/actions/user.action'
import RenderError from '../../utils/renderError'
const ForgotPassword = ({navigation, forgetPass}) => {

    const [email, setEmail] = useState('')
    const [emailError, setemailError] = useState("")

    const validate = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(reg.test(email)) {
            return true
        }else {
            setemailError("Enter valid email!")
            return false
        }
    }

    const handleSubmit = async () => {
        let validtion =  validate()
        if(validtion) {
            var obj = {
                email: email
            }
            let { status } = await forgetPass(obj)
            if(status) {
                navigation.navigate("ChangePassword", {from: 'forgot'})
            }
        }
    }

    return(
        <View style={styles.mainContainer}>
            <View style={[styles.blockContainer, {marginTop: Platform.OS == "android" ? 0 : 50}]}>
                <View style={styles.itemContainer}>
                    <Text style={fontStyles.ProximaBoldH1}>Forgot Password</Text>
                </View>
                <View style={[styles.itemContainer]}>
                    <Text style={[fontStyles.ProximaRegularP2, {color: "#6A7C92"}]}>
                    To reset your password, enter the mobile 
                    number use to sign in to POPPINS
                    </Text>
                </View>
            </View>

            <View style={[styles.blockContainer, {marginTop: 30}]}>
                <Input value={email} label="Enter Email" onChangeText={(text) => setEmail(text)}/>
                <RenderError errorText={emailError} />
            </View>

            <View style={[styles.blockContainer, { marginTop: 30}]}>
                <Button onPress={() => handleSubmit()} title="Submit" titleStyle={fontStyles.ProximaSemiBold} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
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
        flexDirection:'row', 
        alignSelf:'center', 
        paddingVertical: 25
    },
    bottomItems: {
        position:'absolute',
        bottom: 100,
        width:'100%'
    }

})
const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    forgetPass
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);