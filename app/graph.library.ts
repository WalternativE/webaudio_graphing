import {AudioComponent} from "./audioLibrary.library";

export class WebAudioNode {

    private _posX: number;
    private _posY: number;
    private _sizeX: number;
    private _sizeY: number;
    private _fillStyle: string;
    private _strokeStyle: string;
    private _audioComponent: AudioComponent;

    constructor(posX: number, posY: number, sizeX: number, sizeY: number, fillStyle: string, strokeStyle: string, audioComponent: AudioComponent) {
        this._posX = posX;
        this._posY = posY;
        this._sizeX = sizeX;
        this._sizeY = sizeY;
        this._fillStyle = fillStyle;
        this._strokeStyle = strokeStyle;
        this._audioComponent = audioComponent;
    }

    public get posX(): number {
        return this._posX;
    }

    public set posX(value: number) {
        this._posX = value;
    }

    public get posY(): number {
        return this._posY;
    }

    public set posY(value: number) {
        this._posY = value;
    }

    public get sizeX(): number {
        return this._sizeX;
    }

    public set sizeX(value: number) {
        this._sizeX = value;
    }

    public get sizeY(): number {
        return this._sizeY;
    }

    public set sizeY(value: number) {
        this._sizeY = value;
    }

    public get fillStyle(): string {
        return this._fillStyle;
    }

    public set fillStyle(value: string) {
        this._fillStyle = value;
    }

    public get strokeStyle(): string {
        return this._strokeStyle;
    }

    public set strokeStyle(value: string) {
        this._strokeStyle = value;
    }

    public get audioComponent(): AudioComponent {
        return this._audioComponent;
    }

    public isInHitbox(posOnCanvas: { x: number, y: number }): boolean {
        if (posOnCanvas.x < this._posX || posOnCanvas.x > (this._posX + this._sizeX)
            || posOnCanvas.y < this._posY || posOnCanvas.y > (this._posY + this._sizeY)) {
            return false;
        } else {
            return true;
        }
    }

    public connectAudioNode(destinationAudioNode: WebAudioNode) {
        this._audioComponent.connect(destinationAudioNode._audioComponent);
    }
}

export class Edge {
    private _source: WebAudioNode;
    private _destination: WebAudioNode;

    constructor(source: WebAudioNode, destination: WebAudioNode) {
        this._source = source;
        this._destination = destination;
    }

    public get source(): WebAudioNode {
        return this._source;
    }

    public set source(value: WebAudioNode) {
        this._source = value;
    }

    public get destination(): WebAudioNode {
        return this._destination;
    }

    public set destination(value: WebAudioNode) {
        this._destination = value;
        if (this._source) {
            this._source.connectAudioNode(this._destination);
        }
    }

    drawVisualConnection(canvasContext: CanvasRenderingContext2D) {
        canvasContext.beginPath();
        canvasContext.moveTo(this._source.posX, this._source.posY);
        canvasContext.lineTo(this._destination.posX, this._destination.posY);
        canvasContext.stroke();
    }
}

export class AudioGraph {
    private _vertices: WebAudioNode[] = [];
    private _edges: Edge[] = [];

    addNode(audioNode: WebAudioNode) {
        this._vertices.push(audioNode);
    }

    addEdge(edge: Edge) {
        this._edges.push(edge);
    }

    drawGraph(targetCanvas: CanvasRenderingContext2D) {
        this._vertices.forEach(function(node) {
            targetCanvas.beginPath();
            targetCanvas.rect(node.posX, node.posY, node.sizeX, node.sizeY);
            targetCanvas.fillStyle = node.fillStyle;
            targetCanvas.fill();
            targetCanvas.strokeStyle = node.strokeStyle;
            targetCanvas.stroke();
        });

        this._edges.forEach(function(edge) {
            edge.drawVisualConnection(targetCanvas);
        });
    }

    retrieveNodeForMousePosOrReturnNull(mousePos: { x: number, y: number }): WebAudioNode {
        var retrievedNode: WebAudioNode = null;

        this._vertices.forEach(function(node) {
            if (node.isInHitbox(mousePos)) {
                retrievedNode = node;
            }
        });

        return retrievedNode;
    }
}