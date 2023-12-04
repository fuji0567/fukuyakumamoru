import { View, Text, StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"

export default function MedicationStatus({ props }) {
    const { day, morning, afternoon, evening, night } = props
    return(
        <View style={style.wrap}>
            <Text style={style.textDay}>{day}</Text>
            <View style={morning ? style.boxTrue : style.boxFalse}></View>
            <View style={afternoon ? style.boxTrue : style.boxFalse}></View>
            <View style={evening ? style.boxTrue : style.boxFalse}></View>
            <View style={night ? style.boxTrue : style.boxFalse}></View>
        </View>
    )
}

const style = StyleSheet.create({
    boxTrue: {
        backgroundColor : "orange",
        width : wp("15%"),
        height : wp("15%"),
        margin : 5,
    },
    boxFalse: {
        backgroundColor : "white",
        width : wp("15%"),
        height : wp("15%"),
        margin : 5,
        borderColor: "gray",
        borderWidth: 1
    },
    wrap: {
        backgroundColor: "white",
        borderRadius: 15,
        flexDirection : "row",
        padding: wp("1%"),
        marginBottom: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    textDay: {
        width : wp("15%"),
        height : wp("15%"),
        fontSize: wp("8%"),
        fontWeight: "600",
        lineHeight: wp("15%"),
        textAlign: "center",
        justifyContent: "center",
        margin: 5
    }
})
