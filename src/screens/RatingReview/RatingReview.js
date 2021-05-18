import React, { useState } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import Header from '../../components/Header'
import { DEFAULT_THEME_COLOR } from '../../constants/colors'
import { fontStyles } from '../../constants/fontStyles'
import { Rating, AirbnbRating } from 'react-native-ratings';
import Chips from '../../components/Chips'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { ScrollView } from 'react-native-gesture-handler'
import CustomModal from '../../components/Modal'


export const RatingReview = ({navigation}) => {

    const [show, setShow] = useState(false)

    return(
        <View style={{backgroundColor: '#fff', height: '100%'}}>
            <CustomModal
                modalVisibel={show} 
                successIcon 
                title = "Rating Sent"
                discription = "Thanks for giving us feedback. It will help us to improve our app" buttons={[
                {
                    title: "Close",
                    onPress: () => {
                        navigation.navigate('Home')
                        setShow(false)
                    },
                }
            ]} />
            <Header centerText="Rate" leftButtonPress={navigation.goBack} />
            <ScrollView>
                <View style={styles.blockContainer}>
                    <Text style={[fontStyles.ProximaSemiBold, {color: DEFAULT_THEME_COLOR, marginVertical: 15, textAlign: 'center'}]}>Give us Rating!</Text>

                    <View style={styles.itemContainer}>
                        <Text style={[fontStyles.ProximaRegularP1, {color: '#6A7C92', textAlign: 'center'}]}>It will help us to improve our application</Text>
                    </View>

                    <AirbnbRating
                        count={5}
                        defaultRating={11}
                        size={30}
                        />
                </View>


                <View style={styles.blockContainer}>
                    <View style={styles.itemContainer}>
                        <Text style={[fontStyles.ProximaSemiBold, {marginVertical: 15, textAlign: 'center'}]}>What do you like?</Text>
                    </View>
                    <View>
                        <Chips 
                            data={["Taste", "Time", "Convinient", "Followed Instructions", "Service"]}
                            numColumns={4}
                            selectionEnabled
                        />
                    </View>
                </View>

                <View style={styles.blockContainer}>
                    <View style={styles.itemContainer}>
                        <Text style={[fontStyles.ProximaSemiBold, {marginVertical: 15, textAlign: 'center'}]}>Leave Comment</Text>
                    </View>
                    <View>
                        <Input numberOfLines={10} multiline={true} label="" placeholder="Write a message" inputStyle={{height: 100}} />
                    </View>
                </View>
            </ScrollView>

            <View style={[styles.blockContainer, {position: 'absolute', bottom: 20, width: '100%'}]}>
                <Button 
                    onPress={() => setShow(true)}
                    title="Submit" 
                    titleStyle={fontStyles.ProximaSemiBoldSmall} 
                />
            </View>

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