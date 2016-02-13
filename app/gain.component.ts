import {
    Component
} from 'angular2/core';
import {WebAudioNode} from './graph.library';
import {AudioNode} from './audionode.component';

@Component({
    selector: 'input-node',
    templateUrl: 'templates/gain.template.html',
    styleUrls: ['css/connectorstyle.css']
})
export class GainComponent implements AudioNode{
    
    webAudioNode: WebAudioNode;
    callback: (node: WebAudioNode) => void;
    
    audioNode: GainNode;  
    
    setNode(webAudioNode: WebAudioNode) {
        this.webAudioNode = webAudioNode;
        
        this.audioNode = <GainNode>webAudioNode.audioComponent.node;
    }
    
    setNodeClickedCallback(callback) {
        this.callback = callback;
    } 
}