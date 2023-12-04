import { NavigationContainer } from "@react-navigation/native"
import LinkingConfigration from "./LinkingConfigration"
import RootNavigator from "./RootNavigator"

export default function Navigation() {
    return(
        <NavigationContainer
            linking={LinkingConfigration}
        >
            <RootNavigator/>
        </NavigationContainer>
    )
}