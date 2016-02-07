import {
Component,
Input,
Output,
OnInit,
AfterViewInit,
DynamicComponentLoader,
ElementRef,
Type,
EventEmitter
} from 'angular2/core';

import {AudioComponentMetaWrapper} from "./app.component";

export interface AudioNode {
    setComponentMetaWrapper(wrapper: AudioComponentMetaWrapper);
    setNodeClickedCallback(callback: () => void);
}

@Component({
    selector: 'audio-node',
    template: '<div #ank></div>'
})
export class AudioNodeComponent implements OnInit, AfterViewInit {
    @Input() node: AudioComponentMetaWrapper;
    @Output() edgeStarted = new EventEmitter();

    constructor(private _dcl: DynamicComponentLoader, private _elementRef: ElementRef) { }

    loadComponent(component: AudioComponentMetaWrapper) {
        this._dcl.loadIntoLocation(component.getType(), this._elementRef, 'ank').then((compRef) => {
            var instance = <AudioNode>compRef.instance;
            instance.setComponentMetaWrapper(this.node);

            instance.setNodeClickedCallback(() => {
                // DO SOMETHING!
                console.log("LOOOOOOL");
                this.edgeStarted.emit("");
            });
        });
    }

    ngOnInit() {
        console.log(this.node);
    }

    ngAfterViewInit() {
        this.loadComponent(this.node);
    }
}