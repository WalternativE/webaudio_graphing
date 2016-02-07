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

    public connectAudioNode(destinationAudioNode: WebAudioNode) {
        this._audioComponent.connect(destinationAudioNode._audioComponent);
    }
}

export class Edge {
    private _source: WebAudioNode;
    private _destination: WebAudioNode;

    constructor(public edgeID:number, source?: WebAudioNode, destination?: WebAudioNode) {
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
    
    public establishConnection() {
        if (this._source && this._destination) {
            this._source.connectAudioNode(this._destination);
        }
    }
}