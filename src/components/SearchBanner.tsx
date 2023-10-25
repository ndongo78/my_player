import tw from "twrnc";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import {DefaultTheme, useNavigation, useRoute} from "@react-navigation/native";
import {useAudio} from "../store/AudioProvider";

interface Props {
    value: string;
    onPress:(t:string)=>void;
}
export const SearchBanner=()=> {
    const navTheme = DefaultTheme;
    const {valueSearch,setValueSearch,handleSearch}=useAudio()
    const route = useRoute()

  return  <View
        style={tw`w-full h-50  bg-[${navTheme.colors.background}] shadow border-2 absolute top-0 justify-center items-center rounded-b-[10]`}>
        <View style={tw`w-80`}>
            <TextInput
                style={tw`bg-slate-900  rounded-xl text-left text-lg w-full`}
                placeholder={'Rechercher une station avec son nom , genre , pays ...'}
                placeholderTextColor={'#3c3b3b'}
                value={valueSearch}
                onChangeText={(text)=>setValueSearch(text)}
            />
            <TouchableOpacity style={tw`bg-[${navTheme.colors.primary}] w-50 my-5 self-center rounded-xl`} onPress={()=>handleSearch(route.name)}>
                <Text style={tw`text-center p-2 text-xl`}>Recherche</Text>
            </TouchableOpacity>
        </View>
    </View>
}
