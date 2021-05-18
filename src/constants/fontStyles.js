import { Platform, StyleSheet } from 'react-native'

export const fontStyles = StyleSheet.create({
 ProximaBoldH1 : {
     fontFamily: "ProximaNova-Bold",
     fontSize: Platform.Os == "ios" ? 28 : 25
 },
 ProximaBoldH2 : {
    fontFamily: "ProximaNova-Bold",
    fontSize: Platform.Os == "ios" ?  21 : 18
},
ProximaSemiBold: {
    fontFamily: "ProximaNova-Semibold",
    fontSize: Platform.Os == "ios" ? 20 : 18
},
ProximaSemiBoldSmall: {
    fontFamily: "ProximaNova-Semibold",
    fontSize: Platform.Os == "ios" ? 16 : 14
},
ProximaRegularP1: {
    fontFamily: "ProximaNova-Regular",
    fontSize: Platform.Os == "ios" ? 18 : 16
},
ProximaRegularP2: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 14 
}
})