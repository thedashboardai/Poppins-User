import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native'
import Button from '../../components/Button'
import { HorizontalCards } from '../../components/Cards/HorizontalCards'
import { PopularResturantsCard } from '../../components/Cards/PopularResturantCards'
import Input from '../../components/Input'
import { NotificationSettingList } from '../../components/List/notificationSettingList'
import { DEFAULT_THEME_COLOR } from '../../constants/colors'
import { fontStyles } from '../../constants/fontStyles'
import RenderError from '../../utils/renderError'
import { userLogin } from '../../stores/actions/user.action'
import { connect } from 'react-redux'

const SignIn = ({ navigation, userLogin }) => {

    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const validate = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        setUsernameError(username ? "" : "Username is required")
        setPasswordError(password ? "" : "Password is required")

        if (username && password) {
            return true

        } else {
            return false
        }
    }

    const handleSubmit = async () => {
        let formStatus = validate()

        if (formStatus) {
            const user = {
                "username": username,
                "password": password,
            }
            let { status } = await userLogin(user)
            if (status) {
                navigation.navigate("Home")
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

                    <View style={[styles.blockContainer, { marginTop: Platform.OS == "android" ? 0 : 50 }]}>
                        <View style={styles.itemContainer}>
                            <Text style={fontStyles.ProximaBoldH1}>Welcome back </Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={[fontStyles.ProximaRegularP2, { color: "#6A7C92" }]}>Sign in to your account</Text>
                        </View>
                    </View>

                    <View style={styles.blockContainer}>
                        <Input label="Enter Username" value={username} onChangeText={setUsername} keyboardType="default" />
                        <RenderError errorText={usernameError} />
                    </View>
                    <View style={styles.blockContainer}>
                        <Input label="Password" isPassword value={password} onChangeText={setPassword} keyboardType="default" />
                        <RenderError errorText={passwordError} />
                    </View>

                    <View style={styles.blockContainer}>
                        <Button onPress={() => navigation.navigate("ForgotPassword")} title="Forgot Password?" titleStyle={[fontStyles.ProximaRegularP2, { color: '#000' }]} backgroundColor="transparent" />
                    </View>

                    <View style={styles.blockContainer}>
                        <Button
                            onPress={() => handleSubmit()}
                            title="Sign in"
                            titleStyle={fontStyles.ProximaSemiBold}
                        />
                    </View>

                    <View style={styles.signUpText}>
                        <Text style={fontStyles.ProximaRegularP1}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                            <Text style={[fontStyles.ProximaRegularP1, { color: DEFAULT_THEME_COLOR }]}> Sign up</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.blockContainer}>
                        <Button
                            onPress={() => { }}
                            title={"Connect with Facebook"}
                            titleStyle={[fontStyles.ProximaSemiBold, {}]}
                            type="facebook"
                        />
                    </View>
                    <View style={styles.blockContainer}>
                        <Button
                            onPress={() => { }}
                            title={"Connect with Google"}
                            titleStyle={[fontStyles.ProximaSemiBold]}
                            type={"google"}
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

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    userLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);