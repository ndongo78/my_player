import {Dimensions, View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, FlatList} from "react-native";
import React, {memo, useCallback, useEffect} from "react";
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import {useAudio} from "../store/AudioProvider";
import tw from "twrnc";
import {Avatar} from "react-native-paper";
import {DefaultTheme, useFocusEffect, useNavigation} from "@react-navigation/native";
import {SearchBanner} from "./SearchBanner";

const {width}=Dimensions.get('window')

const MyList = () => {
    const navTheme = DefaultTheme;
    const {radioList,playRadio,setIsPlayList,setCurrentRadio,isSearch,setIsSearch,searchList}=useAudio()
    const navigation=useNavigation<any>()

    const screenWidth = Dimensions.get('window').width;
    const layoutProvider = new LayoutProvider(
        (index) => {
            // Renvoie un type de mise en page pour l'élément à l'index donné (par exemple, 'NORMAL' ou 'HEADER').
            return 'NORMAL';
        },
        (type, dim) => {
            // Définissez les dimensions de l'élément en fonction de son type.
            switch (type) {
                case 'NORMAL':
                    dim.width = screenWidth; // Largeur de l'élément
                    dim.height = 100; // Hauteur de l'élément
                    break;
                case 'HEADER':
                    dim.width = screenWidth;
                    dim.height = 50;
                    break;
                default:
                    dim.width = 0;
                    dim.height = 0;
                    break;
            }
        }
    );
    const dataProvider = new DataProvider((r1, r2) => {
        // Comparez deux éléments de données pour déterminer s'ils sont identiques.
        return r1 !== r2;
    });
    const ListItem = ({ item }:any) => (
        <TouchableOpacity
            style={tw`flex-row items-center gap-x-3`}
            onPress={() => {
                setCurrentRadio(item)
                setIsPlayList('radio')
                playRadio(item)
                navigation.navigate('RadioPlayer')
            }}
        >
            <Avatar.Image
                source={{uri:item.artwork ? item.artwork : 'https://res.cloudinary.com/dr4zipwqn/image/upload/v1698244721/jcfrc5xppie8ct7b7gcl.png' }}
                style={[tw`my-3`,styles.avatar]}

            />
            <View>
                <Text style={tw`text-[${navTheme.colors.text}] text-2xl`}> {item.title ? item.title : item?.name} </Text>
                <Text style={tw`text-[${navTheme.colors.text}]`}> {item.country} </Text>
            </View>
        </TouchableOpacity>
    );

    useFocusEffect(
        useCallback(
            () => {
                setIsSearch(false)
            },
            [],
        )
    )


    return (
       < >
           {/*<RecyclerListView*/}
           {/*    layoutProvider={layoutProvider}*/}
           {/*    dataProvider={dataProvider.cloneWithRows(searchList.length >0 ? searchList : radioList)}*/}
           {/*    rowRenderer={(type, data) => <ListItem data={data} />}*/}
           {/*    style={tw`flex-1`}*/}
           {/*/>*/}
           <FlatList
               data={searchList.length >0 ? searchList : radioList}
               renderItem={ListItem}
               keyExtractor={(item)=>item.id.toString()+item.countrycode+Math.random().toString()}
               initialNumToRender={10}
               maxToRenderPerBatch={10}
           />
           {
               isSearch && <SearchBanner />
           }
       </>
    );
};

export default MyList

const styles = StyleSheet.create({
    avatar:{
        objectFit: 'contain'
    }
})
