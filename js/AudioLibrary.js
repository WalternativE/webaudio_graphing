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
    class AudioComponent {
        constructor(node) {
            this._node = node;
        }
        connect(destinationNode) {
            this._node.connect(destinationNode);
        }
        disconnect() {
            this._node.disconnect();
        }
    }
    AudioLibrary.AudioComponent = AudioComponent;
    class AudioDestinationComponent extends AudioComponent {
        connect(destinationNode) {
            console.log("Destination Node should not do that...");
        }
        disconnect() {
            console.log("Nothing to disconnet from");
        }
    }
    class AudioNodeCreator {
        constructor(audioContext) {
            this._audioContext = audioContext;
        }
        requestDecodedSoundFile(fileURL, callback) {
            var getSound = new XMLHttpRequest();
            getSound.open("GET", fileURL, true);
            getSound.responseType = "arraybuffer";
            getSound.onload = () => {
                this._audioContext.decodeAudioData(getSound.response, (buffer) => {
                    callback(buffer);
                });
            };
            getSound.send();
        }
        createSoundNodeFromFileURL(audioContext, fileUrl, playbackRate, volumeVal) {
            var playSound = audioContext.createBufferSource();
            playSound.loop = true;
            playSound.playbackRate.value = playbackRate;
            this.requestDecodedSoundFile(fileUrl, (buffer) => {
                playSound.buffer = buffer;
            });
            playSound.start(audioContext.currentTime);
            return new AudioComponent(playSound);
        }
        retrieveUserMicStream(callback) {
            var helper = AudioHelper.getInstance();
            if (helper.navigator) {
                console.log("getUserMedia supported");
                helper.navigator.getUserMedia({
                    audio: true,
                    video: false
                }, (stream) => {
                    let audioContRef = this._audioContext;
                    callback(audioContRef.createMediaStreamSource(stream));
                }, (err) => {
                    console.log("Error occured: " + err);
                });
            }
        }
        createSoundNodeFromLiveStreamn() {
            var liveStreamNode;
            this.retrieveUserMicStream((stream) => {
                liveStreamNode = new AudioComponent(stream);
            });
            return liveStreamNode;
        }
        // kinda breaking LSP here - if I have time to refactor I might want to change this
        createDestinationNOde() {
            return new AudioDestinationComponent(this._audioContext.destination);
        }
    }
    AudioLibrary.AudioNodeCreator = AudioNodeCreator;
})(AudioLibrary || (AudioLibrary = {}));
