import {
Component,
Input
} from 'angular2/core';

import {AudioNodeComponent} from './audionode.component';

import {AudioComponentMetaWrapper} from './app.component';

@Component({
    selector: "switchboard",
    templateUrl: "templates/switchboard.template.html",
    directives: [AudioNodeComponent]
})
export class SwitchboardComponent {
    @Input() nodes: AudioComponentMetaWrapper[];
    
    fuckOneUp() {
        this.nodes.pop();
    }
}