"use strict";

module Canvas {

    import WebAudioNode = Graph.Types.WebAudioNode;

    export interface NameToWebAudioNodeMap {
        [name: string]: WebAudioNode;
    }

    export class Helper {

        static getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent): { x: number, y: number } {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }

        static moveNode(canvas: HTMLCanvasElement, evt: MouseEvent, node: WebAudioNode) {
            var mousePos = this.getMousePos(canvas, evt);
            node.posX = mousePos.x;
            node.posY = mousePos.y;
        }

    }

    export module Types {

        import AudioHelper = AudioLibrary.AudioHelper;
        import AudioNodeCreator = AudioLibrary.AudioNodeCreator;

        export interface NodeToCreateChangeListener {
            (node: WebAudioNode): void;
        }

        export class Pallette {
            private _canvas: HTMLCanvasElement;
            private _canvasContext: CanvasRenderingContext2D;

            private _nodeToCreateChangeListener: NodeToCreateChangeListener;
            
            private _audioNodeCreator: AudioNodeCreator;

            public elements: NameToWebAudioNodeMap = {};

            constructor(canvasID: string) {

                this._canvas = <HTMLCanvasElement>document.getElementById(canvasID);
                this._canvas.width = window.innerWidth;

                this._canvasContext = this._canvas.getContext("2d");

                this._canvas.onmousedown = (evt: MouseEvent) => {
                    var retrievedPalletteNode = this.retrieveNodeForMousePosOrReturnNull(Helper.getMousePos(this._canvas, evt));

                    if (retrievedPalletteNode) {
                        this._canvas.onmousemove = (event: MouseEvent) => {
                            if (this._nodeToCreateChangeListener) {
                                this._nodeToCreateChangeListener(retrievedPalletteNode);
                            }
                            Helper.moveNode(this._canvas, event, retrievedPalletteNode);
                        };
                    }
                }

                this._canvas.onmouseup = () => {
                    this._canvas.onmousemove = null;
                    if (this._nodeToCreateChangeListener) {
                        this._nodeToCreateChangeListener(null);
                    }
                }

                let helper: AudioHelper = AudioHelper.getInstance();
                this._audioNodeCreator = new AudioNodeCreator(helper.retrieveAudioContext());

                this.init();
            }

            private async init() {
                this.elements = {
                    fileSourceNode: new WebAudioNode(10, 10, 50, 50, "black", "black", this._audioNodeCreator.createSoundNodeFromFileURL("snares2.mp3", 1)),
                    miceInputSourceNode: new WebAudioNode(70, 10, 50, 50, "green", "green", await this._audioNodeCreator.createSoundNodeFromLiveStreamn()),
                    halfGainNode: new WebAudioNode(130, 10, 50, 50, "red", "red", this._audioNodeCreator.createGainNode(0.1)),
                    destinationNode: new WebAudioNode(190, 10, 50, 50, "blue", "blue", this._audioNodeCreator.createDestinationNode())
                };
            }

            public draw() {
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

            public retrieveNodeForMousePosOrReturnNull(mousePos): WebAudioNode {
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

            public reset() {
                this._canvas.onmousemove = null;
                this.init();
            }

            public resizeToWindowWidth() {
                this._canvas.width = window.innerWidth;
            }

            public setNodeToCreateChangeListener(listener: NodeToCreateChangeListener) {
                this._nodeToCreateChangeListener = listener;
            }
        }
    }
}