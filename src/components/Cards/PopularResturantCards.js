import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { fontStyles } from '../../constants/fontStyles'

const item = require('../../assets/images/item.png')
const start = require('../../assets/images/star.png')
export const PopularResturantsCard = ({
    containerStyle = {},
    imageUrl = item,
    imageStyle = {},
    itemContainerStyle = {},
    title = "Subway",
    titleStyle = {},
    distance = "4 miles",
    distanceStyle = {},
    rating = "4.8",
    ratingStyle = {},
    onPress = () => { }
}) => {



    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.defaultConatinerStyle, containerStyle]}>
            <Image source={imageUrl} style={[styles.defaultImageStyle, imageStyle]} />
            <View style={[styles.defaultItemContainerStyle, itemContainerStyle]}>
                <Text style={[fontStyles.ProximaSemiBoldSmall, titleStyle]}>{title}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[fontStyles.ProximaRegularP2, distanceStyle]}>
                        {distance}
                    </Text>
                    <Text> . </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={start} style={{ top: 2, paddingHorizontal: 3 }} />
                        <Text style={[fontStyles.ProximaRegularP2, ratingStyle]}>
                            {rating}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const styles = StyleSheet.create({
    defaultConatinerStyle: {
    },
    defaultImageStyle: {
        borderRadius: 10,
        width: 189,
        height: 228
    },
    defaultItemContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: 10
    },
})

