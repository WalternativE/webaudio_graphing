// "use strict";

// (function () {
//     App.main();
    
//     var palletteCanvas = <HTMLCanvasElement>document.getElementById("palletteCanvas");
//     var palletteCanvasContext = palletteCanvas.getContext("2d");

//     var nodeTargetCanvas = <HTMLCanvasElement>document.getElementById("nodeTargetCanvas");
//     var nodeTargetCanvasContext = nodeTargetCanvas.getContext("2d");
    
//     var WebAudioNode = function (posX, posY, sizeX, sizeY, fillStyle, strokeStyle, audioStuff) {
//         this.posX = posX;
//         this.posY = posY;
//         this.sizeX = sizeX;
//         this.sizeY = sizeY;
//         this.fillStyle = fillStyle;
//         this.strokeStyle = strokeStyle;
//         this.audioStuff = audioStuff;
//     };

//     WebAudioNode.prototype.isInHitbox = function (posOnCanvas) {
//         if (posOnCanvas.x < this.posX || posOnCanvas.x > (this.posX + this.sizeX)
//             || posOnCanvas.y < this.posY || posOnCanvas.y > (this.posY + this.sizeY)) {
//             return false;
//         } else {
//             return true;
//         }
//     };

//     var Connection = function (source, destination) {
//         this.source = source;
//         this.destination = destination;
//     };

//     Connection.prototype.drawVisualConnection = function () { 
//         nodeTargetCanvasContext.beginPath();
//         nodeTargetCanvasContext.moveTo(this.source.posX, this.source.posY);
//         nodeTargetCanvasContext.lineTo(this.destination.posX, this.destination.posY);
//         nodeTargetCanvasContext.stroke();
//     };   

//     var connectionToEstablish = null;
//     var nodeToCreate = null;
//     var palletteChoices = {};
//     var presentNodes = [];
    
//     var connectionGraph = {};
//     connectionGraph.audioSource = null;
//     connectionGraph.connections = [];
//     connectionGraph.audioDestination = null;

//     // TODO finish that
//     palletteChoices.testNode = new WebAudioNode(10, 10, 50, 50, "black", "black", null);
//     palletteChoices.otherTestNode = new WebAudioNode(70, 10, 50, 50, "blue", "blue", null);

//     // TODO objects will vanish if the resize goes under their pos - validate
//     palletteCanvas.width = window.innerWidth;
//     nodeTargetCanvas.width = window.innerWidth;

//     window.onresize = function () {
//         palletteCanvas.width = window.innerWidth;
//         nodeTargetCanvas.width = window.innerWidth;
//     };

//     var drawPallette = function () {
//         palletteCanvasContext.clearRect(0, 0, palletteCanvas.width, palletteCanvas.height);

//         for (var key in palletteChoices) {
//             if (palletteChoices.hasOwnProperty(key)) {
//                 var choiceNode = palletteChoices[key];
//                 palletteCanvasContext.beginPath();
//                 palletteCanvasContext.rect(choiceNode.posX, choiceNode.posY, choiceNode.sizeX, choiceNode.sizeY);
//                 palletteCanvasContext.fillStyle = choiceNode.fillStyle;
//                 palletteCanvasContext.fill();
//                 palletteCanvasContext.strokeStyle = choiceNode.strokeSyile;
//                 palletteCanvasContext.stroke();
//             }
//         }
//     };

//     var drawNodes = function () {
//         nodeTargetCanvasContext.clearRect(0, 0, nodeTargetCanvas.width, nodeTargetCanvas.height);

//         presentNodes.forEach(function (node) {
//             nodeTargetCanvasContext.beginPath();
//             nodeTargetCanvasContext.rect(node.posX, node.posY, node.sizeX, node.sizeY);
//             nodeTargetCanvasContext.fillStyle = node.fillStyle;
//             nodeTargetCanvasContext.fill();
//             nodeTargetCanvasContext.strokeStyle = node.strokeSyile;
//             nodeTargetCanvasContext.stroke();
//         });
        
//         connectionGraph.connections.forEach(function (connection) {
//            connection.drawVisualConnection();
//         });
//     };

//     var getMousePos = function (canvas, evt) {
//         var rect = canvas.getBoundingClientRect();
//         return {
//             x: evt.clientX - rect.left,
//             y: evt.clientY - rect.top
//         };
//     };

//     var moveNode = function (canvas, evt, node) {
//         var mousePos = getMousePos(canvas, evt);
//         node.posX = mousePos.x;
//         node.posY = mousePos.y;
//     };

//     var retrieveNodeFromPalletteForMousePosOrReturnNull = function (mousePos) {
//         for (var key in palletteChoices) {
//             if (palletteChoices.hasOwnProperty(key)) {
//                 var choiceNode = palletteChoices[key];
//                 if (choiceNode.isInHitbox(mousePos)) {
//                     return choiceNode;
//                 }
//             }
//         }

