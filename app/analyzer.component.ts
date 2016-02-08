import {
Component,
OnInit,
AfterViewInit,
ElementRef
} from 'angular2/core';
import {WebAudioNode} from './graph.library';
import {AudioNode} from './audionode.component';

@Component({
    selector: 'input-node',
    templateUrl: 'templates/analyzer.template.html',
    styleUrls: ['css/connectorstyle.css', 'css/analyzer.css']
})
export class AnalyzerComponent implements AudioNode, OnInit, AfterViewInit {

    webAudioNode: WebAudioNode;
    callback: (node: WebAudioNode) => void;

    analyzer: AnalyserNode;

    ctxHeartbeat: CanvasRenderingContext2D;
    
    aniFrameId;
    
    bufferLength;

    constructor(private _elRef: ElementRef) {
    }

    setNode(webAudioNode: WebAudioNode) {
        this.webAudioNode = webAudioNode;

        this.analyzer = <AnalyserNode>webAudioNode.audioComponent.node;
        this.analyzer.smoothingTimeConstant = 0.85;
        
        this.webAudioNode.onConnectedCallback = () => {
            this.draw();
        };
        
        this.analyzer.fftSize = 2048;        
    }

    setNodeClickedCallback(callback) {
        this.callback = callback;
        this.bufferLength = this.analyzer.frequencyBinCount;
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        var element: HTMLElement = <HTMLElement>this._elRef.nativeElement;

        var canvasHeartBeat = <HTMLCanvasElement>element.querySelector('.heartbeat');

        this.ctxHeartbeat = canvasHeartBeat.getContext('2d');
    }

    draw() {
        this.aniFrameId = window.requestAnimationFrame(() => { this.draw(); });
        
        var xc = 0;
        var yc = 0;
        var i = 0;
        
        var drawStreamArray = new Uint8Array(this.bufferLength);
        this.analyzer.getByteFrequencyData(drawStreamArray);

        this.ctxHeartbeat.clearRect(0, 0, 400, 400);
        this.ctxHeartbeat.lineWidth = 1.0;
        this.ctxHeartbeat.fillStyle = "#FFFFFF";
        this.ctxHeartbeat.strokeStyle = "#DDDDDD";
        this.ctxHeartbeat.beginPath();
        this.ctxHeartbeat.moveTo(150 + Math.cos(0.5 * Math.PI) * (25 + (drawStreamArray[0] / 150 * 80)), 150 + Math.sin(0.5 * Math.PI) * (25 + (drawStreamArray[0] / 150 * 80)));

        for (i = 1; i < (drawStreamArray.length / 4); i++) {
            xc = ((150 + Math.cos((0.5 - (i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i] / 150 * 80))) + (150 + Math.cos((0.5 - (i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i + 1] / 150 * 80)))) / 2;
            yc = ((150 + Math.sin((0.5 - (i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i] / 150 * 80))) + (150 + Math.sin((0.5 - (i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i + 1] / 150 * 80)))) / 2;
            this.ctxHeartbeat.quadraticCurveTo((150 + Math.cos((0.5 - (i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i] / 150 * 80))),
                (150 + Math.sin((0.5 - (i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i] / 150 * 80))), xc, yc);
            this.ctxHeartbeat.fillStyle = 'rgb(' + (drawStreamArray[i] + 150) + ',' + (drawStreamArray[i] + 0) + ',' + (drawStreamArray[i] + 0) + ')';
        }

        this.ctxHeartbeat.quadraticCurveTo((150 + Math.cos((0.5 - (i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i] / 150 * 80))),
            (150 + Math.sin((0.5 - (i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i] / 150 * 80))),
            (150 + Math.cos((0.5 - (i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i + 1] / 150 * 80))),
            (150 + Math.sin((0.5 - (i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i + 1] / 150 * 80))));

        this.ctxHeartbeat.moveTo(150 + Math.cos(0.5 * Math.PI) * (25 + (drawStreamArray[0] / 150 * 80)), 150 + Math.sin(0.5 * Math.PI) * (25 + (drawStreamArray[0] / 150 * 80)));

        for (i = 1; i < (drawStreamArray.length / 4); i++) {
            xc = ((150 + Math.cos((0.5 - (4 - i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i] / 150 * 80))) + (150 + Math.cos((0.5 - (4 - i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i + 1] / 150 * 80)))) / 2;
            yc = ((150 + Math.sin((0.5 - (4 - i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i] / 150 * 80))) + (150 + Math.sin((0.5 - (4 - i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i + 1] / 150 * 80)))) / 2;
            this.ctxHeartbeat.quadraticCurveTo((150 + Math.cos((0.5 - (4 - i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i] / 150 * 80))),
                (150 + Math.sin((0.5 - (4 - i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i] / 150 * 80))), xc, yc);
        }

        this.ctxHeartbeat.quadraticCurveTo((150 + Math.cos((0.5 - (4 - i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i] / 150 * 80))),
            (150 + Math.sin((0.5 - (4 - i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i] / 150 * 80))),
            (150 + Math.cos((0.5 - (4 - i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i + 1] / 150 * 80))),
            (150 + Math.sin((0.5 - (4 - i / drawStreamArray.length * 4)) * Math.PI) * (25 + (drawStreamArray[i + 1] / 150 * 80))));

        this.ctxHeartbeat.fill();
        this.ctxHeartbeat.stroke();
    }
}