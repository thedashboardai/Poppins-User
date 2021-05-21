import React from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fontStyles } from '../../constants/fontStyles'

const Header = ({
    centerText = "",
    leftIcon = true,
    leftIconName = "",
    leftButtonPress = () => { },
    renderRightComponent = () => { },
    containerStyle = {}
}) => {
    return (
        <View style={[styles.headerContainer, containerStyle]}>
            {leftIcon && (
                <TouchableOpacity style={styles.leftContainer} onPress={leftButtonPress} >
                    <Ionicons name={leftIconName} size={25} />
                </TouchableOpacity>
            )}
            <View>
                <Text style={[styles.centerText, fontStyles.ProximaSemiBold]}>{centerText}</Text>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        borderBottomColor: "#E6F0FC",
        borderBottomWidth: 1,
        height: Platform.OS == "ios" ? 90 : 60,
        backgroundColor: "#fff",
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Platform.OS == "ios" ? 40: 0
    },
    leftContainer: {
        position: "absolute",
        top: Platform.OS == "ios" ? 50 : undefined,
        left: 20,
        alignSelf: "center"
    },
    centerText: {
        
    }
})
