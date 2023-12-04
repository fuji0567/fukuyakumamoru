import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"
import { AntDesign } from '@expo/vector-icons';

export default function WeekSetting({props,onPress}) {
    const {day, morning, afternoon, evening, night} = props
    return(
        <TouchableOpacity onPress={onPress} >
            <View style={style.container}>
                <View style={style.day}>
                    <Text style={style.dayText}>{day}</Text>
                </View>
                <View style={style.box}>
                    <Text style={style.boxText}>{morning.name}　{morning.time}</Text>
                    <Text style={style.boxText}>{afternoon.name}　{afternoon.time}</Text>
                    <Text style={style.boxText}>{evening.name}　{evening.time}</Text>
                    <Text style={style.boxText}>{night.name}　{night.time}</Text>
                </View>
                <View style={style.icon}>
                    <AntDesign name="right" size={24} color="black" />
                </View>
            </View>
        </TouchableOpacity>
    )

}

const fontSizeRate = () => {
    const {width, height} = Dimensions.get("screen")
    let rate
    if(width > 700) {
        rate = 1
    } else {
        rate = 0.7
    }
    return rate
}

const style = StyleSheet.create({
    container: {
        width: wp("95%"),
        backgroundColor : "white",
        marginTop: 15,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        padding: 0
    },
    box : {
        flex: 5,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    boxText: {
        margin: 5,
        fontWeight: "400",
        fontSize: 25  * fontSizeRate(),
    },
    day: {
        marginLeft:10,
        flex: 1,
        alignItems: "center",
    },
    dayText: {
        fontWeight: "600",
        fontSize: 60 * fontSizeRate(),
    },
    icon: {
        alignItems: "center",
        flex: 1
    }
})