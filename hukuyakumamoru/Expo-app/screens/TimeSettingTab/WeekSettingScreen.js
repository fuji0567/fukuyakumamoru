import { View, ScrollView, SafeAreaView, Text, TouchableOpacity, StyleSheet, Button } from "react-native"
import { useState, useEffect } from "react"

import WeekSetting from "../../components/WeekSetting"

export default function WeekSettingScreen({ navigation }){
    const [infomation, setInfomation] = useState({
        "sunday" : {
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
        },
        "monday" : {
            "day": "月",
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
        },
        "tuesday" : {
            "day": "火",
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
        },
        "wednesday" : {
            "day": "水",
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
        },
        "thursday" : {
            "day": "木",
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
        },
        "friday" : {
            "day": "金",
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
        },
        "saturday" : {
            "day": "土",
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
        }
    })

    const getData = async () => {
        const res = await fetch("https://hukuyakumamoru.com/timeSetting")
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
                <WeekSetting props={infomation.sunday} onPress={() => navigation.navigate("DaySettingScreen", "sunday")}/>
                <WeekSetting props={infomation.monday} onPress={() => navigation.navigate("DaySettingScreen", "monday")}/>
                <WeekSetting props={infomation.tuesday} onPress={() => navigation.navigate("DaySettingScreen", "tuesday")}/>
                <WeekSetting props={infomation.wednesday} onPress={() => navigation.navigate("DaySettingScreen", "wednesday")}/>
                <WeekSetting props={infomation.thursday} onPress={() => navigation.navigate("DaySettingScreen", "thursday")}/>
                <WeekSetting props={infomation.friday} onPress={() => navigation.navigate("DaySettingScreen", "friday")}/>
                <WeekSetting props={infomation.saturday} onPress={() => navigation.navigate("DaySettingScreen", "saturday")}/>
            </ScrollView>
        </SafeAreaView>

    )
}

