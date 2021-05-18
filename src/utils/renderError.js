import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { fontStyles } from '../constants/fontStyles'

const RenderError = ({
    errorText = ""
}) => {
    if (errorText) {
        return (
            <Text style={styles.errorText}>{errorText}</Text>
        )
    } else {
        return null
    }
}

export default RenderError

const styles = StyleSheet.create({
    errorText: {
        color: "red",
        textAlign: 'right',
        ...fontStyles.ProximaRegularP2,
    }
})
