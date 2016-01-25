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
var Canvas;
(function (Canvas) {
    var WebAudioNode = Graph.Types.WebAudioNode;
    class Helper {
        static getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
        static moveNode(canvas, evt, node) {
            var mousePos = this.getMousePos(canvas, evt);
            node.posX = mousePos.x;
            node.posY = mousePos.y;
        }
    }
    Canvas.Helper = Helper;
    var Types;
    (function (Types) {
        var AudioHelper = AudioLibrary.AudioHelper;
        var AudioNodeCreator = AudioLibrary.AudioNodeCreator;
        class Pallette {
            constructor(canvasID) {
                this.elements = {};
                this._canvas = document.getElementById(canvasID);
                this._canvas.width = window.innerWidth;
                this._canvasContext = this._canvas.getContext("2d");
                this._canvas.onmousedown = (evt) => {
                    var retrievedPalletteNode = this.retrieveNodeForMousePosOrReturnNull(Helper.getMousePos(this._canvas, evt));
                    if (retrievedPalletteNode) {
                        this._canvas.onmousemove = (event) => {
                            if (this._nodeToCreateChangeListener) {
                                this._nodeToCreateChangeListener(retrievedPalletteNode);
                            }
                            Helper.moveNode(this._canvas, event, retrievedPalletteNode);
                        };
                    }
                };
                this._canvas.onmouseup = () => {
                    this._canvas.onmousemove = null;
                    if (this._nodeToCreateChangeListener) {
                        this._nodeToCreateChangeListener(null);
                    }
                };
                let helper = AudioHelper.getInstance();
                this._audioNodeCreator = new AudioNodeCreator(helper.retrieveAudioContext());
                this.init();
            }
            init() {
                return __awaiter(this, void 0, Promise, function* () {
                    this.elements = {
                        fileSourceNode: new WebAudioNode(10, 10, 50, 50, "black", "black", this._audioNodeCreator.createSoundNodeFromFileURL("snares2.mp3", 1)),
                        miceInputSourceNode: new WebAudioNode(70, 10, 50, 50, "green", "green", yield this._audioNodeCreator.createSoundNodeFromLiveStreamn()),
                        halfGainNode: new WebAudioNode(130, 10, 50, 50, "red", "red", this._audioNodeCreator.createGainNode(0.1)),
                        destinationNode: new WebAudioNode(190, 10, 50, 50, "blue", "blue", this._audioNodeCreator.createDestinationNode())
                    };
                });
            }
            draw() {
                this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
                for (var key in this.elements) {
                    if (this.elements.hasOwnProperty(key)) {
                        var choiceNode = this.elements[key];
                        this._canvasContext.beginPath();
                        this._canvasContext.rect(choiceNode.posX, choiceNode.posY, choiceNode.sizeX, choiceNode.sizeY);
                        this._canvasContext.fillStyle = choiceNode.fillStyle;
                        this._canvasContext.fill();
                        this._canvasContext.strokeStyle = choiceNode.strokeStyle;
                        this._canvasContext.stroke();
                    }
                }
            }
            retrieveNodeForMousePosOrReturnNull(mousePos) {
                for (var key in this.elements) {
                    if (this.elements.hasOwnProperty(key)) {
                        var choiceNode = this.elements[key];
                        if (choiceNode.isInHitbox(mousePos)) {
                            return choiceNode;
                        }
                    }
                }
                return null;
            }
            reset() {
                this._canvas.onmousemove = null;
                this.init();
            }
            resizeToWindowWidth() {
                this._canvas.width = window.innerWidth;
            }
            setNodeToCreateChangeListener(listener) {
                this._nodeToCreateChangeListener = listener;
            }
        }
        Types.Pallette = Pallette;
    })(Types = Canvas.Types || (Canvas.Types = {}));
})(Canvas || (Canvas = {}));
