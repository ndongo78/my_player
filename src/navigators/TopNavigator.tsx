
import React from 'react'
import {SafeAreaView, Text, StatusBar, StyleSheet, Platform} from 'react-native'
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {AlbumScreen, PlaylistScreen, SongListScreen} from "../screens";
import Player from "../screens/Player";


const Tab = createMaterialTopTabNavigator();


const TopNavigator = () => {
    const navTheme = DefaultTheme;
  //  navTheme.colors.background = '#212433';
  //   navTheme.colors.background = '#050A30';
  //   navTheme.colors.text='#C0C0C0'
  //   navTheme.colors.primary='#FFD700'
  //   navTheme.colors.secondary='#F5F5F5'

    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer
                theme={navTheme}
                independent={true} >
                <Tab.Navigator
                 style={{
                     elevation:0,
                     backgroundColor:navTheme.colors.background,
                 }}
                 screenOptions={{
                     tabBarStyle: {
                         elevation:0,
                         backgroundColor:navTheme.colors.background,
                     },
                 }}
                >
                    <Tab.Screen
                        name='Ma musique'
                        component={SongListScreen}
                        options={{
                            tabBarStyle: {
                                backgroundColor: navTheme.colors.background,
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
                                backgroundColor:navTheme.colors.background,
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
                                backgroundColor:navTheme.colors.background,
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
