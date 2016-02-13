import {
    Component,
    OnDestroy,
    OnInit
} from 'angular2/core';
import {WebAudioNode} from './graph.library';
import {AudioNode} from './audionode.component';
import {AudioHelper, AudioNodeCreator} from './audioLibrary.library';

@Component({
    selector: 'input-node',
    templateUrl: 'templates/inputnode.template.html',
    styleUrls: ['css/connectorstyle.css']
})
export class InputNodeComponent implements AudioNode, OnDestroy, OnInit{
    
    private _audioNodeCreator: AudioNodeCreator;
    private _isPlaying = true;
    
    webAudioNode: WebAudioNode;
    callback: (node: WebAudioNode) => void;
    
    audioNode: AudioBufferSourceNode;
    
    setNode(webAudioNode: WebAudioNode) {
        this.webAudioNode = webAudioNode;
        
        this.audioNode = <AudioBufferSourceNode>webAudioNode.audioComponent.node;
    }
    
    setNodeClickedCallback(callback) {
        this.callback = callback;
    }
    
    // pausing and restarting is not trivial - see: http://stackoverflow.com/questions/11506180/web-audio-api-resume-from-pause
    // the following code is a dirty hack
    togglePlay() {
        if (this._isPlaying) {
            this.audioNode.playbackRate.value = 0.000001;
            this._isPlaying = false;
        } else {
            this.audioNode.playbackRate.value = 1;           
            this._isPlaying = true;
        }
    }
    
    // for swapping createSoundNodeFromFileURL(fileUrl: string, playbackRate: number)
    // or rather requestDecodedSoundFile(fileURL: string, callback: (buffer: AudioBuffer) => void)
    
    swapAudioFile() {
        
    }
    
    ngOnDestroy() {
        // release node resources here
        console.log('Input Node destroyed!');
    }
    
    ngOnInit() {
        var helper: AudioHelper = AudioHelper.getInstance();
        this._audioNodeCreator = new AudioNodeCreator(helper.retrieveAudioContext());
    } 
}