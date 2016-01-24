"use strict";

module WebAudioProject {

    import Pallette = Canvas.Types.Pallette;
    import AudioGraph = Graph.Types.AudioGraph;
    import Helper = Canvas.Helper;
    import Edge = Graph.Types.Edge;
    import WebAudioNode = Graph.Types.WebAudioNode;
    import NodeToCreateChangeListener = Canvas.Types.NodeToCreateChangeListener;

    class App {

        private _nodeTargetCanvas: HTMLCanvasElement;
        private _nodeTargetCanvasContext: CanvasRenderingContext2D;

        private _connectionToEstablish: Edge;
        private _nodeToCreate: WebAudioNode;

        private _pallette: Pallette;
        private _graph: AudioGraph;

        private _contextMenu: HTMLElement;

        constructor() {
            this._nodeTargetCanvas = <HTMLCanvasElement>document.getElementById("nodeTargetCanvas");
            this._nodeTargetCanvasContext = this._nodeTargetCanvas.getContext("2d");

            this._nodeTargetCanvas.width = window.innerWidth;

            this._pallette = new Pallette("palletteCanvas");
            this._pallette.setNodeToCreateChangeListener((node: WebAudioNode) => {
                this._nodeToCreate = node;
            });
            
            this._graph = new AudioGraph();

            this._contextMenu = document.getElementById("contextDropDown");
        }

        initContextOptions(node: WebAudioNode) {
            
            var useAsSourceAction = document.getElementById("useAsSourceAction");
            var useAsDestinationAction = document.getElementById("useAsDestinationAction");
            // var markAsAudioSourceAction = document.getElementById("markAsAudioSourceAction");
            // var markAsAudioDestinationAction = document.getElementById("markAsAudioDestinationAction");

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
                this._pallette.resizeToWindowWidth();
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

            this._nodeTargetCanvas.onmouseup = (evt: MouseEvent) => {
                if (this._nodeToCreate != null) {
                    var mousePos = Helper.getMousePos(this._nodeTargetCanvas, evt);
                    this._graph.addNode(new WebAudioNode(mousePos.x, mousePos.y, this._nodeToCreate.sizeX, this._nodeToCreate.sizeY, this._nodeToCreate.fillStyle,
                                        this._nodeToCreate.strokeStyle, this._nodeToCreate.audioComponent));
                    this._nodeToCreate = null;
                    this._pallette.reset();
                }

                this._nodeTargetCanvas.onmousemove = null;
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

            // Maybe I just want to have a cancel option...more explicit
            document.addEventListener("click", () => {
                if (this._contextMenu.classList.contains("open-dropdown")) {
                    this._contextMenu.classList.toggle("open-dropdown");
                }
            });

            setInterval(() => {
                this._pallette.draw();
                this.drawNodes();
            }, 10);
        }
    }

    var app: App = new App();
    app.main();
}