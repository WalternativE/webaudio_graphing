"use strict";

(function () {

    var snare = audioFileLoader("snares2.mp3", "irs_pipe_carpet.wav");

    // window.addEventListener("keydown", function () {
    //     snare.play(4, 0.3);
    // }, false);
    
    snare.playLiveStream();

})();