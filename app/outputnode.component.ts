import {
    Component
} from 'angular2/core';
import {WebAudioNode} from './graph.library';
import {AudioNode} from './audionode.component';

@Component({
    selector: 'output-node',
    templateUrl: 'templates/outputnode.template.html'
})
export class OutputNodeComponent implements AudioNode {
    
    webAudioNode: WebAudioNode;
    callback: () => void;
    
    setComponentMetaWrapper(node: WebAudioNode) {
        this.webAudioNode = node;
    }
    
    setNodeClickedCallback(callback: () => void) {
        this.callback = callback;
    }
}