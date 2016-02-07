import {
    Component,
    OnDestroy
} from 'angular2/core';
import {WebAudioNode} from './graph.library';
import {AudioNode} from './audionode.component';

@Component({
    selector: 'input-node',
    templateUrl: 'templates/inputnode.template.html',
    styleUrls: ['css/connectorstyle.css']
})
export class InputNodeComponent implements AudioNode, OnDestroy{
    
    webAudioNode: WebAudioNode;
    callback: () => void;    
    
    setComponentMetaWrapper(wrapper: WebAudioNode) {
        this.webAudioNode = wrapper;
    }
    
    setNodeClickedCallback(callback) {
        this.callback = callback;
    }
    
    ngOnDestroy() {
        // release node resources here
        console.log('Input Node destroyed!');
    }
    
    changePos() {
        console.log(this.webAudioNode)
        this.webAudioNode.posX += 5;
        this.webAudioNode.posY += 5;
        console.log(this.webAudioNode);
    }
    
}