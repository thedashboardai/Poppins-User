import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import { fontStyles } from '../../constants/fontStyles'

const { width, height } = Dimensions.get("screen")

const SearchFilter = ({
    isVisible = true,
    handleVisible = () => {}
}) => {
    return (
        <View style={styles.container}>
            <Modal
                isVisible={isVisible}
                onDismiss={handleVisible}
                swipeDirection="down"
                coverScreen
                collapsable
                deviceWidth={width}
                deviceHeight={height}
            >
                <View style={[styles.main]}>
                    <View style={[styles.blockContainer, styles.rowSpaceBtw]}>
                        <Text style={fontStyles.ProximaSemiBold}>
                            Filter Your Search
                        </Text>
                        <Text style={fontStyles.ProximaSemiBold}>
                            Filter Your Search
                        </Text>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default SearchFilter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf:'center'
    },
    main : { 
        backgroundColor: "#fff", 
        height: 500, 
        position: "absolute", 
        width: width + 100, 
        bottom: -15,
        right: 20
    },
    blockContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    itemContainer: {
        paddingVertical: 5,
    },
    rowSpaceBtw : {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
