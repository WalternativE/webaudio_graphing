/// <reference path="../typings/snapsvg/snapsvg" />

import {
    Component,
    Input
} from 'angular2/core';
import {Edge} from './graph.library';

@Component({
    selector: 'edge-component',
    template: `
        <svg [attr.id]="'edge' + edge.edgeID"
            [attr.width]="edge.destination.posX - edge.source.posX - 200"
            [ngStyle]="{'left': edge.source.posX + 200, 'top': edge.source.posY}">
            <line x1="0" y1="50" [attr.x2]="edge.destination.posX - edge.source.posX - 200" y2="50"
                style="stroke:rgb(0,0,0);stroke-width:2"
            />
        </svg>
    `,
    styleUrls: ['css/edge.css']
})
export class EdgeComponent {
    @Input() edge: Edge;
    
    printBlub() {
    }
}