//         return null;
//     };

//     var retrieveNodeFromNodeGraphForMousePosOrReturnNull = function (mousePos) {
//         var retrievedNode = null;

//         presentNodes.forEach(function (node) {
//             if (node.isInHitbox(mousePos)) {
//                 retrievedNode = node;
//             }
//         });

//         return retrievedNode;
//     };

//     palletteCanvas.onmousedown = function (evt) {
//         var retrievedPalletteNode = retrieveNodeFromPalletteForMousePosOrReturnNull(getMousePos(palletteCanvas, evt));

//         if (retrievedPalletteNode != null) {
//             palletteCanvas.onmousemove = function (evt) {
//                 nodeToCreate = retrievedPalletteNode;
//                 moveNode(palletteCanvas, evt, retrievedPalletteNode);
//             };
//         }
//     };

//     palletteCanvas.onmouseup = function () {
//         palletteCanvas.onmousemove = null;
//         nodeToCreate = null;
//     };

//     nodeTargetCanvas.onmousedown = function (evt) {
//         var retrievedGraphNode = retrieveNodeFromNodeGraphForMousePosOrReturnNull(getMousePos(nodeTargetCanvas, evt));

//         if (retrievedGraphNode != null) {
//             nodeTargetCanvas.onmousemove = function (evt) {
//                 moveNode(nodeTargetCanvas, evt, retrievedGraphNode);
//             };
//         }
//     };

//     var resetPallette = function () {
//         palletteCanvas.onmousemove = null;
//         // TODO fix this
//         palletteChoices.testNode = new WebAudioNode(10, 10, 50, 50, "black", "black", null);
//         palletteChoices.otherTestNode = new WebAudioNode(70, 10, 50, 50, "blue", "blue", null);
//     };

//     nodeTargetCanvas.onmouseup = function (evt) {
//         if (nodeToCreate != null) {
//             var mousePos = getMousePos(nodeTargetCanvas, evt);
//             presentNodes.push(new WebAudioNode(mousePos.x, mousePos.y, nodeToCreate.sizeX, nodeToCreate.sizeY, nodeToCreate.fillStyle, nodeToCreate.strokeStyle));
//             nodeToCreate = null;
//             resetPallette();
//         }

//         nodeTargetCanvas.onmousemove = null;
//     };

//     var initContextOptions = function (node) {
//         var useAsSourceAction = document.getElementById("useAsSourceAction");
//         var useAsDestinationAction = document.getElementById("useAsDestinationAction");
//         var markAsAudioSourceAction = document.getElementById("markAsAudioSourceAction");
//         var markAsAudioDestinationAction = document.getElementById("markAsAudioDestinationAction");
        
//         useAsSourceAction.onclick = function () {
//             if (connectionToEstablish == null) {
//                 connectionToEstablish = new Connection(node, null);
//             } else {
//                 // TODO error handling!
//                 console.log("There is already an establishing operation in progress!");
//             }
//         };
        
//         useAsDestinationAction.onclick = function() {
//             if (connectionToEstablish == null) {
//                 // TODO error handling!
//                 console.log("There is no defined source!");
//             } else {
//                 connectionToEstablish.destination = node;                
//                 connectionGraph.connections.push(connectionToEstablish);
                
//                 connectionToEstablish = null;
//             }
//         };
        
//         markAsAudioSourceAction.click = function() {
//             connectionGraph.audioSource = node;
//         };
        
//         markAsAudioDestinationAction.click = function() {
//             connectionGraph.audioDestination = node;
//         };
//     };

//     var contextMenu = document.getElementById("contextDropDown");

//     nodeTargetCanvas.addEventListener("contextmenu", function (evt) {
//         var retrievedGraphNode = retrieveNodeFromNodeGraphForMousePosOrReturnNull(getMousePos(nodeTargetCanvas, evt));

//         if (retrievedGraphNode != null) {
//             contextMenu.classList.toggle("open-dropdown");
//             contextMenu.style.left = "" + evt.pageX + "px";
//             contextMenu.style.top = "" + evt.pageY + "px";

//             initContextOptions(retrievedGraphNode);

//             evt.preventDefault();
//         }
//     });

//     // Maybe I just want to have a cancel option...more explicit
//     document.addEventListener("click", function () {
//         if (contextMenu.classList.contains("open-dropdown")) {
//             contextMenu.classList.toggle("open-dropdown");
//         }
//     });

//     var digestApplication = function () {
//         drawPallette();
//         drawNodes();
//     };

//     setInterval(digestApplication, 10);
    
    
//     // Graph Processing comes here -----------------------------------------------------------------------------------------------------------------
// })();