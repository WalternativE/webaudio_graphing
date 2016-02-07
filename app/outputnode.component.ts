import {
    Component
} from 'angular2/core';

import {AudioComponentMetaWrapper} from './app.component';

import {AudioNode} from './audionode.component';

@Component({
    selector: 'output-node',
    templateUrl: 'templates/outputnode.template.html'
})
export class OutputNodeComponent implements AudioNode {
    
    wrapper: AudioComponentMetaWrapper;
    callback: () => void;
    
    setComponentMetaWrapper(wrapper: AudioComponentMetaWrapper) {
        this.wrapper = wrapper;
    }
    
    setNodeClickedCallback(callback: () => void) {
        this.callback = callback;
    }
}