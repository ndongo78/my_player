import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomeScreen} from "../screens";
import {Text, View} from "react-native";

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Acceuil"
                component={HomeScreen}
                options={{
                    headerLeft:()=><View><Text>hello</Text> </View>
                }}
            />
        </Stack.Navigator>
    );
}

export default HomeScreen
