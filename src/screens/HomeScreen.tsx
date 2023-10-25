
import TopNavigator from "../navigators/TopNavigator";
import {Alert, Animated, Pressable, Text, TouchableOpacity, View} from "react-native";
import tw from 'twrnc';
import {useAudio} from "../store/AudioProvider";
import Ionicons from "react-native-vector-icons/Ionicons";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import {DefaultTheme, useFocusEffect, useNavigation} from "@react-navigation/native";
import TrackPlayer, { State } from 'react-native-track-player';
import TextTicker from "react-native-text-ticker";
import React, {useCallback} from "react";
import {SearchBanner} from "../components/SearchBanner";

const HomeScreen=()=>{
 const {currentSong,isPlaying,togglePlayBack,setIsPlayList,audioList,
     setCurrentSong,setIsPlaying,isPlayList,isSearch,setIsSearch}=useAudio()
    const navTheme = DefaultTheme;
 const navigation =useNavigation<any>()
    //console.log(State)

    useFocusEffect(
        useCallback(
            () => {
                setIsSearch(false)
            },
            [],
        )
    )


    return (
      <>
     <TopNavigator />
          {
              currentSong &&<Pressable
                  style={tw`w-full h-18 bg-[${navTheme.colors.primary}]  rounded flex-row items-center justify-between`}
                  onPress={()=>navigation.navigate('Player')}
              >
                   <TouchableOpacity onPress={()=>togglePlayBack()}>
                       {
                        isPlaying  ? <Ionicons name={'pause-outline'} size={30} style={tw`text-slate-900 ml-2`} /> :<Ionicons name={'play-sharp'} size={30} style={tw`text-slate-900`} />
                       }
                   </TouchableOpacity>
              <View>
                  {
                      isPlaying ?
                      <TextTicker
                          style={[tw`text-2xl text-slate-900 w-70`]}
                          duration={5000}
                          loop
                          bounce={false}
                          repeatSpacer={100}
                          marqueeDelay={50}
                      >
                          {currentSong.title.slice(0, -4)}
                      </TextTicker>
                      :
                      <Animated.Text
                          style={[tw`text-2xl text-slate-900 w-70`]}>{currentSong.title.slice(0, -4)} </Animated.Text>
                  }
              </View>
              <TouchableOpacity onPress={async ()=>{
                  await TrackPlayer.skipToNext()
              }}>
                  <Material name={'skip-next'} size={40} style={tw`text-slate-900 mr-2`} />
              </TouchableOpacity>
              </Pressable>
          }
          {/*{*/}
          {/*    isPlayList != "songLists" &&  <TouchableOpacity*/}
          {/*        style={{*/}
          {/*            borderWidth: 1,*/}
          {/*            alignItems: 'center',*/}
          {/*            justifyContent: 'center',*/}
          {/*            width: 70,*/}
          {/*            position: 'absolute',*/}
          {/*            right: 20,*/}
          {/*            height: 70,*/}
          {/*            backgroundColor: navTheme.colors.primary,*/}
          {/*            borderRadius: 100,*/}
          {/*            bottom: 60*/}
          {/*        }}*/}
          {/*        onPress={async () => {*/}
          {/*            try {*/}
          {/*                await TrackPlayer.reset();*/}
          {/*                // @ts-ignore*/}
          {/*                await  TrackPlayer.add(audioList)*/}
          {/*                // @ts-ignore*/}
          {/*                setCurrentSong(audioList[0])*/}
          {/*                await TrackPlayer.skip(0);*/}
          {/*                await TrackPlayer.play();*/}
          {/*                setIsPlayList('songLists');*/}
          {/*                setIsPlaying(true)*/}
          {/*            }catch (e) {*/}
          {/*                console.log('error load fav',e)*/}
          {/*            }*/}
          {/*        }}>*/}
          {/*        <Ionicons name={'ios-play'} size={30} />*/}
          {/*    </TouchableOpacity>*/}
          {/*}*/}
          {
              isSearch && <SearchBanner />
          }
      </>
)
}

export default HomeScreen
