import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-tiny-toast'

export const NumericInput = ({
    containerStyle = {},
    leftIconName = "add-outline",
    righIconName = "remove-outline",
    leftIconColor = "#fff",
    rightIconColor = "#fff",
    intialValue = 0,
    editable = false,
    inputContainerStyle = {},
    inputStyle = {},
    onChange = (e) => {},
    minValue = 0,
    maxValue = 10,
    showBtn = true,
    btnText = "Add to cart",
    btnStyle = {},
    btnTextStyle = {},
    size = 100,
    step = 1
}) => {

    const [initialValueState, setInitialValue] = useState(intialValue)
    
    const onIncrement = () => {
        if (initialValueState < maxValue){
            setInitialValue(initialValueState + step)
        }else {
            Toast.show('Reached maximum value!')
        }
    }

    const onDecrement = () => {
        if (initialValueState > minValue){
            setInitialValue(initialValueState - step)
        }else {
            Toast.show('Reached minimum value!')
        }
    }

    const onChangeText = (e) => {
        if (e < minValue){
            Toast.show('Reached minimum value!')
        }else if(e > maxValue) {
            Toast.show('Reached maximum value!')
        }else if(e != "") {
            setInitialValue(Number(e))
        }
    }
    return(
        <View style={[styles.defaultContainerStyle, containerStyle , {width: size}]}>
           {(showBtn && initialValueState <= minValue) ?
           <>
            <TouchableOpacity onPress={onIncrement} style={[styles.defaultBtnStyle, btnStyle]}>
                <Text style={[styles.defaultBtnTextStyle ,btnTextStyle]}>{btnText}</Text>
            </TouchableOpacity>
           </>
           :
           <>
           <View style={[styles.defaultLeftIconContainerStyle, {width: size/3, height: size/3}]}>
                <Ionicons
                    onPress={onIncrement}
                    size={25}
                    name={leftIconName}
                    color={leftIconColor}
                    />
            </View>
            <View style={[styles.defaultInputContainerStyle, inputContainerStyle, {width: size/2.5, height: size/3}]}>
                <TextInput
                    editable={editable}
                    value={initialValueState.toLocaleString()}
                    defaultValue={initialValueState.toLocaleString()}
                    keyboardType="number-pad"
                    style={[styles.defaultInputStyle, inputStyle, {width: size/2.5, height: size, fontSize: size/8}]}
                    onContentSizeChange={onChange(initialValueState)}
                    onChangeText={onChangeText}
                    />
            </View>
            <View style={[styles.defaultRightIconContainerStyle , {width: size/3, height: size/3}]}>
                <Ionicons
                    onPress={onDecrement}
                    size={25}
                    name={righIconName}
                    color={rightIconColor}
                    />
            </View>
            </>}
        </View>
    )
}

const styles = StyleSheet.create({
    defaultContainerStyle : {
        flexDirection: 'row',
    },
    defaultLeftIconContainerStyle: {
        backgroundColor: '#FFBE00',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems:'center'
    },
    defaultRightIconContainerStyle: {
        backgroundColor: '#FFBE00',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems:'center'
    },
    defaultInputContainerStyle : {
        backgroundColor:'#E6F0FC',
        borderRadius: 5,
        justifyContent:'center'
    },
    defaultInputStyle: {
        width: 30, 
        color:'#000', 
        textAlign:'center' 
    },
    defaultBtnStyle: {
        backgroundColor: '#FFBE00',
        padding: 10,
        borderRadius: 5
    },
    defaultBtnTextStyle : {
        color: '#fff',
        fontWeight: 'bold'
    }
})