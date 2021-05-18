import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fontStyles } from '../../constants/fontStyles'

import Ionicons from "react-native-vector-icons/Ionicons"

// const selectedImage = 

const PaymentRadio = ({
    selected = false,
    leftImage = "",
    imageStyle = {},
    containerStyle = {},
    title = "",
    onPress = () => { }
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={[
                styles.container,
                { borderColor: selected ? "#FFBE00" : "#E3E6EB" },
                containerStyle]}>
            {leftImage ? <Image
                source={leftImage}
                style={[{ height: 30, width: 40 }, imageStyle]}
            /> : null}

            <Text style={[fontStyles.ProximaRegularP2, styles.titleText]}>{title}</Text>

            <Ionicons
                name={selected ? "radio-button-on" : "radio-button-off"}
                size={20}
                style={{ position: "absolute", right: 15 }}
                color={selected ? "#FFBE00" : "#E3E6EB"}
            />
        </TouchableOpacity>
    )
}

export default PaymentRadio

const styles = StyleSheet.create({
    container: {
        borderColor: "#E3E6EB",
        borderWidth: 1,
        width: "90%",
        alignSelf: "center",
        paddingVertical: 15,
        paddingHorizontal: 15



        ,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    titleText: {
        marginStart: 10
    }
})
