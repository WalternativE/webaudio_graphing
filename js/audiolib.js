// var audioFileLoader = function (fileDirectory, impulseFileDirectory) {
//     var soundObj = {};
//     soundObj.fileDirectory = fileDirectory;
//     soundObj.impulseFileDirectory = impulseFileDirectory;
//     var getSound = new XMLHttpRequest();
//     getSound.open("GET", soundObj.fileDirectory, true);
//     getSound.responseType = "arraybuffer";
//     getSound.onload = function () {
//         audioContext.decodeAudioData(getSound.response, function (buffer) {
//             soundObj.soundToPlay = buffer;
//             console.log("Sound file loaded");
//         });
//     };
//     getSound.send();
//     var impulseBuffer;
//     var getImpulse = new XMLHttpRequest();
//     getImpulse.open("GET", soundObj.impulseFileDirectory, true);
//     getImpulse.responseType = "arraybuffer";
//     getImpulse.onload = function () {
//         audioContext.decodeAudioData(getImpulse.response, function (bufferImpls) {
//             impulseBuffer = bufferImpls;
//             console.log("Impulse file loaded");
//         });
//     };
//     getImpulse.send();
//     soundObj.play = function (playbackRate, volumeVal) {
//         var volume = audioContext.createGain();
//         volume.gain.value = volumeVal;
//         var playSound = audioContext.createBufferSource();
//         playSound.playbackRate.value = playbackRate;
//         playSound.buffer = soundObj.soundToPlay;
//         playSound.connect(volume);
//         volume.connect(audioContext.destination);
//         playSound.start(audioContext.currentTime);
//     };
//     soundObj.playLiveStream = function () {
//         if (navigator.getUserMedia) {
//             console.log("getUserMedia supported");
//             navigator.getUserMedia(
//                 {
//                     audio: true,
//                     video: false
//                 },
//                 function (stream) {
//                     soundObj.liveStreamSource = audioContext.createMediaStreamSource(stream);
//                     console.log("Live stream running");
//                     var convolver = audioContext.createConvolver();
//                     convolver.buffer = impulseBuffer;
//                     soundObj.liveStreamSource.connect(convolver);
//                     convolver.connect(audioContext.destination);
//                 },
//                 function (err) {
//                     console.log("Error occured: " + err);
//                 }
//                 );
//         }
//     };
//     return soundObj;
// }; 
