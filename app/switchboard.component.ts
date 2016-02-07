import {
Component,
Input
} from 'angular2/core';
import {AudioNodeComponent} from './audionode.component';
import {WebAudioNode, Edge} from './graph.library';

@Component({
    selector: "switchboard",
    templateUrl: "templates/switchboard.template.html",
    directives: [AudioNodeComponent],
    styleUrls: ['css/audionodestyle.css']
})
export class SwitchboardComponent {

    @Input() nodes: WebAudioNode[];
    
    edges: Edge[] = [];
    edgeToCreate: Edge;

    fuckOneUp() {
        this.nodes.pop();
    }
    
    handleDragStart($event: DragEvent, node: WebAudioNode) {
        var nodeRepresentation: string = JSON.stringify(node);
        
        $event.dataTransfer.effectAllowed = 'move';
        $event.dataTransfer.setData("application/json", nodeRepresentation);
    }
    
    handleDragEnd($event: DragEvent, node: WebAudioNode) {
        // If you want to know why I resorted to this hack
        // http://stackoverflow.com/questions/11927309/html5-dnd-datatransfer-setdata-or-getdata-not-working-in-every-browser-except-fi
        var component = <WebAudioNode>JSON.parse(localStorage.getItem("fuckingHack"));
        
        node.posX = component.posX;
        node.posY = component.posY;
    }
    
    handleConnectionEstablishmentRequest(node: WebAudioNode) {
        if(!this.edgeToCreate) {
            this.edgeToCreate = new Edge(node);
        } else {
            this.edgeToCreate.destination = node;
            
            this.edges.push(this.edgeToCreate);
            this.edgeToCreate = null;
        }
        
        console.log(node);
    }
}