import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
import { fontStyles } from '../../constants/fontStyles'


export const NotificationSettingList = ({
    title = "Title",
    onToggle = (isOn) => {},
    isOn = false
}) => {
    const [on, setOn] = useState(isOn)
    return(
        <View style={styles.rowSpaceBtw}>
            <View style={styles.blockContainer}>
                <Text style={fontStyles.ProximaRegularP1}>{title}</Text>
            </View>
            <View style={styles.blockContainer}>
                <ToggleSwitch
                    isOn={on}
                    onColor="#FFBE00"
                    offColor="red"
                    onToggle={e => {
                        setOn(e)
                        onToggle(e)
                    }}
                    />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rowSpaceBtw: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        backgroundColor: '#fff'
    },
    blockContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    itemContainer: {
        paddingVertical: 5,
    },
})
