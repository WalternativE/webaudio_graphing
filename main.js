"use strict";

(function () {

    var audioContextCheck = function () {
        if (typeof AudioContext !== "undefined") {
            return new AudioContext();
        }
        else if (typeof webkitAudioContext !== "undefined") {
            return new webKitAudioContext();
        }
        else if (typeof mozAudioContext !== "undefined") {
            return new mozAudioContext();
        }
        else {
            throw new Error("AudioContext not supported");
        }
    };

    var makeSound = function (audioContext) {
        var nodesToCleanUp = [];

        var oscillator1 = audioContext.createOscillator();
        oscillator1.type = "sawtooth";
        oscillator1.frequency.value = 440;
        nodesToCleanUp.push(oscillator1);

        // var oscillator2 = audioContext.createOscillator();
        // oscillator2.type = "square";
        // oscillator2.frequency.value = 300;
        // nodesToCleanUp.push(oscillator2);

        oscillator1.start(audioContext.currentTime);
        // oscillator2.start(audioContext.currentTime);

        var gainNode1 = audioContext.createGain();
        // var gainNode2 = audioContext.createGain();
        // var gainMix = audioContext.createGain();
        nodesToCleanUp.push(gainNode1);
        // nodesToCleanUp.push(gainNode2);
        // nodesToCleanUp.push(gainMix);

        gainNode1.gain.value = 1;
        // gainNode2.gain.value = 0.6;
        
        var filter = audioContext.createBiquadFilter();
        
        filter.type = "bandpass";
        filter.frequency.value = 400;
        filter.Q.value = 5;
        
        console.log(filter.type);
        nodesToCleanUp.push(filter);

        oscillator1.connect(gainNode1);
        // oscillator2.connect(gainNode2);
        gainNode1.connect(filter);
        // gainNode2.connect(gainMix);

        // gainMix.connect(audioContext.destination);
        
        filter.connect(audioContext.destination);

        setTimeout(function () {
            nodesToCleanUp.forEach(function (node) {
                node.disconnect();
            });
            oscillator1.stop();
        }, 2000);
    };

    var audioContext = audioContextCheck();

    var makeSoundButton = document.getElementById("makeSound");
    makeSoundButton.onclick = function () {
        makeSound(audioContext);
    }
})();
