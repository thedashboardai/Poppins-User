import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native'
import Button from '../../components/Button'
import Header from '../../components/Header'
import { Map } from '../../components/Map/map'

import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomModal from '../../components/Modal'
import { useState } from 'react'

const Selectlocation = ({ navigation }) => {
    const [succesModal, setsuccesModal] = useState(false)

    return (
        <View>
            <Header
                centerText={"Select Location"}
                leftButtonPress={() => navigation.goBack()}
            />
            <SafeAreaView >

                <CustomModal
                    modalVisibel={succesModal}
                    successIcon
                    title="Location Saved!"
                    discription={"You can start browsing nearby restaurant to your place."}
                    setModalVisible={setsuccesModal}
                    buttons={[{
                        title: "Close",
                        onPress: () => setsuccesModal(false)
                    }]}
                />

                <Map />

                <TouchableOpacity onPress={() => navigation.navigate("SearchGooglePlaces")} activeOpacity={0.7} style={styles.inputContainer}>
                    <Ionicons name={"search"} size={20} />
                    <TextInput
                        editable={false}
                        placeholder="Enter Location"
                        style={{ paddingHorizontal: 10 }}
                    />
                </TouchableOpacity>

                <Button
                    title={"Save Location"}
                    containerStyle={{ position: "absolute", bottom: 40 }}
                    onPress={() => setsuccesModal(true)}
                />

            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        flex: 1,
    },
    inputContainer: {
        position: "absolute",
        top: 20,
        backgroundColor: "#fff",
        width: "90%",
        alignSelf: "center",
        paddingVertical: Platform.OS == "android" ? 0 : 15,
        borderColor: "#CFD5DC",
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    }
})

export default Selectlocation;