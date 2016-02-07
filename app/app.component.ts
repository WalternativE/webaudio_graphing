import {
Component
} from 'angular2/core';
import {PalletteComponent} from './pallette.component';
import {SwitchboardComponent} from './switchboard.component';
import {WebAudioNode} from './graph.library';

@Component({
    selector: 'my-app',
    templateUrl: 'templates/app.template.html',
    directives: [PalletteComponent, SwitchboardComponent],
    styleUrls: ['css/app.css']
})
export class AppComponent {

    nodes: WebAudioNode[] = [];

    addEmittedNodeToGraph(emittedNode: WebAudioNode) {
        this.nodes.push(emittedNode);
    }

    handleDragOver($event) {
        if ($event.preventDefault) {
            $event.preventDefault(); // Necessary. Allows us to drop.
        }
    }

    handleDrop($event: DragEvent, node: WebAudioNode) {
        if($event.stopPropagation) {
            $event.stopPropagation();
        }
        
        var component = <WebAudioNode>JSON.parse($event.dataTransfer.getData("application/json"));
        component.posX = $event.clientX;
        component.posY = $event.offsetY;
        
         // If you want to know why I resorted to this hack
        // http://stackoverflow.com/questions/11927309/html5-dnd-datatransfer-setdata-or-getdata-not-working-in-every-browser-except-fi
        var componentRepresentation = JSON.stringify(component);
        localStorage.setItem("fuckingHack", componentRepresentation);
        
        return false;
    }
}