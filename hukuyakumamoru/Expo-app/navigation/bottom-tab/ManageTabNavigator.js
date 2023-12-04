import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ManageTodayScreen from "../../screens/ManageTab/ManageTodayScreen";
import ManageMonthScreen from "../../screens/ManageTab/ManageMonthScreen";

const TopTab = createMaterialTopTabNavigator()

export default function ManageTabNavigator() {
    return (
        <TopTab.Navigator 
            screenOptions={{ 
                tabBarActiveTintColor: "black",
            }}
        >
            <TopTab.Screen
                name="今日"
                component={ManageTodayScreen}
                options={{ headerTitle: "Top Tab One Title" }}
            />
            <TopTab.Screen
                name="月"
                component={ManageMonthScreen}
                options={{ headerTitle: "Top Tab Two Title" }}
            />
        </TopTab.Navigator>
    );
}