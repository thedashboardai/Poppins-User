import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DEFAULT_THEME_COLOR, DISABLE_BUTTON_COLOR, LIGHT_BUTTON_COLOR, DISABLE_BUTTON_TEXT_COLOR, FACEBOOK_BUTTON_COLOR } from '../../constants/colors'

import FontAwsome from 'react-native-vector-icons/FontAwesome'


const googleLogo = require("../../assets/images/googleLogo.png")

const Button = ({
    title = "BUTTON TITLE",
    containerStyle = {},
    titleStyle = {},
    lightTheme = false,
    disabled = false,
    backgroundColor = DEFAULT_THEME_COLOR,
    onPress = () => { },
    textColor = "#fff",
    type = "facebook" | "google"
}) => {


    const facebookButton = () => {
        return (
            <TouchableOpacity
                disabled={disabled}
                activeOpacity={.6}
                style={[
                    styles.container,
                    {
                        backgroundColor: disabled ? DISABLE_BUTTON_COLOR : FACEBOOK_BUTTON_COLOR
                    },
                    containerStyle
                ]}
                onPress={onPress}
            >
                <FontAwsome name="facebook-square" color={disabled ? DISABLE_BUTTON_TEXT_COLOR : "#fff"} size={25} />
                <Text style={[styles.title, { color: disabled ? DISABLE_BUTTON_TEXT_COLOR : "#fff" }, titleStyle, styles.socialTitle]}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    }

    const googleButton = () => {
        return (
            <TouchableOpacity
                disabled={disabled}
                activeOpacity={.6}
                style={[
                    styles.container,
                    {
                        backgroundColor: disabled ? DISABLE_BUTTON_COLOR : LIGHT_BUTTON_COLOR
                    },
                    containerStyle
                ]}
                onPress={onPress}
            >
                <Image source={googleLogo} style={{ height: 25, width: 25 }} />
                <Text style={[styles.title, { color: disabled ? DISABLE_BUTTON_TEXT_COLOR : "#000" }, titleStyle, styles.socialTitle]}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    }


    if (type == 'facebook') {
        return facebookButton()

    } 
    
    else if(type == 'google'){
        return googleButton()
    }
    
    else {
        return (
            <TouchableOpacity
                disabled={disabled}
                activeOpacity={.6}
                style={[
                    styles.container,
                    {
                        backgroundColor: disabled ? DISABLE_BUTTON_COLOR : (lightTheme ? LIGHT_BUTTON_COLOR : backgroundColor)
                    },
                    containerStyle
                ]}
                onPress={onPress}
            >
                <Text style={[styles.title, { color: disabled ? DISABLE_BUTTON_TEXT_COLOR : (lightTheme ? DISABLE_BUTTON_TEXT_COLOR : textColor) }, titleStyle]}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default Button

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 60,
        alignSelf: 'center',
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row'
    },
    title: {
        // marginStart: 15
    },
    socialTitle: {
        marginStart: 15
    }
})
