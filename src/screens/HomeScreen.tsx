
import TopNavigator from "../navigators/TopNavigator";
import {Alert, Pressable, Text, TouchableOpacity, View} from "react-native";
import tw from 'twrnc';
import {useAudio} from "../store/AudioProvider";
import Ionicons from "react-native-vector-icons/Ionicons";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import {DefaultTheme, useNavigation} from "@react-navigation/native";
import TrackPlayer, { State } from 'react-native-track-player';

const HomeScreen=()=>{
 const {currentSong}=useAudio()
    const navTheme = DefaultTheme;
 const navigation =useNavigation<any>()
    //console.log(State)



    return (
      <>
     <TopNavigator />
          {
              currentSong &&<Pressable
                  style={tw`w-full h-18 bg-[${navTheme.colors.primary}]  rounded flex-row items-center justify-between`}
                  onPress={()=>navigation.navigate('Player')}
              >
                   <TouchableOpacity onPress={()=>Alert.alert('Touch')}>
                       {
                        State.Playing  ? <Ionicons name={'pause-outline'} size={40} style={tw`text-slate-900`} /> :<Ionicons name={'play-sharp'} size={40} style={tw`text-slate-900`} />
                       }
                   </TouchableOpacity>
              <View>
                  <Text style={tw`text-slate-900 w-60 text-xl`}> {currentSong.title.slice(0,-4)} </Text>
              </View>
              <TouchableOpacity onPress={async ()=>{
                  await TrackPlayer.skipToNext()
              }}>
                  <Material name={'skip-next'} size={40} style={tw`text-slate-900 mr-2`} />
              </TouchableOpacity>
              </Pressable>
          }
      </>
)
}

export default HomeScreen
