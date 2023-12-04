import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native"
import { useState, useEffect } from "react"

import DaySetting from "../../components/DaySetting"

export default function DaySettingScreen({ route, navigation }){
    const day = route.params

    const [infomation, setInfomation] = useState({
        "day": "日",
        "morning" : {
            "name" : "朝",
            "time" : "08:00",
        },
        "afternoon" : {
            "name" : "昼",
            "time" : "12:00",
        },
        "evening" : {
            "name" : "夕",
            "time" : "15:00",
        },
        "night" : {
            "name" : "夜",
            "time" :  "19:00",
        },
    })

    const getData = async () => {
        const res = await fetch("https://hukuyakumamoru.com/timeSetting")
        const jsonData = await res.json()
        return jsonData[0]
    }
    getData().then((e) => {
        setInfomation(e[day])
    }).catch((err) => {
        console.log(err)
    })


    return(
        <SafeAreaView>
            <Text style={style.day}>{infomation.day}曜日</Text>
            <DaySetting props={infomation.morning} onPress={() => navigation.navigate("TimeSettingScreen", {"day": day, "time": "morning", "timeNumber": infomation.morning})}/>
            <DaySetting props={infomation.afternoon} onPress={() => navigation.navigate("TimeSettingScreen", {"day": day, "time": "afternoon", "timeNumber": infomation.afternoon})}/>
            <DaySetting props={infomation.evening} onPress={() => navigation.navigate("TimeSettingScreen", {"day": day, "time": "evening", "timeNumber": infomation.evening})}/>
            <DaySetting props={infomation.night} onPress={() => navigation.navigate("TimeSettingScreen", {"day": day, "time": "night", "timeNumber": infomation.night})}/>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    day: {
        fontWeight: "500",
        fontSize: 30,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,
    }
})
