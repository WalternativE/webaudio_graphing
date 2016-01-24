"use strict";
var WebAudioProject;
(function (WebAudioProject) {
    var Pallette = Canvas.Types.Pallette;
    var AudioGraph = Graph.Types.AudioGraph;
    var Helper = Canvas.Helper;
    var Edge = Graph.Types.Edge;
    var WebAudioNode = Graph.Types.WebAudioNode;
    var AudioHelper = AudioLibrary.AudioHelper;
    var AudioPlayer = AudioLibrary.AudioPlayer;
    class App {
        constructor() {
            this._nodeTargetCanvas = document.getElementById("nodeTargetCanvas");
            this._nodeTargetCanvasContext = this._nodeTargetCanvas.getContext("2d");
            this._nodeTargetCanvas.width = window.innerWidth;
            this._pallette = new Pallette("palletteCanvas");
            this._pallette.setNodeToCreateChangeListener((node) => {
                this._nodeToCreate = node;
            });
            this._graph = new AudioGraph();
            this._contextMenu = document.getElementById("contextDropDown");
        }
        initContextOptions(node) {
            var useAsSourceAction = document.getElementById("useAsSourceAction");
            var useAsDestinationAction = document.getElementById("useAsDestinationAction");
            // var markAsAudioSourceAction = document.getElementById("markAsAudioSourceAction");
            // var markAsAudioDestinationAction = document.getElementById("markAsAudioDestinationAction");
            useAsSourceAction.onclick = () => {
                if (this._connectionToEstablish == null) {
                    this._connectionToEstablish = new Edge(node, null);
                }
                else {
                    // TODO error handling!
                    console.log("There is already an establishing operation in progress!");
                }
            };
            useAsDestinationAction.onclick = () => {
                if (this._connectionToEstablish == null) {
                    // TODO error handling!
                    console.log("There is no defined source!");
                }
                else {
                    this._connectionToEstablish.destination = node;
                    this._graph.addEdge(this._connectionToEstablish);
                    this._connectionToEstablish = null;
                }
            };
            // markAsAudioSourceAction.click = function () {
            //     connectionGraph.audioSource = node;
            // };
            // markAsAudioDestinationAction.click = function () {
            //     connectionGraph.audioDestination = node;
            // };
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
            this._nodeTargetCanvas.onmousedown = (evt) => {
                var retrievedGraphNode = this._graph.retrieveNodeForMousePosOrReturnNull(Helper.getMousePos(this._nodeTargetCanvas, evt));
                if (retrievedGraphNode != null) {
                    this._nodeTargetCanvas.onmousemove = (event) => {
                        Helper.moveNode(this._nodeTargetCanvas, event, retrievedGraphNode);
                    };
                }
            };
            this._nodeTargetCanvas.onmouseup = (evt) => {
                if (this._nodeToCreate != null) {
                    var mousePos = Helper.getMousePos(this._nodeTargetCanvas, evt);
                    this._graph.addNode(new WebAudioNode(mousePos.x, mousePos.y, this._nodeToCreate.sizeX, this._nodeToCreate.sizeY, this._nodeToCreate.fillStyle, this._nodeToCreate.strokeStyle, null));
                    this._nodeToCreate = null;
                    this._pallette.reset();
                }
                this._nodeTargetCanvas.onmousemove = null;
            };
            this._nodeTargetCanvas.addEventListener("contextmenu", (evt) => {
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
    var app = new App();
    app.main();
    var player = new AudioPlayer();
    var helper = AudioHelper.getInstance();
    var audioContext = helper.retrieveAudioContext();
    player.playSoundFile(audioContext, "snares2.mp3", 1, 1);
})(WebAudioProject || (WebAudioProject = {}));
