"use strict";

module AudioLibrary {

    declare var webkitAudioContext: {
        new (): AudioContext;
    }

    declare var mozAudioContext: {
        new (): AudioContext;
    }

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

    export class AudioHelper {

        private static _audioHelper: AudioHelper = new AudioHelper();
        private _navigator: Navigator;

        constructor() {
            // any cast only for holding navigator internally
            this._navigator = <any>navigator;

            if (AudioHelper._audioHelper) {
                throw new Error("Use getInstance - you shmuck!");
            } else {
                AudioHelper._audioHelper = this;
                this._navigator.getUserMedia = (this._navigator.getUserMedia ||
                    this._navigator.webkitGetUserMedia ||
                    this._navigator.mozGetUserMedia ||
                    this._navigator.msGetUserMedia);

                if (!this._navigator.getUserMedia) {
                    throw new Error("Get user media is not available. AudioLibrary could not be loaded.")
                }
            }
        }

        public static getInstance(): AudioHelper {
            if (this._audioHelper) {
                return this._audioHelper;
            } else {
                return new AudioHelper();
            }
        }

        public retrieveAudioContext(): AudioContext {
            if (typeof AudioContext !== "undefined") {
                return new AudioContext();
            }
            else if (typeof webkitAudioContext !== "undefined") {
                return new webkitAudioContext();
            }
            else if (typeof mozAudioContext !== "undefined") {
                return new mozAudioContext();
            }
            else {
                throw new Error("AudioContext not supported");
            }
        }

        public get navigator(): Navigator {
            return this._navigator;
        }
    }

    export class AudioPlayer {

        private requestDecodedSoundFile(fileURL: string, audioContext: AudioContext, callback: (buffer: AudioBuffer) => void) {

            var getSound: XMLHttpRequest = new XMLHttpRequest();
            getSound.open("GET", fileURL, true);
            getSound.responseType = "arraybuffer";
            getSound.onload = () => {
                audioContext.decodeAudioData(getSound.response, (buffer) => {
                    callback(buffer);
                });
            };
            getSound.send();
        }

        playSoundFile(audioContext: AudioContext, fileUrl: string, playbackRate: number, volumeVal: number) {
            var volume = audioContext.createGain();
            volume.gain.value = volumeVal;

            var playSound = audioContext.createBufferSource();
            playSound.loop = true;

            playSound.playbackRate.value = playbackRate;
            this.requestDecodedSoundFile(fileUrl, audioContext, (buffer) => {
                playSound.buffer = buffer;
            });

            playSound.connect(volume);

            volume.connect(audioContext.destination);

            playSound.start(audioContext.currentTime);
        }

        // explicit any here because type information is missing
        playLiveStreamn(audioContext: any) {
            var helper: AudioHelper = AudioHelper.getInstance();

            if (helper.navigator) {
                console.log("getUserMedia supported");

                helper.navigator.getUserMedia(
                    {
                        audio: true,
                        video: false
                    },

                    function(stream) {
                        let liveStream = audioContext.createMediaStreamSource(stream);
                        console.log("Live stream running");

                        // let convolver = audioContext.createConvolver();
                        // convolver.buffer = impulseBuffer;
                        
                        liveStream.connect(audioContext.destination);
                    },

                    function(err) {
                        console.log("Error occured: " + err);
                    }
                );
            }
        }
    }
}