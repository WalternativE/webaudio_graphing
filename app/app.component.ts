import {Component, AfterViewInit} from 'angular2/core';
import {PalletteComponent} from './pallette.component';
import {AudioGraph, WebAudioNode, Edge} from './graph.library';
import {Helper} from './canvas.component';

@Component({
    selector: 'my-app',
    templateUrl: 'templates/app.template.html',
    directives: [PalletteComponent]
})
export class AppComponent implements AfterViewInit {

    private _nodeTargetCanvas: HTMLCanvasElement;
    private _nodeTargetCanvasContext: CanvasRenderingContext2D;

    private _connectionToEstablish: Edge;

    private _graph: AudioGraph;

    private _contextMenu: HTMLElement;
    
    addEmittedNodeToGraph(emittedNode: WebAudioNode) {
        this._graph.addNode(emittedNode);
    }
    
    ngAfterViewInit() {
        this._nodeTargetCanvas = <HTMLCanvasElement>document.getElementById("nodeTargetCanvas");
        this._nodeTargetCanvasContext = this._nodeTargetCanvas.getContext("2d");

        this._nodeTargetCanvas.width = window.innerWidth;

        this._graph = new AudioGraph();

        this._contextMenu = document.getElementById("contextDropDown");
        
        this.main();
    }

    initContextOptions(node: WebAudioNode) {

        var useAsSourceAction = document.getElementById("useAsSourceAction");
        var useAsDestinationAction = document.getElementById("useAsDestinationAction");

        useAsSourceAction.onclick = () => {
            if (this._connectionToEstablish == null) {
                this._connectionToEstablish = new Edge(node, null);
            } else {
                // TODO error handling!
                console.log("There is already an establishing operation in progress!");
            }
        }

        useAsDestinationAction.onclick = () => {
            if (this._connectionToEstablish == null) {
                // TODO error handling!
                console.log("There is no defined source!");
            } else {
                this._connectionToEstablish.destination = node;
                this._graph.addEdge(this._connectionToEstablish);

                this._connectionToEstablish = null;
            }
        };
    }

    drawNodes() {
        this._nodeTargetCanvasContext.clearRect(0, 0, this._nodeTargetCanvas.width, this._nodeTargetCanvas.height);
        this._graph.drawGraph(this._nodeTargetCanvasContext);
    }

    main() {

        window.onresize = () => {
            this._nodeTargetCanvas.width = window.innerWidth;
        };

        this._nodeTargetCanvas.onmousedown = (evt: MouseEvent) => {
            var retrievedGraphNode = this._graph.retrieveNodeForMousePosOrReturnNull(Helper.getMousePos(this._nodeTargetCanvas, evt));

            if (retrievedGraphNode != null) {
                this._nodeTargetCanvas.onmousemove = (event: MouseEvent) => {
                    Helper.moveNode(this._nodeTargetCanvas, event, retrievedGraphNode);
                };
            }
        };

        this._nodeTargetCanvas.addEventListener("contextmenu", (evt: MouseEvent) => {
            var retrievedGraphNode = this._graph.retrieveNodeForMousePosOrReturnNull(Helper.getMousePos(this._nodeTargetCanvas, evt));

            if (retrievedGraphNode != null) {
                this._contextMenu.classList.toggle("open-dropdown");
                this._contextMenu.style.left = "" + evt.pageX + "px";
                this._contextMenu.style.top = "" + evt.pageY + "px";

                this.initContextOptions(retrievedGraphNode);

                evt.preventDefault();
            }
        });
        
        this._nodeTargetCanvas.onmouseup = (evt: MouseEvent) => {
          this._nodeTargetCanvas.onmousemove = null;  
        };

        // Maybe I just want to have a cancel option...more explicit
        document.addEventListener("click", () => {
            if (this._contextMenu.classList.contains("open-dropdown")) {
                this._contextMenu.classList.toggle("open-dropdown");
            }
        });

        setInterval(() => {
            this.drawNodes();
        }, 10);
    }
}