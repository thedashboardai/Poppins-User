import React, { createRef, forwardRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import ActionSheet from "react-native-actions-sheet";
import { fontStyles } from "../../constants/fontStyles";
import Ionicons from 'react-native-vector-icons/Ionicons'
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import CustomMarker from "./CustomMarker";
import CustomLabel from "./CustomLabel";
import Chips from '../Chips/index'

export const SearchFilter = forwardRef(({
    onClose = () => ref.current?.setModalVisible(),
}, ref) => {


    const [
        nonCollidingMultiSliderValue,
        setNonCollidingMultiSliderValue,
      ] = React.useState([0, 100]);
      
     const nonCollidingMultiSliderValuesChange = values => setNonCollidingMultiSliderValue(values);
    return(
        <ActionSheet containerStyle={styles.mainContainer} ref={ref}>
            <View style={[styles.container]}>
                    <View style={[styles.blockContainer, styles.rowSpaceBtw]}>
                        <Text style={fontStyles.ProximaSemiBold}>
                            Filter Your Search
                        </Text>
                        <TouchableOpacity activeOpacity={.6} onPress={onClose} style={[styles.closeContainerStyle]}>
                            <Ionicons color="#fff" name="close-outline" size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.blockContainer]}>
                        <Text style={fontStyles.ProximaRegularP2}>Distance</Text>
                        <View style={[styles.itemContainer, {alignItems: 'center'}]}>
                            <MultiSlider
                                values={[
                                nonCollidingMultiSliderValue[0],
                                nonCollidingMultiSliderValue[1],
                                ]}
                                selectedStyle={{backgroundColor:'#FFBE00'}}
                                unselectedStyle={{backgroundColor:'#F1F2FA'}}
                                sliderLength={280}
                                onValuesChange={nonCollidingMultiSliderValuesChange}
                                min={0}
                                max={100}
                                step={1}
                                allowOverlap={false}
                                snapped
                                minMarkerOverlapDistance={40}
                                customMarker={CustomMarker}
                                customLabel={CustomLabel}
                                enableLabel
                            />
                        </View>
                    </View>
                    <View style={[styles.blockContainer]}>
                        <Text style={fontStyles.ProximaRegularP2}>Price Ranges</Text>
                        <View style={[styles.itemContainer, {alignItems: 'center'}]}>
                            <MultiSlider
                                values={[
                                nonCollidingMultiSliderValue[0],
                                nonCollidingMultiSliderValue[1],
                                ]}
                                selectedStyle={{backgroundColor:'#FFBE00'}}
                                unselectedStyle={{backgroundColor:'#F1F2FA'}}
                                sliderLength={280}
                                onValuesChange={nonCollidingMultiSliderValuesChange}
                                min={0}
                                max={100}
                                step={1}
                                allowOverlap={false}
                                snapped
                                minMarkerOverlapDistance={40}
                                customMarker={CustomMarker}
                                customLabel={CustomLabel}
                                enableLabel
                            />
                        </View>
                    </View>
                    <View style={[styles.blockContainer]}>
                        <Text style={fontStyles.ProximaRegularP2}>Rating</Text>
                        <Chips
                                data={[
                                    1,2,3,4,5
                                ]}
                                chipTextStyle={{ color: "#6A7C92" }}
                                onChipPress={(item, selected) => console.log("item", item, selected)}
                                selectionEnabled
                                withImage
                                numColumns={4}
                            />
                    </View>
                    <View style={[styles.blockContainer]}>
                        <Text style={fontStyles.ProximaRegularP2}>Tags</Text>
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
                                chipTextStyle={{ color: "#6A7C92" }}
                                onChipPress={(item, selected) => console.log("item", item, selected)}
                                selectionEnabled
                            />
                    </View>
                </View>
        </ActionSheet>

    )
})

const styles = StyleSheet.create({
    mainContainer: {
        width:'99%', 
        borderRadius: 20
    },
    container: {
        // flex: 1,
        paddingVertical: Platform.OS == "ios" ? 20 : 10
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
    },
    closeContainerStyle: {
        bottom: 5,
        backgroundColor: '#6A7C92', 
        borderRadius: 20
    }
})