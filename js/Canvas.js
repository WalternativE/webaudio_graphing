"use strict";
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
        // this references broken as fuck - shitfuck fucking shit
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
                this.init();
            }
            init() {
                this.elements = {
                    testNode: new WebAudioNode(10, 10, 50, 50, "black", "black", null),
                    otherTestNode: new WebAudioNode(70, 10, 50, 50, "blue", "blue", null)
                };
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
