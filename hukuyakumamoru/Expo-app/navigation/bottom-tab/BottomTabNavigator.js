import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import TimeSettingTabNavigator from "./TimeSettingTabNavigator";
import ManageTabNavigator from "./ManageTabNavigator";
import MedicationStatusTabNavigation from "./MedicationStatusTabNavigation";

const BottomTab = createBottomTabNavigator()

export default function BottomTabNavigator() {
    return(
        <BottomTab.Navigator 
            initialRouteName="時間設定"
            screenOptions={{ 
                tabBarActiveTintColor: "black",
            }}
        >
            <BottomTab.Screen
                name="時間設定"
                component={TimeSettingTabNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="timetable" size={24} color={color} />
                    ) 
                }}
            />
            <BottomTab.Screen
                name="管理"
                component={ManageTabNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="areachart" size={24} color={color} />
                    )
                }}
            />
            <BottomTab.Screen
                name="薬状況"
                component={MedicationStatusTabNavigation}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="medicinebox" size={24} color={color} />
                    )
                }}
            />
        </BottomTab.Navigator>
    )
}