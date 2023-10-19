
import React from 'react'
import {SafeAreaView, Text, StatusBar, StyleSheet, Platform} from 'react-native'
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {AlbumScreen, PlaylistScreen, SongListScreen} from "../screens";


const Tab = createMaterialTopTabNavigator();


const TopNavigator = () => {
    const navTheme = DefaultTheme;
    navTheme.colors.background = '#212433';

    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer
                theme={navTheme}
                independent={true} >
                <Tab.Navigator
                 style={{
                     elevation:0,
                     backgroundColor:'#212433'
                 }}
                 screenOptions={{
                     tabBarStyle: {
                         elevation:0,
                         backgroundColor:'#212433'
                     },
                 }}
                >
                    <Tab.Screen
                        name='Ma musique'
                        component={SongListScreen}
                        options={{
                            tabBarStyle: {
                                backgroundColor:'#212433',
                            },
                            tabBarLabelStyle: {
                                color: '#fff',
                                fontSize:16,
                            },
                        }}
                    />
                    <Tab.Screen
                        name='Playlists'
                        component={PlaylistScreen}
                        options={{
                            tabBarStyle: {
                                backgroundColor:'#212433',
                            },
                            tabBarLabelStyle: {
                                color: '#fff',
                                fontSize:16,
                            },
                        }}
                    />
                    <Tab.Screen
                        name='Albums'
                        component={AlbumScreen}
                        options={{
                            tabBarStyle: {
                                backgroundColor:'#212433',
                            },
                            tabBarLabelStyle: {
                                color: '#fff',
                                fontSize:16,
                            },
                        }}
                    />
                </Tab.Navigator>

            </NavigationContainer>
        </SafeAreaView>
    )
}

export default TopNavigator


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,


    },
})
