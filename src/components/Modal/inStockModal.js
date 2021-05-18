import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const InStockModal = ({
    title = "1 pc Chicken Mcdo w/ Rice",
    discription = "How long will the item be deactivated?",
    modalVisibel = false,
    setModalVisible = () => { },
    containerStyle = {},
    titleStyle = {},
    descriptionStyle = {},
    onPress = () => { },
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

export default InStockModal

const styles = StyleSheet.create({})
