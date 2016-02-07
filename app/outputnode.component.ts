import {
    Component
} from 'angular2/core';
import {WebAudioNode} from './graph.library';
import {AudioNode} from './audionode.component';

@Component({
    selector: 'output-node',
    templateUrl: 'templates/outputnode.template.html',
    styleUrls: ['css/connectorstyle.css']
})
export class OutputNodeComponent implements AudioNode {
    
    webAudioNode: WebAudioNode;
    callback: (node: WebAudioNode) => void;
    
    setNode(node: WebAudioNode) {
        this.webAudioNode = node;
    }
    
    setNodeClickedCallback(callback: () => void) {
        this.callback = callback;
    }
}