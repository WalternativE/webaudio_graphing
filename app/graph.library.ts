import {AudioComponent} from "./audioLibrary.library";
import {Type} from "angular2/core";

export class WebAudioNode {

    posX: number;
    posY: number;
    private _audioComponent: AudioComponent;
    private _type: Type;

    constructor(posX: number, posY: number, audioComponent: AudioComponent, type: Type) {
        this.posX = posX;
        this.posY = posY;
        this._audioComponent = audioComponent;
        this._type = type;
    }

    public get audioComponent(): AudioComponent {
        return this._audioComponent;
    }
    
    public get type(): Type {
        return this._type;
    }

    // public connectAudioNode(destinationAudioNode: WebAudioNode) {
    //     this._audioComponent.connect(destinationAudioNode._audioComponent);
    // }
}

// export class Edge {
//     private _source: WebAudioNode;
//     private _destination: WebAudioNode;

//     constructor(source: WebAudioNode, destination: WebAudioNode) {
//         this._source = source;
//         this._destination = destination;
//     }

//     public get source(): WebAudioNode {
//         return this._source;
//     }

//     public set source(value: WebAudioNode) {
//         this._source = value;
//     }

//     public get destination(): WebAudioNode {
//         return this._destination;
//     }

//     public set destination(value: WebAudioNode) {
//         this._destination = value;
//         if (this._source) {
//             this._source.connectAudioNode(this._destination);
//         }
//     }

//     drawVisualConnection(canvasContext: CanvasRenderingContext2D) {
//         canvasContext.beginPath();
//         canvasContext.moveTo(this._source.posX, this._source.posY);
//         canvasContext.lineTo(this._destination.posX, this._destination.posY);
//         canvasContext.stroke();
//     }
// }

// export class AudioGraph {
//     private _vertices: WebAudioNode[] = [];
//     private _edges: Edge[] = [];

//     addNode(audioNode: WebAudioNode) {
//         this._vertices.push(audioNode);
//     }

//     addEdge(edge: Edge) {
//         this._edges.push(edge);
//     }

//     drawGraph(targetCanvas: CanvasRenderingContext2D) {
//         this._vertices.forEach(function(node) {
//             targetCanvas.beginPath();
//             targetCanvas.rect(node.posX, node.posY, node.sizeX, node.sizeY);
//             targetCanvas.fillStyle = node.fillStyle;
//             targetCanvas.fill();
//             targetCanvas.strokeStyle = node.strokeStyle;
//             targetCanvas.stroke();
//         });

//         this._edges.forEach(function(edge) {
//             edge.drawVisualConnection(targetCanvas);
//         });
//     }

//     retrieveNodeForMousePosOrReturnNull(mousePos: { x: number, y: number }): WebAudioNode {
//         var retrievedNode: WebAudioNode = null;

//         this._vertices.forEach(function(node) {
//             if (node.isInHitbox(mousePos)) {
//                 retrievedNode = node;
//             }
//         });

//         return retrievedNode;
//     }
// }