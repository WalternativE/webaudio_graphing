import {
Component,
OnInit,
Output,
EventEmitter
} from 'angular2/core';
import {AudioNodeCreator, AudioHelper} from './audioLibrary.library';
import {WebAudioNode} from './graph.library';
import {AudioComponentMetaWrapper} from './app.component';
import {InputNodeComponent} from './inputnode.component';
import {OutputNodeComponent} from './outputnode.component';

@Component({
    selector: 'pallette',
    templateUrl: 'templates/pallette.template.html'
})
export class PalletteComponent implements OnInit {

    private _audioNodeCreator: AudioNodeCreator;

    @Output() newNode = new EventEmitter<AudioComponentMetaWrapper>();

    createInput() {
        this.newNode.emit(new AudioComponentMetaWrapper(InputNodeComponent,
                            this._audioNodeCreator.createSoundNodeFromFileURL("finnish_metal.mp3", 1)));
        // this.newNode.emit(new WebAudioNode(10, 10, 50, 50, "black", "black", this._audioNodeCreator.createSoundNodeFromFileURL("finnish_metal.mp3", 1)));
    }

    createOutput() {
        this.newNode.emit(new AudioComponentMetaWrapper(OutputNodeComponent,
                            this._audioNodeCreator.createDestinationNode()));
        // this.newNode.emit(new WebAudioNode(370, 10, 50, 50, "blue", "blue", this._audioNodeCreator.createDestinationNode()));
    }

    createFilter() {
        // this.newNode.emit(new WebAudioNode(250, 10, 50, 50, "brown", "brown", this._audioNodeCreator.createLowPassNode(500, 25)));
    }

    createGain() {
        // this.newNode.emit(new WebAudioNode(130, 10, 50, 50, "red", "red", this._audioNodeCreator.createGainNode(1)));
    }

    createConvolver() {
        // this.newNode.emit(new WebAudioNode(190, 10, 50, 50, "pink", "pink", this._audioNodeCreator.createConvolverNode("irs_pipe_carpet.wav")));
    }

    ngOnInit() {
        var helper: AudioHelper = AudioHelper.getInstance();
        this._audioNodeCreator = new AudioNodeCreator(helper.retrieveAudioContext());
    }
}