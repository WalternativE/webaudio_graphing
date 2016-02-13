import {
    Component,
    OnDestroy
} from 'angular2/core';
import {WebAudioNode} from './graph.library';
import {AudioNode} from './audionode.component';

@Component({
    selector: 'input-node',
    templateUrl: 'templates/miceinputnode.template.html',
    styleUrls: ['css/connectorstyle.css']
})
export class MiceInputNode implements AudioNode, OnDestroy{
    
    webAudioNode: WebAudioNode;
    callback: (node: WebAudioNode) => void;    
    
    setNode(webAudioNode: WebAudioNode) {
        this.webAudioNode = webAudioNode;
    }
    
    setNodeClickedCallback(callback) {
        this.callback = callback;
    }
    
    ngOnDestroy() {
        // release node resources here
        console.log('Input Node destroyed!');
    }    
}