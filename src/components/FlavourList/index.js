import React, { useState } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { fontStyles } from '../../constants/fontStyles';


export const FlavouredList = ({
    name = "flavour name",
    price = "5.00",
    disabled = false,
    onValueChange = (newVal) => {}
}) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    return(
        <View style={[styles.main, styles.rowSpaceBtw]}>
            <View style={[styles.row]}>
                <CheckBox
                    disabled={disabled}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => {
                        setToggleCheckBox(newValue)
                        onValueChange(newValue)
                    }}
                />
                <View style={styles.itemContainer}>
                    <Text style={[fontStyles.ProximaRegularP2, { color: '#6A7C92' }]}>{name}</Text>
                </View>
            </View>
            <View>
                <Text style={[fontStyles.ProximaRegularP2, { color: '#6A7C92' }]}> ${price}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    main : {
        // flex: 1,
        width: '100%',
        marginVertical: 5
    },
    row : {
        flexDirection: 'row'
    },
    rowSpaceBtw: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemContainer: {
        padding: 5,
    },
})