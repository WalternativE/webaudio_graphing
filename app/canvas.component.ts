import {Component} from 'angular2/core';
import {WebAudioNode} from './graph.library';

export interface NameToWebAudioNodeMap {
    [name: string]: WebAudioNode;
}

export interface NodeToCreateChangeListener {
    (node: WebAudioNode): void;
}

export class Helper {

    static getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent): { x: number, y: number } {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    static moveNode(canvas: HTMLCanvasElement, evt: MouseEvent, node: WebAudioNode) {
        var mousePos = this.getMousePos(canvas, evt);
        node.posX = mousePos.x;
        node.posY = mousePos.y;
    }
}

@Component({

})
export class CanvasComponent { }