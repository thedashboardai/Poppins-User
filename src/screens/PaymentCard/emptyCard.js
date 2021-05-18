import React from 'react'
import { View, Text, Image, StyleSheet} from 'react-native'
import { fontStyles } from '../../constants/fontStyles'

const emptycard = require('../../assets/images/emptyCard.png')
export const EmptyCard = () => {
    return(
        <View style={styles.main}>
            <View style={styles.blockContainer}>
                <Image source={emptycard} />
            </View>
            <View style={styles.blockContainer}>
                <Text style={fontStyles.ProximaSemiBoldSmall}>Set up payment</Text>
            </View>
            <View style={styles.blockContainer}>
                <Text style={[fontStyles.ProximaRegularP1, {color:'#6A7C92'}]}>Add your card for seamless transactions</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100
    },
    blockContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    itemContainer: {
        paddingVertical: 5,
    },
})