import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Player from "../screens/Player";
import MyTabs from "./BottomNavigation";
import TopNavigator from "./TopNavigator";
import tw from "twrnc";
import Ionicons from "react-native-vector-icons/Ionicons";
import {DefaultTheme} from "@react-navigation/native";
import {useAudio} from "../store/AudioProvider";

const Stack = createNativeStackNavigator();

function HomeStack() {
    const navTheme = DefaultTheme;
    const {isSearch,setIsSearch}=useAudio()
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Acceuil"
                component={HomeScreen}
                options={{ header:(props)=><View style={[{height:90,backgroundColor:navTheme.colors.background},tw`flex flex-row items-center justify-between`]}>
                        <TouchableOpacity style={[styles.backButton,]} onPress={()=> {}}>
                            {/*<Ionicons name="chevron-back" size={30} color={navTheme.colors.text} style={{padding:8}} />*/}
                        </TouchableOpacity>
                        <Text style={tw`text-white text-2xl`}>Ma musique</Text>
                        <TouchableOpacity style={[styles.backButton,tw`mr-2`]} onPress={()=> setIsSearch(!isSearch)}>
                            <Ionicons name="search" size={30} color={navTheme.colors.text} style={{padding:8}} />
                            {/*<Entypo name="sound-mix" size={30} color={navTheme.colors.text} style={{padding:8}} />*/}
                        </TouchableOpacity>
                    </View>,}}
            />
            <Stack.Screen
                name="Player"
                component={Player}
                options={{
                header:(props)=><View style={[{height:80,backgroundColor:navTheme.colors.background},tw`flex flex-row items-center justify-between`]}>
                    <TouchableOpacity style={[styles.backButton,]} onPress={()=> {}}>
                        <Ionicons name="chevron-back" size={30} color={navTheme.colors.text} style={{padding:8}} />
                    </TouchableOpacity>
                    <Text style={tw`text-white text-2xl`}>Now playing</Text>
                    <TouchableOpacity style={[styles.backButton,tw`mr-2`]} onPress={()=> {}}>
                        <Ionicons name="ellipsis-vertical-outline" size={30} color={navTheme.colors.text} style={{padding:8}} />
                    </TouchableOpacity>
                    </View>,
                }}
            />
        </Stack.Navigator>
    );
}

export default HomeStack

const styles = StyleSheet.create({
    backButton:{
        //backgroundColor: '#1d2b37',
        //shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius:50,
        marginLeft:10,
    },
})
