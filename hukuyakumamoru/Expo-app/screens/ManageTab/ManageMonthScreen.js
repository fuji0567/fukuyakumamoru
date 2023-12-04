import { View, Text, StyleSheet, Dimensions } from "react-native"
import { Calendar } from "react-native-calendars"
import { useState } from "react"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"

export default function ManageMonthScreen(){
    const [infomation, setInfomation] = useState([
    {
        "date": "2023-09-01",
        "completedNumber" : 1
    },
    {
        "date": "2023-09-02",
        "completedNumber" : 2
    },
    {
        "date": "2023-09-03",
        "completedNumber" : 3
    },
    {
        "date": "2023-09-04",
        "completedNumber" : 4
    },
    {
        "date": "2023-09-05",
        "completedNumber" : 0
    },
    {
        "date": "2023-09-06",
        "completedNumber" : 2
    },
    {
        "date": "2023-09-07",
        "completedNumber" : 1
    }])
    const getData = async () => {
        const res = await fetch("https://hukuyakumamoru.com/manage/month")
        const jsonData = await res.json()
        return jsonData
    }
    getData().then((e) => {
        setInfomation(e)
    }).catch((err) => {
        console.log(err)
    })
    const createDates = (data) => {
        const markedDates = {}
        data.forEach(value => {
            let backgroundColor
            switch (value.completedNumber) {
                case 1:
                    backgroundColor = "#E0B89C"
                    break
                case 2:
                    backgroundColor = "#F69C5B"
                    break
                case 3:
                    backgroundColor = "#FF8A36"
                    break
                case 4:
                    backgroundColor = "#FF6A00"
                    break
            }
            markedDates[value.date] = {
                customStyles : {
                    container : {
                        backgroundColor : backgroundColor
                    },
                    text : {
                        color : "black",
                        fontWeight: "bold"
                    }
                }
            }
        })
        return markedDates
    }
    return(
        <View>
            <Calendar
                style={style.container}
                monthFormat={'yyyy年 M月'}
                markingType={'custom'}
                markedDates={createDates(infomation)}
            />
            <View style={style.container}>
                <View style={style.box}>
                    <MaterialCommunityIcons name="circle" size={24} color="#FF6A00" />
                    <Text>全て完了</Text>
                </View>
                <View style={style.box}>
                    <MaterialCommunityIcons name="circle" size={24} color="#FF8A36" />
                    <Text>三つ完了</Text>
                </View>
                <View style={style.box}>
                    <MaterialCommunityIcons name="circle" size={24} color="#F69C5B" />
                    <Text>二つ完了</Text>
                </View>
                <View style={style.box}>
                    <MaterialCommunityIcons name="circle" size={24} color="#E0B89C" />
                    <Text>一つ完了</Text>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: wp("90%"),
        height: 380,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,
        borderRadius: 15,
    },
    box: {
        flexDirection: "row"
    }
})
