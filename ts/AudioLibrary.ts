"use strict";

interface Navigator {
    getUserMedia(
        options: { video?: boolean; audio?: boolean; },
        success: (stream: any) => void,
        error?: (error: string) => void
    ): void;
    webkitGetUserMedia(
        options: { video?: boolean; audio?: boolean; },
        success: (stream: any) => void,
        error?: (error: string) => void
    ): void;
    mozGetUserMedia(
        options: { video?: boolean; audio?: boolean; },
        success: (stream: any) => void,
        error?: (error: string) => void
    ): void;
    msGetUserMedia(
        options: { video?: boolean; audio?: boolean; },
        success: (stream: any) => void,
        error?: (error: string) => void
    ): void;
}

class AudioLibrary {

    private static _audioLibrary: AudioLibrary = new AudioLibrary();
    private _navigator: Navigator = <Navigator>navigator;

    constructor() {
        if (AudioLibrary._audioLibrary) {
            throw new Error("Use getInstance - you shmuck!");
        } else {
            AudioLibrary._audioLibrary = this;
            this._navigator.getUserMedia = (navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia);

            if (!navigator.getUserMedia) {
                throw new Error("Get user media is not available. AudioLibrary could not be loaded.")
            }
        }
    }


    retrieveAudioContext() {
        if (typeof AudioContext !== "undefined") {
            return new AudioContext();
        }
        // else if (typeof <any>webkitAudioContext !== "undefined") {
        //     return new webKitAudioContext();
        // }
        // else if (typeof mozAudioContext !== "undefined") {
        //     return new mozAudioContext();
        // }
        else {
            throw new Error("AudioContext not supported");
        }
    }
}