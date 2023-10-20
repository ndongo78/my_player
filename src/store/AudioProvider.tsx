import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {Alert, Animated, Dimensions,} from 'react-native';
import TrackPlayer, {Capability, State, usePlaybackState,} from 'react-native-track-player';
import * as MediaLibrary from 'expo-media-library';
import {AudioContextType, ChildProps, SingleAudioContextType} from "../types/AudioType";


const { width } = Dimensions.get('window');

const initialeState: AudioContextType = {
    audioList: [],
    currentIndex: 0,
    scrollX: new Animated.Value(0),
    songSlider: null,
    togglePlayBack: () => { },
    skipTo: () => { },
    currentSong: null,
    playState: null,
    state: null,
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
    playSelectedSong:(t:SingleAudioContextType)=>{}
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
    const [errors, setErrors] = React.useState<any[] | unknown>([]);
    //radio state
    const [isPlayingRadio, setIsPlayingRadio] = React.useState<boolean>(false);
    const [currentRadio, setCurrentRadio] = React.useState<any>(null);
    const [currentIndexRadio, setCurrentIndexRadio] = React.useState<number>(0);
    const [radioList, setRadioList] = React.useState<any>([]);
    const [playerState,setPlayerState]=React.useState<any>(null)
    const [indexSont, setIndexSont] = useState<any>(null);

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
            let trackIndex = await TrackPlayer.getCurrentTrack();
            setCurrentIndex(trackIndex);
        }
    };

    //next song on scroll
    const skipTo = async (trackId: number) => {
        try {
            const randomIndex = Math.floor(Math.random() * audioList.length);
            //if the end of the list
            if (trackId === audioList.length - 1) {
                await TrackPlayer.skip(  isRandom ? randomIndex:audioList.indexOf(audioList[0]));
                setCurrentIndex(0);
            } else {
                await TrackPlayer.skip(isRandom ? randomIndex :trackId);
            }
        } catch (error) {
            // console.log("error skip", error);
            setErrors(error);
        }
    };

    //play random song
    const playRandom = async () => {
        setIsRandom(!isRandom);
    };




    React.useEffect(() => {
        getPermission().then(async (r) => {
            const playerState = await TrackPlayer.getState();
            console.log('Player state:', playerState);
        });
        //   try {  scrollX.addListener(({ value }) => {
        //         const index = Math.round(value / width);
        //         setCurrentIndex(index);
        //         const currentSong = TrackPlayer.getTrack(index);
        //         setCurrentSong(currentSong);
        //     });
        //     return () => {
        //         scrollX.removeAllListeners();
        //         TrackPlayer.destroy();
        //     }
        // } catch (error) {
        //     // console.log("error", error);
        //     setErrors(error);
        //
        // }
    }, []);

    const getCurrentSong =async ()=>{
       try {
           let audioIndex:number | null = await TrackPlayer.getCurrentTrack();
           setCurrentIndex(audioIndex);
          let cureent= await TrackPlayer.getTrack(audioIndex)
           setCurrentSong(cureent);
           // if (audioIndex != null) {
           //      await TrackPlayer.getTrack(audioIndex)
           //     console.log('currentSong:', audioIndex);
           // }
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
        if (currentIndex === audioList.indexOf(item)) {
            setMyFavorites([...myFavorites, item]);
        }
    };
    //toggle play/pause
    // const togglePlayBack = async (playBackState: any) => {
    //     try {
    //         const state = await TrackPlayer.getState();
    //         if (state === State.Playing) {
    //             await TrackPlayer.pause();
    //             setIsPlaying(false);
    //             setIsMusicPlaying(true);
    //         } else {
    //             await TrackPlayer.play();
    //             setIsPlaying(true);
    //             setIsMusicPlaying(true)
    //         }
    //         if (currentIndex !== audioList.indexOf(playBackState) && playBackState !== State.Playing) {
    //             setCurrentIndex(audioList.indexOf(playBackState));
    //             await skipTo(audioList.indexOf(playBackState));
    //             const currentSong = TrackPlayer.getTrack(
    //                 audioList.indexOf(playBackState),
    //             );
    //             setCurrentSong(currentSong);
    //             setIsPlaying(true);
    //         }
    //     } catch (error) {
    //         console.error("error", error);
    //         setErrors(error);
    //         // Alert.alert(
    //         //   'Oups',
    //         //   "Eurreur lors de l'initialisation du lecteur audio.",
    //         // );
    //     }
    // };

 const togglePlayBack=() => {}

    const   playSelectedSong=async (audio:any)=> {
        try {
            const state = await TrackPlayer.getState();
            console.log('state',state);
            const trackIndex= audioList.indexOf(audio);
            const currentAudio = audioList[trackIndex];
            setCurrentSong(currentAudio);
            await TrackPlayer.skip(trackIndex);
            await TrackPlayer.play();

            // if (state === State.Playing) {
            //     // Le lecteur est en cours de lecture, mettez en pause.
            //     await TrackPlayer.reset();
            // } else {
            //     // Le lecteur est en pause, commencez la lecture.
            //     await TrackPlayer.play();
            // }
            //
            // // Mise à jour de l'état de lecture dans votre composant.
            // // Exemple : setIsPlaying(true);
            //
            // if (currentIndex !== audioList.indexOf(audio) && audio !== State.Playing) {
            //     // L'utilisateur a cliqué sur une nouvelle chanson.
            //     setCurrentIndex(audioList.indexOf(audio));
            //
            //     // Changez la piste en cours de lecture en utilisant skipTo.
            //     await TrackPlayer.skip(audioList.indexOf(audio));
            //
            //     // Mettez à jour la chanson actuellement en cours de lecture.
            //     const currentSong = await TrackPlayer.getTrack(audioList.indexOf(audio));
            //
            //     // Mise à jour des informations sur la chanson actuelle dans votre composant.
            //     // Exemple : setCurrentSong(currentSong);
            // }
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
                skipTo,
                currentSong,
                isPlaying,
                addToFavorite,
                myFavorites,
                playRandom,
                isRandom,
                isMusicPlaying,
                setIsMusicPlaying,
                playSelectedSong
            }}>
            {children}
        </AudioContexts.Provider>
    );
};

export default AudioProvider;


export const useAudio=()=>useContext(AudioContexts)
