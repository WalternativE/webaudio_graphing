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
    setNode(webAudioNode: WebAudioNode);
    setNodeClickedCallback(callback: (webAudioNode: WebAudioNode) => void);
}

@Component({
    selector: 'audio-node',
    template: '<div #ank></div>'
})
export class AudioNodeComponent implements AfterViewInit {
    @Input() node: WebAudioNode;
    @Output() connectionEstablishmentEvent = new EventEmitter<WebAudioNode>();

    constructor(private _dcl: DynamicComponentLoader, private _elementRef: ElementRef) { }

    loadComponent(component: WebAudioNode) {
        this._dcl.loadIntoLocation(component.type, this._elementRef, 'ank').then((compRef) => {
            var instance = <AudioNode>compRef.instance;
            instance.setNode(this.node);

            instance.setNodeClickedCallback((webAudioNode) => {
                this.connectionEstablishmentEvent.emit(webAudioNode);
            });
        });
    }
    
    ngAfterViewInit() {
        this.loadComponent(this.node);
    }
}