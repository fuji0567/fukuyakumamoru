import {DateTimePicker, DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import { View,SafeAreaView, ScrollView, Text, StyleSheet, Button } from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"

export default function TimeSettingScreen({ route, navigation }){
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

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("http://hukuyakumamoru.com/timeSetting")
            const jsonData = await res.json()
            return jsonData[0]
        }
        getData().then((e) => {
            setInfomation(e)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const {day, time, timeNumber} = route.params
    const [hours, minutes] = timeNumber.time.split(":");
    const [date, setDate] = useState(new Date(1000 * (60 * 60 * hours + 60 * minutes - 9 * 60 * 60)))

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate
        setDate(currentDate)
        const timeString = selectedDate.getHours().toString().padStart(2, "0") + ":" + selectedDate.getMinutes().toString().padStart(2, "0")
        infomation[day][time].time = timeString
        setInfomation(infomation)
        fetch(`https://hukuyakumamoru.com/timeSetting/${infomation["_id"]}`, {
            method: "PATCH",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(infomation)
        })
    }

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        })
    }

    const showTimepicker = () => {
        showMode('time')
    }

    const selectDay = (anyDay) => {
        let tmp
        switch (anyDay) {
            case "sunday":
                tmp = "日"
                break
            case "monday":
                tmp = "月"
                break
            case "tuesday":
                tmp = "火"
                break
            case "wednesday":
                tmp = "水"
                break
            case "thursday":
                tmp = "木"
                break
            case "fryday":
                tmp = "金"
                break
            case "saturday":
                tmp = "土"
                break
        }
        return tmp
    }
    return(
        <SafeAreaView>
            <View style={style.container}>
                <View style={style.wrap}>
                    <Text style={style.day}>
                        {selectDay(day)}曜日
                    </Text>
                    <Text style={style.aboutTime}>
                        {timeNumber.name}
                    </Text>
                </View>
                <View style={style.box}>
                    <Text style={style.time}>
                        {date.getHours().toString().padStart(2, "0")}:{date.getMinutes().toString().padStart(2, "0")}
                    </Text>
                </View>
            </View>
            <View style={style.button}>
                <Button onPress={showTimepicker} title="時間設定" />
            </View>
        </SafeAreaView>

    )
}

const style = StyleSheet.create({
    container: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 30,
    },
    box: {
        backgroundColor: "white",
        width: wp("90%"),
        height: 300,
        justifyContent: "center",
        textAlign: "center",
        borderRadius: 15,
        marginTop: 30,
    },
    wrap : {
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center"
    },
    day: {
        fontWeight: "500",
        fontSize: 50,
    },
    aboutTime: {
        fontWeight: "500",
        fontSize: 30,
    },
    time: {
        fontWeight: "600",
        fontSize: 120,
        textAlign: "center"
    },
    button: {
        width: wp("85%"),
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 30,
    }
})
