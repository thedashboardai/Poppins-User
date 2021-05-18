import React from 'react'
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { FeedbackCard } from '../../components/Cards/FeedbackCard'
import Header from '../../components/Header'

const StoreFeedback = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header
                centerText="Strore Feedback"
                leftIconName="arrow-back"
                leftButtonPress={navigation?.goBack}
            />
            <ScrollView>
                <View style={styles.container}>
                    {[1, 2, 3, 4].map(val => <FeedbackCard />)}
                </View>
            </ScrollView>
        </View>
    )
}

export default StoreFeedback

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F2FA",
        marginTop : Platform.OS == "ios" ? 0 : 20
    }
})
