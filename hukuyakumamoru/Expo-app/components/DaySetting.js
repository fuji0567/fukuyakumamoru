import { Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"

export default function DaySetting({ props, onPress }) {
    return(
        <TouchableOpacity onPress={onPress} style={style.container}>
            <Text style={style.aboutTime}>
                {props.name}
            </Text>
            <Text style={style.time}>
                {props.time}
            </Text>
        </TouchableOpacity>
    )
}

const widthSizeRate = () => {
    const {width, height} = Dimensions.get("screen")
    let rate
    if(width > 700) {
        rate = 0.5
    } else {
        rate = 1
    }
    return rate
}

const style = StyleSheet.create({
    container: {
        width: wp("90%") * widthSizeRate(),
        height: 100,
        backgroundColor : "white",
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    aboutTime: {
        fontWeight: "500",
        fontSize: 50,
        marginRight:30
    },
    time: {
        fontWeight: "500",
        fontSize: 30,
    }
})
