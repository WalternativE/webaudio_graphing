"use strict";
var AudioLibrary;
(function (AudioLibrary) {
    class AudioHelper {
        constructor() {
            // any cast only for holding navigator internally
            this._navigator = navigator;
            if (AudioHelper._audioHelper) {
                throw new Error("Use getInstance - you shmuck!");
            }
            else {
                AudioHelper._audioHelper = this;
                this._navigator.getUserMedia = (this._navigator.getUserMedia ||
                    this._navigator.webkitGetUserMedia ||
                    this._navigator.mozGetUserMedia ||
                    this._navigator.msGetUserMedia);
                if (!this._navigator.getUserMedia) {
                    throw new Error("Get user media is not available. AudioLibrary could not be loaded.");
                }
            }
        }
        static getInstance() {
            if (this._audioHelper) {
                return this._audioHelper;
            }
            else {
                return new AudioHelper();
            }
        }
        retrieveAudioContext() {
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
        get navigator() {
            return this._navigator;
        }
    }
    AudioHelper._audioHelper = new AudioHelper();
    AudioLibrary.AudioHelper = AudioHelper;
    class AudioPlayer {
        requestDecodedSoundFile(fileURL, audioContext, callback) {
            var getSound = new XMLHttpRequest();
            getSound.open("GET", fileURL, true);
            getSound.responseType = "arraybuffer";
            getSound.onload = () => {
                audioContext.decodeAudioData(getSound.response, (buffer) => {
                    callback(buffer);
                });
            };
            getSound.send();
        }
        playSoundFile(audioContext, fileUrl, playbackRate, volumeVal) {
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
        playLiveStreamn(audioContext) {
            var helper = AudioHelper.getInstance();
            if (helper.navigator) {
                console.log("getUserMedia supported");
                helper.navigator.getUserMedia({
                    audio: true,
                    video: false
                }, function (stream) {
                    let liveStream = audioContext.createMediaStreamSource(stream);
                    console.log("Live stream running");
                    // let convolver = audioContext.createConvolver();
                    // convolver.buffer = impulseBuffer;
                    liveStream.connect(audioContext.destination);
                }, function (err) {
                    console.log("Error occured: " + err);
                });
            }
        }
    }
    AudioLibrary.AudioPlayer = AudioPlayer;
})(AudioLibrary || (AudioLibrary = {}));
