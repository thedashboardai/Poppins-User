import React from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    TouchableOpacity, StyleSheet, ScrollView, Alert, Platform, FlatList
} from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { fontStyles } from '../../constants/fontStyles'
import SearchHeader from '../../components/SearchHeader'
import Chips from '../../components/Chips'
import { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"

const Search = ({ navigation, user }) => {
    const dispatch = useDispatch()

    const [searchtext, setSearchText] = useState("")

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView>
                <ScrollView>
                    <SearchHeader
                        placeholder="What are you looking for?"
                        containerStyle={{ marginTop: Platform.OS == "android" ? 15 : 35 }}
                        backButton
                        inputRightIconName="close"
                        onChangeText={(t) => setSearchText(t)}
                        searchValue={searchtext}
                        onBackButtonPress={() => navigation.goBack()}
                        onRightIconPress={() => setSearchText("")}
                    />

                    {!searchtext ? <>
                        <View style={styles.blockContainer}>
                            <Text style={fontStyles.ProximaSemiBold}>
                                Popular searches
                        </Text>
                        </View>

                        <View>
                            <Chips
                                data={[
                                    "McDonald's",
                                    "Pizza",
                                    "Burger King",
                                    "Chicken wings",
                                    "Burger",
                                    "Pasta",
                                    "Greenwich",
                                    "Coffee",
                                    "Steak",
                                ]}
                                chipTextStyle={{ color: "#6905DB" }}
                                onChipPress={(item, index, selected) => console.log("item", item, index, selected)}
                                selectionEnabled

                            />
                        </View>
                    </>
                        : <FlatList
                            contentContainerStyle={{ marginTop: 20 }}
                            data={new Array(3).fill("Burger King")}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={styles.searchList}>
                                        <Ionicons size={20} name="search" color="#6A7C92" />
                                        <Text style={[styles.searchResultText, fontStyles.ProximaRegularP2]}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />}


                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        flex: 1,
    },
    blockContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginTop: 10
    },
    itemContainer: {
        paddingVertical: 5,
    },
    searchList: {
        flexDirection: "row",
        width: "95%",
        alignSelf: "center",
        alignItems: "center",
        padding: 10
    },
    searchResultText: {
        marginStart: 10,
        color: "#222533"
    }
})

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, null)(Search)
