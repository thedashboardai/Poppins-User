import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView} from 'react-native'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Input from '../../components/Input'
import CustomModal from '../../components/Modal'
import { DEFAULT_THEME_COLOR } from '../../constants/colors'
import { fontStyles } from '../../constants/fontStyles'

export const ContactUs = ({navigation}) => {

    const [show, setShow] = useState(false)
    return(
        <View style={{backgroundColor: '#fff', height: '100%'}}>
            <CustomModal
                modalVisibel={show} 
                successIcon 
                title = "Message Sent"
                discription = "Thanks for messaging. We will response as soon as possible." buttons={[
                {
                    title: "Close",
                    onPress: () => {
                        navigation.navigate('Home')
                        setShow(false)
                    }
                }
            ]} />
            <Header centerText="Contact Us" leftIconName="arrow-back" leftButtonPress={() => navigation.navigate('Home')} />
            <ScrollView>
                <View style={styles.blockContainer}>
                    <Text style={[fontStyles.ProximaSemiBold, {color: DEFAULT_THEME_COLOR, marginVertical: 15, textAlign: 'center'}]}>Send us a messages</Text>

                    <View style={styles.itemContainer}>
                        <Text style={[fontStyles.ProximaRegularP1, {color: '#6A7C92', textAlign: 'center'}]}>Get in touch with us if you need help</Text>
                    </View>
                </View>

                <View style={styles.blockContainer}>
                    <Input label="Title"  labelStyle={fontStyles.ProximaRegularP1}/>
                </View>
                <View style={styles.blockContainer}>
                    <Input
                        multiline
                        numberOfLines={10}
                        inputStyle={{height: 100}}
                        label="Message" 
                        placeholder="Write a message" 
                        labelStyle={fontStyles.ProximaRegularP1}/>
                </View>
                <View style={[styles.blockContainer, {marginVertical: 20}]}>
                    <Button onPress={() => setShow(true)} title="Submit" />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    blockContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
      },
    itemContainer: {
        paddingVertical: 5,
      },
})