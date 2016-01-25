"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
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
            this._node.connect(destinationNode._node);
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
        createSoundNodeFromFileURL(fileUrl, playbackRate) {
            var playSound = this._audioContext.createBufferSource();
            playSound.loop = true;
            playSound.playbackRate.value = playbackRate;
            this.requestDecodedSoundFile(fileUrl, (buffer) => {
                playSound.buffer = buffer;
            });
            playSound.start(this._audioContext.currentTime);
            return new AudioComponent(playSound);
        }
        retrieveUserMicStream() {
            return __awaiter(this, void 0, Promise, function* () {
                var helper = AudioHelper.getInstance();
                if (helper.navigator) {
                    console.log("getUserMedia supported");
                    var promise = new Promise((resolve, reject) => {
                        helper.navigator.getUserMedia({
                            audio: true,
                            video: false
                        }, (stream) => {
                            var audioContRef = this._audioContext;
                            var mediaStreamSource = audioContRef.createMediaStreamSource(stream);
                            resolve(mediaStreamSource);
                        }, (err) => {
                            console.log("Error occured: " + err);
                        });
                    });
                    return promise;
                }
            });
        }
        createSoundNodeFromLiveStreamn() {
            return __awaiter(this, void 0, Promise, function* () {
                var userMiceStream = yield this.retrieveUserMicStream();
                return new AudioComponent(userMiceStream);
            });
        }
        createGainNode(gainVal) {
            var gainNode = this._audioContext.createGain();
            gainNode.gain.value = gainVal;
            return new AudioComponent(gainNode);
        }
        // kinda breaking LSP here - if I have time to refactor I might want to change this
        createDestinationNode() {
            return new AudioDestinationComponent(this._audioContext.destination);
        }
    }
    AudioLibrary.AudioNodeCreator = AudioNodeCreator;
})(AudioLibrary || (AudioLibrary = {}));
