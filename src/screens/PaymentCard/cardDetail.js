import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, FlatList} from 'react-native'
import Button from '../../components/Button'
import Header from '../../components/Header'
import List from '../../components/List'
import CustomModal from '../../components/Modal'
import { fontStyles } from '../../constants/fontStyles'

export const CardDetail = ({
    navigation,
}) => {

    const [show, setShow] = useState(false)
    return(
        <View style={{flex: 1}}>
            <CustomModal 
                modalVisibel={show}
                title="Are you sure you want to delete this card?"
                btnHorizontal
                buttons= {[
                    {
                        title: "yes",
                        lightTheme: true,
                        containerStyle: {width: '45%', marginHorizontal: 10},
                        onPress: () => {
                            setShow(!show)
                            navigation.navigate('Home')
                        }
                    },
                    {
                        title: "No",
                        containerStyle: {width: '45%'},
                        onPress: () => {
                            setShow(!show)
                            navigation.navigate('Home')
                        }
                    }
                ]}
            />
            <Header centerText="Payment Card" leftIconName="arrow-back" leftButtonPress={() => navigation.goBack()}/>

            <List 
                divider
                containerStyle={{backgroundColor: '#fff', padding: 15}}
                title="Credit Card Type" 
                subtitle="VISA"  
                titleStyle={{color: '#000'}} 
                subTitleStyle={fontStyles.ProximaRegularP1} 
            />
            <List 
                divider
                containerStyle={{backgroundColor: '#fff', padding: 15}}
                title="Card Number" 
                subtitle="1234567890"  
                titleStyle={{color: '#000'}} 
                subTitleStyle={fontStyles.ProximaRegularP1} 
            />

            <Button 
                title="Delete Card"    
                titleStyle={fontStyles.ProximaSemiBold} 
                containerStyle={{ position: 'absolute', bottom: 40}} 
                onPress={() => setShow(!show)}
            />
        </View>
    )
}