import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import tw from  "twrnc"
import {useAudio} from "../store/AudioProvider";
import {Avatar} from "react-native-paper";
import {RowMap, SwipeListView} from "react-native-swipe-list-view";
import {DefaultTheme} from "@react-navigation/native";



export const RadioScreen = () => {
    const navTheme = DefaultTheme;
    const {radioList,playRadio,setIsPlayList,setCurrentRadio}=useAudio()

    const MyItemComponent = React.memo(({ data }:any) => {
        // Votre composant d'élément
        return (
            <TouchableOpacity
                style={tw`flex-row items-center gap-x-3`}
                onPress={() => {
                    setCurrentRadio(data)
                    setIsPlayList('radio')
                    playRadio(data)
                }}
                key={data.id}
            >
                <Avatar.Image
                    source={{uri:data.artwork }}
                    style={[tw`my-3`,styles.avatar]}

                />
                <View>
                    <Text style={tw`text-[${navTheme.colors.text}] text-2xl`}> {data.title} </Text>
                    <Text style={tw`text-[${navTheme.colors.text}]`}> {data.country} </Text>
                </View>
            </TouchableOpacity>
        );
    });
    const renderItem=({item}:any)=><MyItemComponent data={item} />
    const renderHiddenItem =(data:any, rowMap:any)=><View></View>
    const onRowDidOpen=(data:any)=>{}

    const renderFooter = () => {
        // if (isLoading) {}
            return (
                <View style={{padding: 10}}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            );

    }
    return (
    <View>
        <SwipeListView
            disableRightSwipe
            data={radioList}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-50}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
            closeOnScroll={true}
            keyExtractor={(list:any)=> list.id}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            extraData={radioList}
            refreshing={true}
            onEndReached={()=><View> <Text>Loading</Text> </View>}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.1}
        />
    </View>
  )
}



const styles = StyleSheet.create({
    avatar:{
        objectFit: 'contain'
    }
})
