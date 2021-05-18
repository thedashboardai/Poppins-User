import React from 'react'
import { View, Text, Image, StyleSheet} from 'react-native'
import Button from '../Button'
import { HorizontalCards } from '../Cards/HorizontalCards'
export const CompletedOrderCard = ({navigation}) => {

    return(
        <View>
            <View style={styles.blockContainer}>
                <HorizontalCards />
            </View>
            <View style={[styles.itemContainer, styles.rowSpaceBtw, styles.border, {width: '95%', alignSelf: 'center'}]}>
                <Button title="Re Order" containerStyle={{width: '45%'}} onPress={() => navigation.navigate('Checkout')} />
                <Button title="Rating" containerStyle={{width: '45%'}} lightTheme onPress={() => navigation.navigate('RatingReview')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    blockContainer: {
        // paddingVertical: 5,
        // paddingHorizontal: 15,
      },
    itemContainer: {
        paddingVertical: 5,
      },
    rowSpaceBtw : {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    border: {
        borderBottomColor: '#F1F2FA',
        borderBottomWidth: 1,
    }
})