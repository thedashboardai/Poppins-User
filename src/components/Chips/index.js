import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fontStyles } from '../../constants/fontStyles'

const Chips = ({
    data = ["McDonald's", "Pizza", "Burger King", "Chicken wings"],
    onChipPress = (item = String,  selected = Array) => { },
    containerStyle = {},
    chipStyle = {},
    chipTextStyle = {},
    selectionEnabled = false,
    numColumns = 3,
    withImage = false,
    imagePath = require('../../assets/images/greyStart.png')
}) => {
    const [selected, setSelected] = useState([])
    const [bool, setbool] = useState(false)

    const onChipPressFunct = (item, index) => {
        if(selectionEnabled) { 
            const index1= selected.findIndex(e => e === item)
            if(index1 != -1) {
                selected.splice(index, 1)
            }else {
                selected.push(item)
            } 
            setSelected(selected)
          
            setbool(!bool)
            return onChipPress(item, selected)
        }else {
            setbool(!bool)
            return onChipPress(item, [item])
        }
    }
    return (
        <View style={[styles.container, containerStyle]}>
            <FlatList
                data={data}
                // horizontal
                keyExtractor={(item) => String(item)}
                extraData={bool}
                key={'h'}
                numColumns={numColumns}
                contentContainerStyle={styles.chipsWrapper}
                renderItem={({ item, index }) => {
                    if(!selectionEnabled) {
                        return (
                            <TouchableOpacity onPress={() => onChipPressFunct(item, index)} style={[styles.chip, chipStyle, withImage ? styles.row : {},]}>
                                <Text style={[styles.chipText, fontStyles.ProximaRegularP2, chipTextStyle]}>{item}</Text>
                                {withImage && <Image source={imagePath} style={{marginHorizontal: 5, top: 5}} />}
                            </TouchableOpacity>
                        )
                    }else {
                       const index = selected.findIndex(e => e === item)
                       if(index != -1) {
                            return (
                                <TouchableOpacity onPress={() => onChipPressFunct(item, index)} style={[styles.chip, chipStyle, withImage ? styles.row : {}, {backgroundColor: '#c5c6c9'}]}>
                                    <Text style={[styles.chipText, fontStyles.ProximaRegularP2, chipTextStyle]}>{item}</Text>
                                    {withImage && <Image source={imagePath} style={{marginHorizontal: 5, top: 5}} />}
                                </TouchableOpacity>
                            )
                       }else {
                        return (
                            <TouchableOpacity onPress={() => onChipPressFunct(item, index)} style={[styles.chip, chipStyle, withImage ? styles.row : {},]}>
                                <Text style={[styles.chipText, fontStyles.ProximaRegularP2, chipTextStyle]}>{item}</Text>
                                {withImage && <Image source={imagePath} style={{marginHorizontal: 5, top: 5}} />}
                            </TouchableOpacity>
                        )
                       }
                    }
                }}
            />
        </View>
    )
}

export default Chips

const styles = StyleSheet.create({
    container: {
        width: "95%", 
        alignSelf: "center"
    },
    chipsWrapper: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    chip: {
        backgroundColor: "#F1F2FA",
        margin: 5,
        // padding: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 50,
    },
    row: {
        flexDirection: 'row'
    }
})
