"use strict";
class AudioLibrary {
    constructor() {
        this._navigator = navigator;
        if (AudioLibrary._audioLibrary) {
            throw new Error("Use getInstance - you shmuck!");
        }
        else {
            AudioLibrary._audioLibrary = this;
            this._navigator.getUserMedia = (navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia);
            if (!navigator.getUserMedia) {
                throw new Error("Get user media is not available. AudioLibrary could not be loaded.");
            }
        }
    }
    retrieveAudioContext() {
        if (typeof AudioContext !== "undefined") {
            return new AudioContext();
        }
        else {
            throw new Error("AudioContext not supported");
        }
    }
}
AudioLibrary._audioLibrary = new AudioLibrary();
