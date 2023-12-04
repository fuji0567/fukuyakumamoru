import { View, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView } from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"

import MedicationStatus from "../components/MedicationStatus"
import { useState } from "react"

export default function MedicationStatusTabScreen(){
    const [infomation, setInfomation] = useState({
        "sunday" : {
            "day" : "日",
            "morning" : false,
            "afternoon" : false,
            "evening" : false,
            "night" : false,
        },
        "monday" : {
            "day" : "月",
            "morning" : false,
            "afternoon" : false,
            "evening" : false,
            "night" : false,
        },
        "tuesday" : {
            "day" : "火",
            "morning" : false,
            "afternoon" : false,
            "evening" : true,
            "night" : true,
        },
        "wednesday" : {
            "day" : "水",
            "morning" : true,
            "afternoon" : true,
            "evening" : true,
            "night" : true,
        },
        "thursday" : {
            "day" : "木",
            "morning" : true,
            "afternoon" : true,
            "evening" : true,
            "night" : true,
        },
        "friday" : {
            "day" : "金",
            "morning" : true,
            "afternoon" : true,
            "evening" : true,
            "night" : true,
        },
        "saturday" : {
            "day" : "土",
            "morning" : true,
            "afternoon" : true,
            "evening" : true,
            "night" : true,
        },
    })
    const getData = async () => {
        const res = await fetch("https://hukuyakumamoru.com/medicationStatus")
        const jsonData = await res.json()
        return jsonData[0]
    }
    getData().then((e) => {
        setInfomation(e)
    }).catch((err) => {
        console.log(err)
    })
    return(
        <SafeAreaView>
            <ScrollView>
                <View style={style.container}>
                    <View style={style.wrapTimes}>
                        <Text style={style.textTime}> </Text>
                        <Text style={style.textTime}>朝</Text>
                        <Text style={style.textTime}>昼</Text>
                        <Text style={style.textTime}>夕</Text>
                        <Text style={style.textTime}>夜</Text>
                    </View>
                    <MedicationStatus props={infomation.sunday}/>
                    <MedicationStatus props={infomation.monday}/>
                    <MedicationStatus props={infomation.tuesday}/>
                    <MedicationStatus props={infomation.wednesday}/>
                    <MedicationStatus props={infomation.thursday}/>
                    <MedicationStatus props={infomation.friday}/>
                    <MedicationStatus props={infomation.saturday}/>
                </View>
            </ScrollView>
        </SafeAreaView>
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
        marginTop: "5%",
        marginLeft: "auto",
        marginRight: "auto",
        width: wp("90%"),
        justifyContent: "center",
        alignItems: "center",
    },
    textTime: {
        margin: 5,
        fontSize: wp("8%"),
        width : wp("15%"),
        height : wp("15%"),
        fontWeight: "600",
        textAlign: "center",

    },
    wrapTimes: {
        flexDirection: "row",
    }
})
