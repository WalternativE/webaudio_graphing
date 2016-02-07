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

@Component({
    selector: 'pallette',
    templateUrl: 'templates/pallette.template.html'
})
export class PalletteComponent implements OnInit {

    private _audioNodeCreator: AudioNodeCreator;

    @Output() newNode = new EventEmitter<WebAudioNode>();

    createInput() {
        this.newNode.emit(new WebAudioNode(100, 100,
                            this._audioNodeCreator.createSoundNodeFromFileURL("finnish_metal.mp3", 1), InputNodeComponent));
    }

    createOutput() {
        this.newNode.emit(new WebAudioNode(75, 75,
                            this._audioNodeCreator.createDestinationNode(), OutputNodeComponent));
    }

    createFilter() {
    }

    createGain() {
    }

    createConvolver() {
    }

    ngOnInit() {
        var helper: AudioHelper = AudioHelper.getInstance();
        this._audioNodeCreator = new AudioNodeCreator(helper.retrieveAudioContext());
    }
}