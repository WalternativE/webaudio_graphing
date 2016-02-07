import {
Component,
Input,
Output,
AfterViewInit,
DynamicComponentLoader,
ElementRef,
EventEmitter
} from 'angular2/core';

import {WebAudioNode} from "./graph.library";

export interface AudioNode {
    setComponentMetaWrapper(webAudioNode: WebAudioNode);
    setNodeClickedCallback(callback: () => void);
}

@Component({
    selector: 'audio-node',
    template: '<div #ank></div>'
})
export class AudioNodeComponent implements AfterViewInit {
    @Input() node: WebAudioNode;
    @Output() edgeStarted = new EventEmitter();

    constructor(private _dcl: DynamicComponentLoader, private _elementRef: ElementRef) { }

    loadComponent(component: WebAudioNode) {
        this._dcl.loadIntoLocation(component.type, this._elementRef, 'ank').then((compRef) => {
            var instance = <AudioNode>compRef.instance;
            instance.setComponentMetaWrapper(this.node);

            instance.setNodeClickedCallback(() => {
                // DO SOMETHING!
                console.log("LOOOOOOL");
                this.edgeStarted.emit("");
            });
        });
    }
    
    ngAfterViewInit() {
        this.loadComponent(this.node);
    }
}