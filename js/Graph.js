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
var Graph;
(function (Graph) {
    var Types;
    (function (Types) {
        class WebAudioNode {
            constructor(posX, posY, sizeX, sizeY, fillStyle, strokeStyle, audioComponent) {
                this._posX = posX;
                this._posY = posY;
                this._sizeX = sizeX;
                this._sizeY = sizeY;
                this._fillStyle = fillStyle;
                this._strokeStyle = strokeStyle;
                this._audioComponent = audioComponent;
            }
            get posX() {
                return this._posX;
            }
            set posX(value) {
                this._posX = value;
            }
            get posY() {
                return this._posY;
            }
            set posY(value) {
                this._posY = value;
            }
            get sizeX() {
                return this._sizeX;
            }
            set sizeX(value) {
                this._sizeX = value;
            }
            get sizeY() {
                return this._sizeY;
            }
            set sizeY(value) {
                this._sizeY = value;
            }
            get fillStyle() {
                return this._fillStyle;
            }
            set fillStyle(value) {
                this._fillStyle = value;
            }
            get strokeStyle() {
                return this._strokeStyle;
            }
            set strokeStyle(value) {
                this._strokeStyle = value;
            }
            get audioComponent() {
                return this._audioComponent;
            }
            isInHitbox(posOnCanvas) {
                if (posOnCanvas.x < this._posX || posOnCanvas.x > (this._posX + this._sizeX)
                    || posOnCanvas.y < this._posY || posOnCanvas.y > (this._posY + this._sizeY)) {
                    return false;
                }
                else {
                    return true;
                }
            }
            connectAudioNode(destinationAudioNode) {
                this._audioComponent.connect(destinationAudioNode._audioComponent);
            }
        }
        Types.WebAudioNode = WebAudioNode;
        class Edge {
            constructor(source, destination) {
                this._source = source;
                this._destination = destination;
            }
            get source() {
                return this._source;
            }
            set source(value) {
                this._source = value;
            }
            get destination() {
                return this._destination;
            }
            set destination(value) {
                this._destination = value;
                if (this._source) {
                    this._source.connectAudioNode(this._destination);
                }
            }
            drawVisualConnection(canvasContext) {
                canvasContext.beginPath();
                canvasContext.moveTo(this._source.posX, this._source.posY);
                canvasContext.lineTo(this._destination.posX, this._destination.posY);
                canvasContext.stroke();
            }
        }
        Types.Edge = Edge;
        class AudioGraph {
            constructor() {
                this._vertices = [];
                this._edges = [];
            }
            addNode(audioNode) {
                this._vertices.push(audioNode);
            }
            addEdge(edge) {
                this._edges.push(edge);
            }
            drawGraph(targetCanvas) {
                this._vertices.forEach(function (node) {
                    targetCanvas.beginPath();
                    targetCanvas.rect(node.posX, node.posY, node.sizeX, node.sizeY);
                    targetCanvas.fillStyle = node.fillStyle;
                    targetCanvas.fill();
                    targetCanvas.strokeStyle = node.strokeStyle;
                    targetCanvas.stroke();
                });
                this._edges.forEach(function (edge) {
                    edge.drawVisualConnection(targetCanvas);
                });
            }
            retrieveNodeForMousePosOrReturnNull(mousePos) {
                var retrievedNode = null;
                this._vertices.forEach(function (node) {
                    if (node.isInHitbox(mousePos)) {
                        retrievedNode = node;
                    }
                });
                return retrievedNode;
            }
        }
        Types.AudioGraph = AudioGraph;
    })(Types = Graph.Types || (Graph.Types = {}));
})(Graph || (Graph = {}));
