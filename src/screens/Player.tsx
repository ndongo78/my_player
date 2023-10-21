import {Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useRef} from 'react'
import {useAudio} from "../store/AudioProvider";
import tw from 'twrnc'
import TrackPlayer, {State, useProgress} from "react-native-track-player";
import Slider from '@react-native-community/slider';
import {DefaultTheme} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TextTicker from 'react-native-text-ticker'

const Player = () => {
    const navTheme = DefaultTheme;
    const {currentSong,togglePlayBack,isPlaying,audioList,currentIndex,addToFavorite}=useAudio()
    const progress= useProgress()
    const titleRef=useRef(new Animated.Value(0)).current
    const rotateValue = new Animated.Value(0);


    useEffect(() => {
        Animated.timing(rotateValue, {
            toValue: 1,
            duration: 2500, // Durée de l'animation en millisecondes
            easing: Easing.linear, // Type d'interpolation
            useNativeDriver: true, // Utilisation du moteur natif
        }).start();
    }, [rotateValue]);
    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '720deg'], // Rotation de 0 à 360 degrés
    });
    const renderIcon = () => {
        // const exist = myFavorites.find(
        //     item => item.id === audioList[currentIndex].id,
        // );
        // if (exist) {
        //     return <Ionicons name="heart" size={30} color="red" />;
        // } else {
        //     return <Ionicons name="heart-outline" size={30} color="#2fa597" />;
        // }
       return <Ionicons name="heart-outline" size={30} color={navTheme.colors.primary} />;
    };
  // @ts-ignore
    // @ts-ignore
    return (
    <View style={tw`flex-1  items-center justify-evenly`}>
      <Animated.Image source={{uri:currentSong.artwork.uri}} width={200} height={200} style={[tw`rounded-full`,]}  />
       <View>
           <TouchableOpacity
               style={tw`justify-end items-center mb-2`}
               onPress={() => addToFavorite(currentSong)}>
               {renderIcon()}
           </TouchableOpacity>
           {
               isPlaying ?
                   <TextTicker
                       style={[tw`text-2xl text-[${navTheme.colors.text}]`]}
                       duration={5000}
                       loop
                       bounce={false}
                       repeatSpacer={100}
                       marqueeDelay={50}
                   >
                       {audioList[currentIndex].title.slice(0,-4)}
                   </TextTicker>
                   :
                   <Animated.Text style={[tw`text-2xl text-[${navTheme.colors.text}]`,{ transform: [{ translateX: titleRef }],}]}>{currentSong.title.slice(0,-4)} </Animated.Text>

           }
       </View>
        <View>
            <View style={{alignItems: 'center'}}>
                <Slider
                    style={styles.progressBar}
                    value={progress.position}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    thumbTintColor={navTheme.colors.primary}
                    minimumTrackTintColor={navTheme.colors.primary}
                    maximumTrackTintColor={navTheme.colors.secondary}
                    onSlidingComplete={async value => {
                        await TrackPlayer.seekTo(value);
                    }}
                />

                {/* Progress Durations */}
                <View style={styles.progressLevelDuraiton}>
                    <Text style={[styles.progressLabelText,tw`text-[${navTheme.colors.text}]`]}>
                        {new Date(progress.position * 1000)
                            .toLocaleTimeString('en-US', { hour12: false })
                            .substring(3)}
                    </Text>

                    <Text style={[styles.progressLabelText,tw`text-[${navTheme.colors.text}]`]}>
                        {new Date((progress.duration - progress.position) * 1000)
                            .toLocaleTimeString()
                            .substring(4)}
                    </Text>
                </View>
            </View>
        </View>
        {/* music control */}
        <View style={tw`w-full`}>
            <View style={tw`flex-row justify-between items-center`}>
                <TouchableOpacity
                    onPress={()=>{}}
                    >
                    <Ionicons
                        name="shuffle-outline"
                        size={35}
                        color="#fff"
                        style={{padding: 12}}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>TrackPlayer.skipToPrevious()}

                >
                    <MaterialCommunityIcons
                        name="skip-previous"
                        size={35}
                        color="#fff"
                        style={{padding: 12}}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => togglePlayBack(currentSong)}
                    style={[
                        tw`rounded-full items-center justify-center `
                        ,
                        {
                            backgroundColor:
                                isPlaying  ? navTheme.colors.primary : '#161638',
                        },
                    ]}>
                    <Ionicons
                        name={
                             isPlaying ? 'ios-pause' : 'ios-play'
                        }
                        size={45}
                        color="#fff"
                        style={{padding: 12}}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>TrackPlayer.skipToNext()}
                   >
                    <MaterialCommunityIcons
                        name="skip-next"
                        size={35}
                        color="#fff"
                        style={{padding: 12}}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{}}
                    >
                    <MaterialCommunityIcons
                        name="repeat"
                        size={35}
                        color="#fff"
                        style={{padding: 12}}
                    />
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default Player

const styles = StyleSheet.create({
    progressBar: {
        width: 350,
        height: 40,
        flexDirection: 'row',
        fontWeight: 'bold',
    },
    progressLevelDuraiton: {
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressLabelText: {
        fontSize: 16,
        fontWeight: 'bold',
    },

})
