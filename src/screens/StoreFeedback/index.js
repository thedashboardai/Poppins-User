/* eslint-disable no-console */
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { FeedbackCard } from '../../components/Cards/FeedbackCard'
import Header from '../../components/Header'

const StoreFeedback = ({ navigation, route }) => {
  const [reviews, setReviews] = useState([])

  const getReviews = async () => {
    const res = await axios.get(
      'http://poppins-lb-1538414865.us-east-2.elb.amazonaws.com/reviews/get_reviews/' +
        route.params.merchant.id
    )
    console.log('##################', res.data)
    setReviews(res.data.payload)
  }

  useEffect(() => {
    getReviews()
  }, [])
  return (
    <View style={styles.container}>
      <Header
        centerText="Store Feedback"
        leftIconName="arrow-back"
        leftButtonPress={navigation?.goBack}
      />
      <ScrollView>
        {reviews?.length ? (
          <View style={styles.container}>
            {reviews.map(review => (
              <FeedbackCard review={review} key={review.id} />
            ))}
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>No reviews yet</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default StoreFeedback

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2FA',
    paddingTop: 20,
    marginTop: Platform.OS == 'ios' ? 0 : 20
  }
})
