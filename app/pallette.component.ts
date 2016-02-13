import {
Component,
OnInit,
Output,
EventEmitter
} from 'angular2/core';
import {AudioNodeCreator, AudioHelper} from './audioLibrary.library';
import {WebAudioNode} from './graph.library';
import {InputNodeComponent} from './inputnode.component';
import {OutputNodeComponent} from './outputnode.component';
import {ConvolverComponent} from './convolver.component';
import {FilterComponent} from './filter.component';
import {GainComponent} from './gain.component';
import {AnalyzerComponent} from './analyzer.component';
import {MiceInputNode} from './miceinputnode.component';

@Component({
    selector: 'pallette',
    templateUrl: 'templates/pallette.template.html'
})
export class PalletteComponent implements OnInit {

    private _audioNodeCreator: AudioNodeCreator;

    @Output() newNode = new EventEmitter<WebAudioNode>();

    createFileInput() {
        this.newNode.emit(new WebAudioNode(100, 100,
            this._audioNodeCreator.createSoundNodeFromFileURL("finnish_metal.mp3", 1), InputNodeComponent));
    }

    createMiceInput() {
        this._audioNodeCreator.createSoundNodeFromLiveStreamn().then((miceAudioComponent) => {
            this.newNode.emit(new WebAudioNode(50, 50,
                miceAudioComponent, MiceInputNode));
        });
    }

    createOutput() {
        this.newNode.emit(new WebAudioNode(75, 75,
            this._audioNodeCreator.createDestinationNode(), OutputNodeComponent));
    }

    createFilter() {
        this.newNode.emit(new WebAudioNode(125, 125,
            this._audioNodeCreator.createLowPassNode(750, 1), FilterComponent));
    }

    createGain() {
        this.newNode.emit(new WebAudioNode(175, 175,
            this._audioNodeCreator.createGainNode(1), GainComponent));
    }

    createConvolver() {
        this.newNode.emit(new WebAudioNode(150, 150,
            this._audioNodeCreator.createConvolverNode('irs_pipe_carpet.wav'), ConvolverComponent));
    }

    createAnalyzer() {
        this.newNode.emit(new WebAudioNode(200, 200,
            this._audioNodeCreator.createAnalyzerNode(), AnalyzerComponent));
    }

    ngOnInit() {
        var helper: AudioHelper = AudioHelper.getInstance();
        this._audioNodeCreator = new AudioNodeCreator(helper.retrieveAudioContext());
    }
}