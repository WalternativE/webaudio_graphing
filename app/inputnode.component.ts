import {
    Component
} from 'angular2/core';
import {AudioComponentMetaWrapper} from './app.component';
import {AudioNode} from './audionode.component';
import {AudioNodeComponent} from './audionode.component';

@Component({
    selector: 'input-node',
    templateUrl: 'templates/inputnode.template.html',
    styleUrls: ['css/connectorstyle.css']
})
export class InputNodeComponent implements AudioNode{
    
    wrapper: AudioComponentMetaWrapper;
    callback: () => void;
    
    
    setComponentMetaWrapper(wrapper: AudioComponentMetaWrapper) {
        this.wrapper = wrapper;
    }
    
    setNodeClickedCallback(callback) {
        this.callback = callback;
    }
    
}