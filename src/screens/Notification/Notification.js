import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import { NotificationCard } from '../../components/Cards/NotificationCard'
import Header from '../../components/Header'
import { NotificationEmpty } from './EmptyNotification'

export const Notification = ({
    navigation,
}) => {

    return (
        <View style={{flex: 1}}>
            <Header centerText={"Notification"} leftButtonPress={() => navigation.goBack()} />
            {[1,2,3,4,5].map((val, ind) => {
                return (
                    <NotificationCard key={ind} />
                )
            })}
            {/* <View style={styles.main}>
                <NotificationEmpty />
            </View> */}
        </View>
    )

}

const styles = StyleSheet.create({
    main : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgStyle : {
        height: 200, width: 200
    }
})