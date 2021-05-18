import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/Header'
import { fontStyles } from '../../constants/fontStyles'

const TermsAndConditions = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Header 
              centerText="Terms & Conditions"
              leftIconName="arrow-back"
              leftButtonPress={() => navigation.goBack()}
            />
            <ScrollView>
                <View style={[styles.container, { paddingHorizontal: 15, backgroundColor: "#fff", paddingVertical: 20 }]}>
                    <Text style={[fontStyles.ProximaRegularP1, styles.text]}>{`At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur`}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default TermsAndConditions

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    text: {
        fontSize: 16,
        alignSelf: "center",
        // width: "90%"
    }
})
