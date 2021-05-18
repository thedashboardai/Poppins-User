import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, FlatList} from 'react-native'
import Button from '../../components/Button'
import Header from '../../components/Header'
import List from '../../components/List'
import { fontStyles } from '../../constants/fontStyles'
import { EmptyCard } from './emptyCard'
const visa = require('../../assets/images/visa.png')
export const PaymentCard = ({
    navigation,
}) => {
    const [cardArr] = useState([
        {
            avatarImage: visa,
            title: "Visa",
            type: 'debit',
            cardNumber: '1234',
            default: true
        },
        {
            avatarImage: visa,
            title: "Visa",
            type: 'debit',
            cardNumber: '1234',
            default: false
        },
    ])
    return(
        <View style={{flex: 1}}>
            <Header centerText="Payment Card" leftIconName="arrow-back" leftButtonPress={() => navigation.goBack()}/>

            <FlatList 
                data={cardArr}
                renderItem={({ item }) => {
                    return <List 
                                onPress={() => navigation.navigate("CardDetail")}
                                divider
                                defaultKey={item.default}
                                containerStyle={{backgroundColor: '#fff', padding: 15}}
                                title={item.title} 
                                image={item.avatarImage} 
                                subtitle={`${item.type}....${item.cardNumber}`}  
                                titleStyle={{color: '#000'}} 
                                subTitleStyle={fontStyles.ProximaRegularP1} 
                            />
                }}
            />
            {/* <EmptyCard /> */}

            <Button 
                onPress={() => navigation.navigate('AddCard')}
                title="Add New Credit / Debit Card" 
                titleStyle={fontStyles.ProximaSemiBold} 
                containerStyle={{ position: 'absolute', bottom: 40}} 
            />
        </View>
    )
}