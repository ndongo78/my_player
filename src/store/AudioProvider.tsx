import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {Alert, Animated, Dimensions,} from 'react-native';
import TrackPlayer, {Capability, State, usePlaybackState,} from 'react-native-track-player';
import * as MediaLibrary from 'expo-media-library';
import {AudioContextType, ChildProps, SingleAudioContextType} from "../types/AudioType";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import {handlePress} from "react-native-paper/lib/typescript/components/RadioButton/utils";
import {useNavigation} from "@react-navigation/native";

const { width } = Dimensions.get('window');

const initialeState: AudioContextType = {
    audioList: [],
    currentIndex: 0,
    scrollX: new Animated.Value(0),
    songSlider: null,
    togglePlayBack: () => { },
    currentSong: null,
    playState: null,
    setCurrentIndex: () => { },
    skipToNext: () => { },
    skipToPrevious: () => { },
    isPlaying: false,
    myFavorites: [],
    addToFavorite: () => { },
    playRandom: () => { },
    isRandom: false,
    isMusicPlaying: true,
    setIsMusicPlaying: () => {},
    playSelectedSong:(t:SingleAudioContextType)=>{},
    setMyFavorites:()=>{},
    isPlayList:'songLists',
    setIsPlayList:()=>{},
    setIsPlaying:()=>{},
    setCurrentSong:( )=> {},
    radioList:[],
    playRadio:()=>{},
    setCurrentRadio: ()=>{},
    isSearch: false,
    setIsSearch: ()=>{},
    valueSearch: "",
    setValueSearch: ()=>{},
    handleSearch:()=>{},
    searchList:[]
};


export const AudioContexts = createContext<AudioContextType>(initialeState);


const AudioProvider = ({ children }: ChildProps) => {
    const [audioList, setAudioList] = React.useState(initialeState.audioList);
    const [currentIndex, setCurrentIndex] = React.useState(
        initialeState.currentIndex,
    );
    const [myFavorites, setMyFavorites] = React.useState(
        initialeState.myFavorites,
    );
    const [isRandom, setIsRandom] = React.useState(initialeState.isRandom);
    const scrollX = useRef(initialeState.scrollX).current;
    const songSlider = React.useRef(initialeState.songSlider);
    const playStates = usePlaybackState();
    let playState = useRef(initialeState.playState);
    playState.current = playStates;
    const [currentSong, setCurrentSong] = React.useState(
        initialeState.currentSong,
    );
   // let state = useRef(initialeState.state).current;

    const [isPlaying, setIsPlaying] = React.useState(initialeState.isPlaying);
    const [isMusicPlaying, setIsMusicPlaying] = React.useState(initialeState.isMusicPlaying);
    const [isPlayList, setIsPlayList] = useState(initialeState.isPlayList);
    const [errors, setErrors] = React.useState<any[] | unknown>([]);
    const [isSearch, setIsSearch] = useState(false);
    const [valueSearch, setValueSearch] = useState(initialeState.valueSearch);
    const [radios, setRadios] = useState([]);
    //radio state
    const [isPlayingRadio, setIsPlayingRadio] = React.useState<boolean>(false);
    const [currentRadio, setCurrentRadio] = React.useState<any>(null);
    const [currentIndexRadio, setCurrentIndexRadio] = React.useState<number>(0);
    const [radioList, setRadioList] = React.useState<any>(initialeState.radioList);
    const [playerState,setPlayerState]=React.useState<any>(null)
    const [indexSont, setIndexSont] = useState<any>(null);
    const [searchList, setSearchList] = useState<any>([]);


    const getPermission = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Désole',
                "Vous n'avez pas autorisé l'accès à votre bibliothèque audio.",
            );
        }
        if (status === 'granted') {
            let songs = await MediaLibrary.getAssetsAsync({
                mediaType: 'audio',
                sortBy: 'creationTime',

            });
            songs = await MediaLibrary.getAssetsAsync({
                mediaType: 'audio',
                first: songs.totalCount,
                sortBy:'creationTime',
            });
            const audioArray = songs.assets.map(song => {
                return {
                    id: Number(song.id),
                    url: song.uri,
                    title: song.filename,
                    artist: song.filename,
                    artwork: require('../../assets/cover.jpg'),
                    duration: Number(song.duration),
                };
            });

            const setupPlayer = async () => {
                try {
                    await TrackPlayer.setupPlayer();
                    await TrackPlayer.updateOptions({
                        capabilities: [
                            Capability.Play,
                            Capability.Pause,
                            Capability.SkipToNext,
                            Capability.SkipToPrevious,
                            Capability.Stop,
                            Capability.SeekTo,
                        ],
                    });
                    //await TrackPlayer.add(audioList);
                    songs.assets.map(async (item, index) => {
                        await TrackPlayer.add({
                            id: item.id,
                            url: item.uri,
                            title: item.filename,
                            artist: "unknown",
                            artwork: require('../../assets/cover.jpg'),
                            duration: item.duration,
                        });
                    });
                  await AsyncStorage.setItem("arrayAudio",JSON.stringify(audioArray));
                } catch (error) {
                    console.log("Error", error);
                    // Alert.alert(
                    //     'Désole',
                    //     "Une erreur s'est produite lors de l'initialisation du lecteur audio.",
                    // );
                }
            };
            setAudioList(audioArray);
            await setupPlayer();
            let trackIndex:any = await TrackPlayer.getCurrentTrack();
            setCurrentIndex(trackIndex);

        }
    };

    const onSongChange = (newSong:any) => {
        // Mettez à jour l'état currentSong
        setCurrentSong(newSong);

        // Convertissez les informations du morceau en JSON
        const songJSON = JSON.stringify(newSong);

        // Sauvegardez les informations du morceau dans AsyncStorage
        AsyncStorage.setItem('currentSong', songJSON)
            .then(() => {
              //  console.log('Morceau actuel sauvegardé avec succès dans AsyncStorage.');
            })
            .catch((error:any) => {
                console.error('Erreur lors de la sauvegarde du morceau actuel :', error);
            });
    };
