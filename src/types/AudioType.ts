import {Animated, ImageSourcePropType} from "react-native";

//audio types
export type SingleAudioContextType = {
    id: number;
    title: string;
    artist: string;
    duration: number;
    artwork: ImageSourcePropType;
    url: string;
};
import React from "react";


export type DownloaderTypes = {
    url: string;
    fileUrl: string;
    filename: string;
    fileName: {
        percentage: number;
        dataToBeDownloaded: boolean;
        dataDownloaded: number;
        title: string;
        videoUploader: string;
        videoUrl: string | undefined;
        audioUrl: null;
    };
    checkPermission: () => void;
    setUrl: (url: string) => void;
    sumbitHandler:()=>void;
    setFileUrl: (fileUrl: string) => void;
    songInfos: {
        title: string;
        artist: string;
        album: string;
        avatar: any;
    };
    videoOnly: string ;
    downloadType: string;
    setDownloadType: (downloadType: string) => void;
    downlodFileMp4: () => void;
    downlodFileMp3: () => void;
    isFile: boolean;
    setIsFile: (isFile: boolean) => void;
    setSongInfos: (songInfos: {
        title: string;
        artist: string;
        album: string;
        avatar: any;
    }) => void;
}

//childrens props
export type ChildProps = {
    children: React.ReactNode;
}

export type AudioContextType = {
    audioList: {
        id: number;
        title: string;
        artist: string;
        duration: number;
        artwork: ImageSourcePropType;
        url: string;
    }[];
    currentIndex: number | null;
    scrollX: Animated.Value;
    songSlider: any;
    togglePlayBack: (number: number) => void;
    skipTo: (number: number, index: number) => void;
    currentSong: any;
    playState: any;
    state: any;
    setCurrentIndex: (number: number) => void;
    skipToNext: () => void;
    skipToPrevious: () => void;
    isPlaying: boolean;
    myFavorites:SingleAudioContextType[];
    addToFavorite: (song: SingleAudioContextType) => void;
    playRandom: () => void;
    isRandom: boolean;
    isMusicPlaying: boolean;
    setIsMusicPlaying: (isMusicPlaying: boolean) => void;
};

export type UserContextType = {
    user: {
        uid:string,
        username:any,
        email:any,
    };
    isLoggedIn: boolean;
    loginUser:(
        email: string,
        password: string
    ) => void;
    logoutUser: () => void;
    registerUser: (user: {
        username: string;
        email: string;
        password: string;
    }) => void;
    isLoading: boolean;
    error: null | string;
    errorEmail: null | string;
    errorPassword: null | string;
    errorUsername: null | string;
    LoginWithFacebook: () => void;
    updateUserData: (userData: {
        username: string;
        email: string;
    }) =>void;
    hidenModal: () => void,
    modalVisible: boolean;
};
