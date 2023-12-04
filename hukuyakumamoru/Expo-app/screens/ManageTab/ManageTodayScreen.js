import { View, Text } from "react-native"
import { useState } from "react"
import ManageToday from "../../components/ManageToday"

export default function ManageTodayScreen(){
    const [infomation, setInfomation] = useState({
        "morning" : {
            "name" : "朝",
            "isImageComplete" : true,
            "isCupComplete" : true,
        },
        "afternoon" : {
            "name" : "昼",
            "isImageComplete" : false,
            "isCupComplete" : true,
        },
        "evening" : {
            "name" : "夕",
            "isImageComplete" : true,
            "isCupComplete" : false,
        },
        "night" : {
            "name" : "夜",
            "isImageComplete" : false,
            "isCupComplete" : false,
        }
    })
    const getData = async () => {
        const res = await fetch("https://hukuyakumamoru.com/manage/today")
        const jsonData = await res.json()
        return jsonData[0]
    }
    getData().then((e) => {
        setInfomation(e)
    }).catch((err) => {
        console.log(err)
    })
    return(
        <View>
            <ManageToday props={ infomation.morning }/>
            <ManageToday props={ infomation.afternoon }/>
            <ManageToday props={ infomation.evening }/>
            <ManageToday props={ infomation.night }/>
        </View>
    )
}
