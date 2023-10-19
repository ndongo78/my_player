
import Icon from "react-native-vector-icons/Ionicons"
import Material from "react-native-vector-icons/MaterialCommunityIcons"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FavoriteScreen, PlaylistScreen, RadioScreen, VideoScreen} from "../screens";
import Ionicons from "react-native-vector-icons/Ionicons"
import Entypo from "react-native-vector-icons/Entypo"
import {Text, TouchableOpacity, View,StyleSheet} from "react-native";
import tw from 'twrnc';
import HomeScreen from '../screens/HomeScreen'


const Tab = createBottomTabNavigator();


function MyTabs() {
    return (
        <Tab.Navigator
         screenOptions={{

            tabBarStyle: {
                 height: 70,
               backgroundColor:'#212433',
               //borderTopWidth:0,
                elevation: 15,
                display: 'flex',
            },
             tabBarLabelStyle: {
                 fontSize:18,

             },
             tabBarActiveTintColor: '#fff'
         }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerStyle: {
                        backgroundColor:'#212433',
                        elevation:0,

                    },
                    header:(props)=><View style={[{height:90,backgroundColor:'#212433'},tw`flex flex-row items-center justify-between`]}>
                        <TouchableOpacity style={[styles.backButton,]} onPress={()=> {}}>
                            <Ionicons name="caret-back-outline" size={30} color="#fff" style={{padding:8}} />
                        </TouchableOpacity>
                        <Text style={tw`text-white text-2xl`}>Ma musique</Text>
                        <TouchableOpacity style={[styles.backButton,tw`mr-2`]} onPress={()=> {}}>
                            <Entypo name="sound-mix" size={30} color="#fff" style={{padding:8}} />
                        </TouchableOpacity>
                    </View>,
                    tabBarLabel:"Music",
                    tabBarIcon:({color})=> <Icon name={"musical-notes-outline"}  size={30} color={color} />
                }}
            />
            {/*<Tab.Screen*/}
            {/*    name="Playlists"*/}
            {/*    component={PlaylistScreen}*/}
            {/*    options={{*/}
            {/*        tabBarLabel:"Playlists",*/}
            {/*        tabBarIcon:({color})=> <Material name={"playlist-music-outline"}  size={30} color={color} />*/}
            {/*    }}*/}
            {/*/>*/}
            <Tab.Screen
                name="Favorites"
                component={FavoriteScreen}
                options={{
                    header:(props)=><View style={[{height:80,backgroundColor:'#212433'},tw`flex flex-row items-center justify-between`]}>
                        <TouchableOpacity style={[styles.backButton,]} onPress={()=> {}}>
                            <Ionicons name="caret-back-outline" size={30} color="#fff" style={{padding:8}} />
                        </TouchableOpacity>
                        <Text style={tw`text-white text-2xl`}>Mes favorites</Text>
                        <TouchableOpacity style={[styles.backButton,tw`mr-2`]} onPress={()=> {}}>
                            <Ionicons name="search" size={30} color="#fff" style={{padding:8}} />
                        </TouchableOpacity>
                    </View>,
                    tabBarLabel:"Favorites",
                    tabBarIcon:({color})=> <Material name={"cards-heart-outline"}  size={30} color={color} />
                }}
            />
            <Tab.Screen
                name="Radio"
                component={RadioScreen}
                options={{
                    header:(props)=><View style={[{height:80,backgroundColor:'#212433'},tw`flex flex-row items-center justify-between`]}>
                        <TouchableOpacity style={[styles.backButton,]} onPress={()=> {}}>
                            <Ionicons name="caret-back-outline" size={30} color="#fff" style={{padding:8}} />
                        </TouchableOpacity>
                        <Text style={tw`text-white text-2xl`}>Radios</Text>
                        <TouchableOpacity style={[styles.backButton,tw`mr-2`]} onPress={()=> {}}>
                            <Ionicons name="search" size={30} color="#fff" style={{padding:8}} />
                        </TouchableOpacity>
                    </View>,
                    tabBarLabel:"Radios",
                    tabBarIcon:({color})=> <Material name={"radio"}  size={30} color={color} />
                }}
            />
            <Tab.Screen
                name="Videos"
                component={VideoScreen}
                options={{
                    header:(props)=><View style={[{height:80,backgroundColor:'#212433'},tw`flex flex-row items-center justify-between`]}>
                        <TouchableOpacity style={[styles.backButton,]} onPress={()=> {}}>
                            <Ionicons name="caret-back-outline" size={30} color="#fff" style={{padding:8}} />
                        </TouchableOpacity>
                        <Text style={tw`text-white text-2xl`}>Mes vidéos</Text>
                        <TouchableOpacity style={[styles.backButton,tw`mr-2`]} onPress={()=> {}}>
                            <Ionicons name="search" size={30} color="#fff" style={{padding:8}} />
                        </TouchableOpacity>
                    </View>,
                    tabBarLabel:"Videos",
                    tabBarIcon:({color})=> <Material name={"movie"}  size={30} color={color} />
                }}
            />
        </Tab.Navigator>
    );
}

export  default MyTabs;

const styles = StyleSheet.create({
    backButton:{
        backgroundColor: '#22313F',
        shadowColor: '#000',
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
