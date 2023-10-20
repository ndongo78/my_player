import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Avatar} from "react-native-paper";
import {useAudio} from "../store/AudioProvider";
import tw from 'twrnc'

const Player = () => {
    const {currentSong}=useAudio()
    // console.log(currentSong.artwork.uri)
  return (
    <View style={tw`flex-1  items-center justify-evenly`}>
      <Image source={{uri:currentSong.artwork.uri}} width={200} height={200} style={tw`rounded-full`}  />
       <View>
           <Text style={tw`text-2xl`}>{currentSong.title.slice(0,-4)} </Text>
       </View>
        <View>
            <Text>controller</Text>
        </View>
    </View>
  )
}

export default Player

const styles = StyleSheet.create({})
