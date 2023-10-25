import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { StyleSheet, Text, View,FlatList, Image, TouchableOpacity } from 'react-native'
import Ant from 'react-native-vector-icons/Entypo'

import {useAudio} from "../store/AudioProvider";
import {SingleAudioContextType} from "../types/AudioType";
import {SwipeListView} from "react-native-swipe-list-view";


interface Props {
    route: any
}

interface renderProps {
    item: SingleAudioContextType,
    index: number
}

export const SongListScreen:FC<Props> = () => {
    const {audioList ,setCurrentIndex,currentIndex,playSelectedSong,setIsPlayList} = useAudio()
    const navigation=useNavigation<any>()
    const convertTime = (milliseconds: number) => {
        if(milliseconds){
            const hrs= milliseconds/60
            const min= hrs.toString().split('.')[0]
            const percent=parseInt(hrs.toString().split('.')[1].slice(0,2))
            const sec:any=Math.ceil((60*100)/percent)
            if(parseInt(min)<10 && parseInt(sec)<10){
                return `0${min}:0${sec}`
            }else if(parseInt(min)<10){
                return `0${min}:${sec}`
            }else if(parseInt(sec)<10){
                return `${min}:0${sec}`
            }
            return `${min}:${sec}`
        }
    }


    const renderIcon=(isPlaying:boolean)=>{
        if(isPlaying){
            return <Ant name='controller-paus' size={28} color='#fff'/>
        }else{
            return <Ant name='controller-play' size={28} color='#fff'/>
        }
    }


    const getName = (name: string) => name[0]+name[1]

    const loadNewSong = (item: any,index:number,typ:string) => {
        setIsPlayList('songList')
        playSelectedSong(item,typ)
        // skipTo(item, index)
        setCurrentIndex(index)

    }

    const renderItem = ({ item,index}:renderProps) => (
        <TouchableOpacity style={styles.itemContainer} onPress={()=>loadNewSong(item,index,'songList')}>
            <View style={[styles.containerTitle,{backgroundColor: currentIndex === index ? "#2fa597" :"#ccc" }]}>
                <Text style={[styles.itemTitle]}>{getName(item.title)}</Text>
            </View>
            {/* <Image style={styles.image} source={require('../images/cover.jpg')} /> */}
            <View >
                <Text style={[styles.title]}>{item.title.slice(0,-4)}</Text>
            </View>
        </TouchableOpacity>
    )
    const renderHiddenItem =(data:any, rowMap:any)=><View></View>
    const onRowDidOpen=(data:any)=>{}

    return (
        <View style={styles.container}>
            <SwipeListView
                disableRightSwipe
                data={audioList}
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
            />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#212433',
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    title: {
        marginLeft: 10,
        fontSize: 18,
        color:"#fff"
    },
    duration: {
        fontSize: 14,
        color:"#fff",
        marginLeft: 10,
    },
    containerTitle: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 50,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    itemTitle: {
        fontSize: 18,
        color: '#000',
        textTransform: 'uppercase',
    },
    list: {
        flex: 1,
        marginVertical: 10,
    },
})
