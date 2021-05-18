import React from 'react'
import { View, Text, StyleSheet, ScrollView} from 'react-native'
import Header from '../../components/Header'
import { NotificationSettingList } from '../../components/List/notificationSettingList'

export const NotificationSetting = ({navigation}) => {

    const arr = [
        {
            name: "Push Notifications"
        },
        {
            name: "Email Notifications"
        },
        {
            name: "Order Updates"
        },
        {
            name: "Listing Updates"
        },
        {
            name: "Newsletters"
        },
    ]
    return(
        <View>
            <Header 
            leftButtonPress={() => navigation.goBack()}
            centerText="Notification Setting" 
            leftIconName="arrow-back" />
            {arr.map((val, ind) => {
                return <NotificationSettingList title={val.name} key={ind} />
            })}
        </View>
    )
}