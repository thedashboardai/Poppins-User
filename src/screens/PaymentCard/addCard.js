import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet} from 'react-native'
import { color } from 'react-native-reanimated'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Input from '../../components/Input/index'
import CustomModal from '../../components/Modal'
import { fontStyles } from '../../constants/fontStyles'

export const AddCard = ({
    navigation,

}) => {
    const [holderName, setHolderName] = useState('')
    const [show, setShow] = useState(false)

    return(
        <View style={styles.main}>
            <CustomModal 
                modalVisibel={show}
                title="Done!"
                discription="Thank you! Your card has been added successfully"
                descriptionStyle={fontStyles.ProximaSemiBold}
                buttons= {[
                    {
                        title: "Close",
                        onPress: () => {
                            setShow(!show)
                            navigation.navigate('Home')
                        }
                    },
                ]}
            />
            <Header centerText="Credit / Debit Card" leftIconName="arrow-back" leftButtonPress={() => navigation.goBack()}/>
            <ScrollView>
                <View style={styles.blockContainer}>
                    <Text style={[fontStyles.ProximaRegularP1, {color: '#6A7C92', textAlign: 'center', marginVertical: 10}]}>
                         We partner with Stripe to ensure that your credit card details are kept safe and secure. Prox will not have access to your credit card info
                    </Text>
                </View>

                <View style={styles.blockContainer}>
                    <View style={styles.blockContainer}>
                        <Input label="Card Holder Name" onChangeText={(e) => setHolderName(e)} value={holderName}/>
                    </View>
                    <View style={styles.blockContainer}>
                        <Input 
                            label="Card Number" 
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={[styles.blockContainer, styles.rowSpaceBtw]}>
                        <Input 
                            label="Exp. Date" 
                            keyboardType='numeric' 
                            containerStyle={{width: '68%', right: 40}}
                        />
                        <Input 
                            label="CVV" 
                            keyboardType='numeric' 
                            labelStyle={{right: 40}}
                            containerStyle={{width: '68%', right: 80}}
                        />
                    </View>
                </View>
            </ScrollView>
            <Button 
                title="Submit"    
                titleStyle={fontStyles.ProximaSemiBold} 
                containerStyle={{ position: 'absolute', bottom: 40}} 
                onPress={() => setShow(!show)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff'
    },  
    blockContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    itemContainer: {
        paddingVertical: 5,
    },
    rowSpaceBtw: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
    
})