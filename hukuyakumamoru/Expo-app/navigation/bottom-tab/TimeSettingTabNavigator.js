import { createStackNavigator } from "@react-navigation/stack";
import WeekSettingScreen from "../../screens/TimeSettingTab/WeekSettingScreen";
import DaySettingScreen from "../../screens/TimeSettingTab/DaySettingScreen";
import TimeSettingScreen from "../../screens/TimeSettingTab/TimeSettingScreen";

const TimeSettingTabStack = createStackNavigator()
export default function TimeSettingTabNavigator() {
    return (
        <TimeSettingTabStack.Navigator>
            <TimeSettingTabStack.Screen
                name="WeekSettingScreen"
                component={WeekSettingScreen}
                options={{ headerTitle: "時間設定" }}
            />
            <TimeSettingTabStack.Screen
                name="DaySettingScreen"
                component={DaySettingScreen}
                options={{ headerTitle: "時間設定" }}
            />
            <TimeSettingTabStack.Screen
                name="TimeSettingScreen"
                component={TimeSettingScreen}
                options={{ headerTitle: "時間設定" }}
            />
        </TimeSettingTabStack.Navigator>
    );
}