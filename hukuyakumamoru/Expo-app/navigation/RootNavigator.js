import { createStackNavigator } from "@react-navigation/stack"
import BottomTabNavigator from "./bottom-tab/BottomTabNavigator"
import NotFoundScreen from "../screens/NotFoundScreen"

const Stack = createStackNavigator()

export default function RootNavigator() {
    return(
        //スタックのヘッダー非表示
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
            />
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                />
        </Stack.Navigator>
    )
}