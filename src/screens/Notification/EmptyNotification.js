import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import { fontStyles } from '../../constants/fontStyles'

const noti = require('../../assets/images/notificaiton.png')
export const NotificationEmpty = () => {

    return (
        <View style={[styles.main]}>
            <View style={styles.blockContainer}>
                <Image source={noti} style={styles.imgStyle}/>
            </View>

            <View style={styles.blockContainer}>
                <Text style={[fontStyles.ProximaSemiBold, { textAlign: 'center' }]}>No notifications yet</Text>
                <Text style={[fontStyles.ProximaRegularP1, styles.itemContainer, { textAlign: 'center' }]}>Stay tuned! Notifications about your activity will show up here</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    imgStyle : {
        height: 200, width: 200
    },
    blockContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginTop: 10
      },
    itemContainer: {
        paddingVertical: 5,
    },
})