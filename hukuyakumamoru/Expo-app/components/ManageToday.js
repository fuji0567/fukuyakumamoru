import { View, Text, StyleSheet, Dimensions } from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"

export default function ManageToday({props}) {
    const { isCupComplete, isImageComplete, name } = props
    return(
        <View style={style.container}>
            <View style={style.day}>
                <Text style={style.dayText}>
                    {name}
                </Text>
            </View>
            {isCupComplete ? (
                isImageComplete ? (
                    <View style={style.box}>
                        <Text style={style.textComplete}>完了</Text>
                    </View>
                ) : (
                    <View style={style.box}>
                        <Text style={style.text}>画像認識未</Text>
                        <Text style={style.textCupComplete}>コップ済</Text>
                    </View>
                )
            ) : (
                isImageComplete ? (
                    <View style={style.box}>
                        <Text style={style.textImageComplete}>画像認識済</Text>
                        <Text style={style.text}>コップ未</Text>
                    </View>
                ) : (
                    <View style={style.box}>
                        <Text style={style.textNotComplete}>未完了</Text>
                    </View>
                )
            )}
        </View>
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
        justifyContent: "space-around",
        alignItems: "center",
    },
    day: {
        flex:1,
        alignItems: "center",
    },
    dayText: {
        fontWeight: "600",
        fontSize: 50
    },
    box: {
        flex:5,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    textComplete: {
        color: "red",
        fontWeight: "500",
        fontSize: 40
    },
    textCupComplete: {
        color: "red",
        fontWeight: "400",
        fontSize: 30
    },
    textImageComplete: {
        color: "red",
        fontWeight: "400",
        fontSize: 30
    },
    text: {
        alignItems: "center",
        fontWeight: "300",
        fontSize: 20
    },
    textNotComplete: {
        fontWeight: "300",
        fontSize: 20
    },

})