// Au démarrage de l'application, récupérez le morceau actuel depuis AsyncStorage
    const loadCurrentSongFromStorage = async () => {
        try {
            const songArray = await AsyncStorage.getItem('arrayAudio');
            const songJSON = await AsyncStorage.getItem('currentSong');
            if (songJSON && songArray) {
                // Si des informations de morceau ont été trouvées, analysez-les en tant qu'objet
                const currentSongFrom = JSON.parse(songJSON);
                const songArrayParsed = JSON.parse(songArray);
                let audioIndex:any = songArrayParsed.findIndex((s:any) => s.id === currentSongFrom.id)
                // console.log('songArray',audioIndex);
                // console.log("state local : " + audioList)
                // if(state ==State.Ready) {
                //     const songIndex= audioList.indexOf(currentSongFrom);
                //     console.log("state local : " + audioList)
                //   //  TrackPlayer.skip())
                // }
               // console.log('Current',currentSong);
               // setCurrentSong(currentSong);
            } else {
                // Aucune information de morceau n'a été trouvée dans AsyncStorage
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du morceau actuel depuis AsyncStorage :', error);
        }
    };







    //play random song
    const playRandom = async () => {
        setIsRandom(!isRandom);
    };



    React.useEffect(() => {
        getPermission().then(async (r) => {
            // const playerState = await TrackPlayer.getState();
           const favJSON= await  AsyncStorage.getItem('favorites')
            if(favJSON){
              const favorites= JSON.parse(favJSON)
              setMyFavorites(favorites)
            }
        });
    }, []);

    const checkPlayList = async () => {
        if(isPlayList ==='playlists'){

        }else if(isPlayList==='favorites'){
          try {
              await TrackPlayer.reset();
              // @ts-ignore
              await  TrackPlayer.add(myFavorites)
              await TrackPlayer.skip(0);
              await TrackPlayer.play();
              setIsPlaying(true);
              setCurrentSong(myFavorites[0]);
          }catch (e) {

          }

        }else if(isPlayList==='radio'){
            try {
                await TrackPlayer.reset();
                // @ts-ignore
                await  TrackPlayer.add(radioList)
                const trackIndex= audioList.indexOf(currentRadio);
                await TrackPlayer.skip(0);
                await TrackPlayer.play();
                // setIsPlaying(true);
                setCurrentRadio(myFavorites[0]);
            }catch (e) {

            }
        }
        else {
            try {
                await TrackPlayer.reset();
                // @ts-ignore
                await  TrackPlayer.add(audioList)
                const trackIndex= audioList.indexOf(currentSong);
                const currentAudio = audioList[trackIndex];
                await TrackPlayer.skip(trackIndex);
                await TrackPlayer.play();
                setIsPlaying(true);
                setCurrentSong(audioList[0]);
            }catch (e) {

            }
        }
    }

    useEffect(() => {
        checkPlayList()
    }, [isPlayList]);


    const getCurrentSong =async ()=>{
       try {
           let audioIndex:any = await TrackPlayer.getCurrentTrack();
           setCurrentIndex(audioIndex);
          let cureent= await TrackPlayer.getTrack(audioIndex)
           onSongChange(cureent)
           setCurrentSong(cureent);
       }catch (e) {
           console.log('getCurrentSong',e)
       }
    }

    useEffect(()=>{getCurrentSong()},[currentSong]);



    //check
    // React.useEffect(() => {
    //     try {
    //         (async()=>{
    //             if(!isMusicPlaying){
    //                 TrackPlayer.stop();
    //                 setIsMusicPlaying(false);
    //             }
    //             if(isMusicPlaying && State.Playing){
    //                 setIsMusicPlaying(true);
    //             }
    //         })();
    //     } catch (error) {
    //         // console.log("error", error);
    //         setErrors(error);
    //     }
    // }, [ isMusicPlaying ]);



    //add to favorite
    const addToFavorite = async (item: SingleAudioContextType) => {
           const favFromJson= await  AsyncStorage.getItem('favorites')
            if(favFromJson){
                const FavArray = JSON.parse(favFromJson)
                const existing= FavArray.find((audio:SingleAudioContextType)=>audio.id==item.id);
              if(!existing){
                  FavArray.push(item)
                  await  AsyncStorage.setItem('favorites', JSON.stringify(FavArray))
              }
            }else{
                const foviries=[];
                foviries.push(item)
                await  AsyncStorage.setItem('favorites', JSON.stringify(foviries))
            }
    };

 const togglePlayBack=async () => {
     const state = await TrackPlayer.getState();
     if (state === State.Playing) {
         setIsPlaying(false);
         await TrackPlayer.pause();
     }
     if (state !== State.Playing){
        await TrackPlayer.play();
        setIsPlaying(true);

     }

 }

    const   playSelectedSong=async (audio:any,typ:string)=> {
        try {
            if(typ==='songList') {
                try {
                    const trackIndex= audioList.indexOf(audio);
                    const currentAudio = audioList[trackIndex];
                    setCurrentSong(currentAudio);
                        await TrackPlayer.skip(trackIndex);
                        await TrackPlayer.play();
                        setIsPlaying(true);

                }catch (e) {
                    console.log(e)
                }

            }
            if (typ ==="favorite"){
                const trackIndex= myFavorites.indexOf(audio);
                const currentAudio = myFavorites[trackIndex];
                setCurrentSong(currentAudio);
                await TrackPlayer.skip(trackIndex);
                await TrackPlayer.play();
                setIsPlaying(true);
            }
        } catch (error) {
            console.error("Erreur lors de la gestion de la lecture :", error);
            // Gérez les erreurs ici.
        }
    }


    const skipToNext = () => {
        try {
            if(currentIndex === audioList.length - 1){
                setCurrentIndex(0);
            }else{
                const randomIndex = Math.floor(Math.random() * audioList.length);
                if(isRandom){
                    songSlider.current.scrollToOffset({
                        offset: (randomIndex) * width,
                    });
                }else{
                    if(currentIndex != audioList.length){
                        return songSlider.current.scrollToOffset({
                            offset: (currentIndex + 1) * width,
                        });
                    }
                }
                isRandom && setCurrentIndex(randomIndex );
            }
        } catch (error) {
            // console.log("error", error);
            setErrors(error);
        }

    };

    const skipToPrevious = () => {
        try {
            if(audioList.length != 0){
                return songSlider.current.scrollToOffset({
                    offset: (currentIndex - 1) * width,
                });
            }
        }catch (error) {
            // console.log("error", error);
            setErrors(error);
        }
    };
    //fetch radio list

    const getRadios=async ()=> {
        await axios.get('https://radio.ndongodev.com/stations')
            .then(response=>{
               // console.log(response.data);
                const radioArray = response.data.slice(0,100).map((radio:any) => {
                    if(radio){
                        return {
                            id: radio.changeuuid,
                            url: radio.url,
                            title: radio.name && radio.name,
                            artist: '',
                            artwork: radio.favicon ? radio.favicon :'https://res.cloudinary.com/dr4zipwqn/image/upload/v1698244721/jcfrc5xppie8ct7b7gcl.png',
                            duration: 10000,
                            country: radio.country,
                            countrycode: radio.countrycode,
                            tags: radio.tags,
                            url_resolved:radio.url_resolved
                        };
                    }
                });
               setRadioList(radioArray)
                setRadios(radioArray)
                    //  console.log("radio",response.data)
            })
            .catch(err=>{
                console.log('errr',err)
            })
    }

    useEffect(() => {
          getRadios()
    }, []);

    //setup radios
    // const playRadio = async (radio: any) => {
    //     setIsMusicPlaying(false);
    //     try {
    //         if (
    //             currentRadio === null &&
    //             isPlayingRadio === false &&
    //             radio.url !== ''
    //         ) {
    //             const status = await soundObject.loadAsync({
    //                 uri: radio.url,
    //             });
    //             if (status.isLoaded) {
    //                 await soundObject.playAsync();
    //             }
    //             setCurrentRadio(radio);
    //             setIsPlayingRadio(true);
    //             setCurrentIndexRadio(radioList.indexOf(radio));
    //             setPlayerState(status);
    //             return await TrackPlayer.pause();
    //         }
    //         if (isPlayingRadio && currentRadio?.changeuuid === radio?.changeuuid) {
    //             await soundObject.pauseAsync();
    //             setCurrentRadio(radio);
    //             return setIsPlayingRadio(false);
    //         }
    //
    //         if (!isPlayingRadio && currentRadio?.changeuuid === radio?.changeuuid) {
    //             await soundObject.playAsync();
    //             return setIsPlayingRadio(true);
    //         }
    //         if (
    //             currentRadio?.changeuuid !== radio?.changeuuid &&
    //             radio.url !== null
    //         ) {
    //             setIsPlayingRadio(false);
    //             await soundObject.stopAsync();
    //             await soundObject.unloadAsync();
    //             const status = await soundObject.loadAsync({
    //                 uri: radio.url,
    //             });
    //             if (status.isLoaded) {
    //                 await soundObject.playAsync();
    //                 setIsPlayingRadio(true);
    //             }
    //             setCurrentRadio(radio);
    //             setCurrentIndexRadio(radioList.indexOf(radio));
    //             return await TrackPlayer.pause();
    //         }
    //     } catch (error) {
    //         // console.log(error);
    //         setErrors(error);
    //     }
    // };
    // //stop radio
    // const stopRadio = async () => {
    //     try {
    //         await soundObject.stopAsync();
    //         await soundObject.unloadAsync();
    //         setIsPlayingRadio(false);
    //         setCurrentRadio(null);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


const playRadio=async (audio:any)=> {
    setIsMusicPlaying(false)
    // if(searchList.length > 0) {
    //     setCurrentRadio(audio)
    //     setSearchList([])
    //     setRadioList(radios)
    //     await TrackPlayer.reset()
    //     await TrackPlayer.add(radioList)
    // }
    try {
        // await TrackPlayer.reset();
        // // @ts-ignore
        // await  TrackPlayer.add(radioList)
        const trackIndex= radioList.indexOf(audio);
        const currentAudio = radioList[trackIndex];
        //setCurrentSong(currentAudio);
        await TrackPlayer.skip(trackIndex);
        await TrackPlayer.play();
    }catch (e) {
        console.log(e)
    }
}

const handleSearch=async (route:string) => {
    await axios.get(`https://radio.ndongodev.com/stations/search?q=${valueSearch.trim()}`)
        .then(async (response)=>{
            if (response.data && valueSearch != ""){
                const radioArray = response.data.map((radio:any) => {
                    if(radio){
                        return {
                            id: radio.stationuuid,
                            url: radio.url,
                            title: radio.name && radio.name,
                            artist: radio.country,
                            artwork: radio.favicon ? radio.favicon :'https://res.cloudinary.com/dr4zipwqn/image/upload/v1698244721/jcfrc5xppie8ct7b7gcl.png',
                            duration: 10000,
                            country: radio.country,
                            countrycode: radio.countrycode,
                            tags: radio.tags,
                            url_resolved: radio.url_resolved
                        };
                    }
                });
               //setSearchList(radioArray)

                const newArray=[...radioArray, ...radioArray].filter((item:any) =>  item?.title.toLowerCase().includes(valueSearch.toLowerCase().trim())
                    || item?.countrycode.toLowerCase().includes(valueSearch.trim().toLowerCase()) ||
                    item?.country.toLowerCase().includes(valueSearch.trim().toLowerCase()) ||
                    item?.tags.toLowerCase().includes(valueSearch.trim().toLowerCase()));
                //setSearchList(newArray);
                if(newArray.length > 0){
                    await TrackPlayer.reset()
                    await TrackPlayer.add([...newArray,...radios])
                    setRadioList([...newArray,...radios]);
                    setValueSearch('')
                    setIsSearch(false)
                }
            }else {
                setRadioList(radios)
                setSearchList([])
                setValueSearch('')
                setIsSearch(false)
            }
        })
        .catch(err=>console.log('error',err))
    // if (route === "Acceuil" && valueSearch){
    //     setAudioList(audioList.filter(item =>  item.title.toLowerCase().includes(valueSearch.toLowerCase())))
    //    setIsSearch(false)
    //     setValueSearch('')
    // }
    // if (route === "Radio" && valueSearch){
    //     const newArray=radioList.filter((item:any) =>  item?.title.toLowerCase().includes(valueSearch.toLowerCase().trim())
    //         || item?.countrycode.toLowerCase().includes(valueSearch.trim().toLowerCase()) ||
    //         item?.country.toLowerCase().includes(valueSearch.trim().toLowerCase()) ||
    //         item?.tags.toLowerCase().includes(valueSearch.trim().toLowerCase()));
    //     if (newArray.length > 0){
    //         setRadioList(newArray)
    //         setValueSearch('')
    //     }else {
    //         setRadioList(radios)
    //         Alert.alert("Audio not found")
    //     }
    //
    //    setIsSearch(false)
    // }
}

    return (
        <AudioContexts.Provider
            value={{
                audioList,
                currentIndex,
                scrollX,
                songSlider,
                togglePlayBack,
                playState,
                setCurrentIndex,
                skipToNext,
                skipToPrevious,
                currentSong,
                isPlaying,
                addToFavorite,
                myFavorites,
                playRandom,
                isRandom,
                isMusicPlaying,
                setIsMusicPlaying,
                playSelectedSong,
                setMyFavorites,
                setIsPlayList,
                isPlayList,
                setCurrentSong,
                setIsPlaying,
                radioList,
                playRadio,
                setCurrentRadio,
                isSearch,
                setIsSearch,
                valueSearch,
                setValueSearch,
                handleSearch,
                searchList
            }}>
            {children}
        </AudioContexts.Provider>
    );
};

export default AudioProvider;


export const useAudio=()=>useContext(AudioContexts)
