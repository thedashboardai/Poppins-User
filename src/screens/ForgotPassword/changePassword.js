import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import Button from '../../components/Button'
import Input from '../../components/Input'
import CustomModal from '../../components/Modal'
import { DEFAULT_THEME_COLOR } from '../../constants/colors'
import { fontStyles } from '../../constants/fontStyles'
import Header from '../../components/Header'
import { connect } from 'react-redux'
import { changePass } from '../../stores/actions/user.action'
import RenderError from '../../utils/renderError'

const ChangePassword = ({navigation, route, resetPassToken, changePass}) => {
    const { from } = route.params
    const [modal, setmodal] = useState(false)
    const [pass, setpass] = useState('')
    const [confirmPass, setconfirmPass] = useState('')
    const [error, setError] = useState('')

    console.log("resetPassToken", resetPassToken)

    const validate = () => {
        if(pass === confirmPass) {
            return true
        }else {
            setError('Password not matched')
            return false
        }
    }

    const handleSubmit = async () => {
        const isValidate = await validate()
        if (isValidate) {
            var obj = {
                email: resetPassToken.email,
                password: pass
            }
            let { status } = await changePass(obj, resetPassToken.token)
            console.log("status", status)
            if(status) {
                setmodal(true)
            }
        }
    }
    
    return(
        <View style={styles.mainContainer}>
            <CustomModal 
                modalVisibel={modal}
                setModalVisible={(a) => setmodal(a)}
                title={from !== "forgot" ? "Password Updated" : "Password changed"}
                discription={from !== "forgot" ? 
                    "You may now continue using Prox with your new password"
                     : 
                    "You may now continue using POPPINS with your new password"}
                buttons={[
                    {
                        title: "Close",
                        containerStyle: {},
                        titleStyle: {},
                        lightTheme: false,
                        disabled: false,
                        backgroundColor: DEFAULT_THEME_COLOR,
                        onPress: () => { 
                            setmodal(!modal) 
                            {from !== "forgot" ? 
                            navigation.navigate("Home") 
                            : 
                            navigation.navigate("SignIn")}
                        },
                        textColor: "#fff"
                    }
                ]}
                />
           {from !== "forgot" && <Header leftIcon={false} centerText="Change Password"/>}

           {from !== "forgot" && 
            <View style={styles.blockContainer}>
                <Text style={[fontStyles.ProximaRegularP1, {color: '#6A7C92', textAlign: 'center', marginVertical: 10}]}>
                    We partner with Stripe to ensure that your credit card details are kept safe and secure. Prox will not have access to your credit card info
                </Text>
            </View>}
           {from == "forgot" &&
            <View style={[styles.blockContainer, {marginTop: Platform.OS == "android" ? 0 : 50}]}>
                <View style={styles.itemContainer}>
                    <Text style={fontStyles.ProximaBoldH1}>Choose a New Password</Text>
                </View>
            </View>}

            <View style={[styles.blockContainer, {marginTop: 30}]}>
                <Input value={pass} label="New Password" isPassword onChangeText={setpass}/>
                <RenderError errorText={error} />
            </View>
            <View style={[styles.blockContainer]}>
                <Input label="Confirm Password" isPassword value={confirmPass} onChangeText={setconfirmPass}/>
                <RenderError errorText={error} />
            </View>

            <View style={[styles.blockContainer, { marginTop: 30}]}>
                <Button 
                onPress={() => {handleSubmit()}}
                title="Continue" titleStyle={fontStyles.ProximaSemiBold} />
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
    resetPassToken: state.userReducer.resetPassToken
})

const mapDispatchToProps = {
    changePass
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)