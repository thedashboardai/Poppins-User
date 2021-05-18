import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DEFAULT_THEME_COLOR, DISABLE_BUTTON_COLOR, LIGHT_BUTTON_COLOR, DISABLE_BUTTON_TEXT_COLOR, FACEBOOK_BUTTON_COLOR } from '../../constants/colors'

import FontAwsome from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modal'
import { fontStyles } from '../../constants/fontStyles'
import Button from '../Button'

const googleLogo = require("../../assets/images/googleLogo.png")

const CustomModal = ({
    title = "Your order has been placed",
    discription = "You will receive a notification when you're nearby!",
    modalVisibel = false,
    setModalVisible = () => { },
    containerStyle = {},
    titleStyle = {},
    descriptionStyle = {},
    onPress = () => { },
    successIcon = true,
    btnHorizontal=false,
    buttons = [
        {
            title: "Close",
            containerStyle: {},
            titleStyle: {},
            lightTheme: false,
            disabled: false,
            backgroundColor: DEFAULT_THEME_COLOR,
            onPress: () => { },
            textColor: "#fff"
        },
        {
            title: "Close",
            containerStyle: {},
            titleStyle: {},
            lightTheme: true,
            disabled: false,
            backgroundColor: DEFAULT_THEME_COLOR,
            onPress: () => { },
            textColor: "#fff"
        },
    ]
}) => {



    return (
        <Modal
            isVisible={modalVisibel}
            animationIn="zoomInUp"
            animationOut="zoomOutDown"
            backdropOpacity={0.4}
            coverScreen
            animationInTiming={1000}
            animationOutTiming={1000}
            onBackButtonPress={() => setModalVisible(false)}
            onBackdropPress={() => setModalVisible(false)}>
            <View style={[{ backgroundColor: "#fff", borderRadius: 20, paddingVertical: 20, alignItems: "center" }, containerStyle]}>

               {successIcon && <View style={styles.successContainer} />}

                <Text style={[styles.titleStyle, { ...fontStyles.ProximaBoldH2, width: "95%", textAlign: "center" }, titleStyle]}>{title}</Text>


                <Text style={[styles.titleStyle, { ...fontStyles.ProximaRegularP2, textAlign: "center", width: "85%" }, descriptionStyle]}>{discription}</Text>


                <View style={{ width: "100%", marginTop: 20 }}>
                    <FlatList 
                      numColumns={btnHorizontal ? 2 : 0}
                      data={buttons}
                      renderItem={({item, index}) => <Button {...item} /> }
                    />
                </View>
            </View>
        </Modal>
    )
}


export default CustomModal


const styles = StyleSheet.create({
    successContainer: {
        backgroundColor: "#FFBE00",
        height: 60,
        width: 60,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    titleStyle: {
        marginTop: 20
    }
})
