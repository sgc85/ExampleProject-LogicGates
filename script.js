function input() {
  const template = document.getElementById("inputTemplate");
  //creates a html fragment containing the template
  const newGate = template.content.cloneNode(true);

  // go into the fragment and find the item with the class of gate
  // there is only one in there as it is only a small fragment of html code.
  //alter the position
  newGate.querySelector(".io").style.top = `${Math.random() * 300}px`;
  newGate.querySelector(".io").style.left = `${Math.random() * 500}px`;
  //apple the listener for starting the drag.
  newGate.querySelector(".io").addEventListener("dragstart", dragStart);

  newGate.querySelector(".io").id = gateID;
  newGate
    .querySelector(".io")
    .addEventListener("click", (event) => switchInput(event));

  //place the fragment of html code into the circuit div
  circuit.appendChild(newGate);

  connections[gateID] = { type: "input" };

  gateID++;
}

function addGate() {
  const template = document.getElementById("andGateTemplate");
  //creates a html fragment containing the template
  const newGate = template.content.cloneNode(true);

  // go into the fragment and find the item with the class of gate
  // there is only one in there as it is only a small fragment of html code.
  //alter the position
  newGate.querySelector(".gate").style.top = `${Math.random() * 300}px`;
  newGate.querySelector(".gate").style.left = `${Math.random() * 500}px`;
  //apple the listener for starting the drag.
  newGate.querySelector(".gate").addEventListener("dragstart", dragStart);

  newGate.querySelector(".gate").id = gateID;

  let output = newGate.querySelector(".output")
  output.id = gateID + "-output"

  let inputs = newGate.querySelectorAll(".input")
  console.log(inputs)
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].id = gateID + "-input" + i
  }

  //place the fragment of html code into the circuit div
  circuit.appendChild(newGate);



  connections[gateID] = { inputs: [null, null], type: "and" };

  gateID++;

}

function dragStart(e) {
  e.target.classList.add("dragging");
}

function connect(node) {

  var selectedGateID, nodeType, nodeNum

  [selectedGateID, nodeType, nodeNum] = getNodeDetails(node)

  if (nodeType == "output") {
    if (outputSide == null && inputSide != selectedGateID) {
      outputSide = selectedGateID
      // node.style.backgroundColor = "green"
    }
    else {
      inputSide = null
      outputSide = null
    }
  }
  else {
    if (inputSide == null && outputSide != selectedGateID) {
      inputSide = { id: selectedGateID, inputNumber: nodeNum }
    }
    else {
      inputSide = null
      outputSide = null
    }
  }



  if (inputSide && outputSide) {
    makeConnection()
  }
}

function makeConnection() {
  connections[inputSide.id].inputs[inputSide.inputNumber] = outputSide
  console.log(connections)
  inputSide = null
  outputSide = null
  drawConnections()
}

function drawConnections() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (gate in connections) {
    let endGate = document.getElementById(gate)
    let inputs = connections[gate].inputs
    for (id in inputs) {
      if (inputs[id] != null) {
        let startGate = document.getElementById(inputs[id])
        let startGateRect = startGate.getBoundingClientRect()
        let endGateRect = endGate.getBoundingClientRect()
        startX = startGateRect.right - canvasOffsetX 
        startY = startGateRect.top + 24
        endX = endGateRect.left - canvasOffsetX
        endY = endGateRect.top + (id * 16) + 16
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);

        ctx.stroke();
      }
    }
  }
}


function getNodeDetails(node) {
  var gateID = node.parentElement.id
  var nodeType = node.id.includes("input") ? "input" : "output"
  var nodeNum = -1
  if (nodeType == "input") {
    nodeNum = node.id.substr(node.id.length - 1, 1)
  }

  return [gateID, nodeType, nodeNum]
}



function switchInput(event) {
  event.stopPropagation()
  const io = event.target;
  if (io.id === "inputValue") {
    var inputValue = io.innerHTML == "1" ? "0" : "1"
    io.innerHTML = inputValue;
    if (inputValue === "0") {
      io.style.backgroundColor = "red";
    } else {
      io.style.backgroundColor = "green";
    }
  }
}

const connections = {};
const canvas = document.getElementById("canvas")
const circuit = document.getElementById("circuit");

const ctx = canvas.getContext("2d");
const circuitSize = circuit.getBoundingClientRect()
const canvasOffsetX = circuitSize.x
canvas.width = circuitSize.width
canvas.height = circuitSize.height

var gateID = 0;
var inputSide = null;
var outputSide = null;


// Drag and Drop Functionality
circuit.addEventListener("dragover", function (e) {
  e.preventDefault();

});

circuit.addEventListener("drop", function (e) {
  e.preventDefault();
  const draggedElement = document.querySelector(".dragging");
  draggedElement.style.top = `${e.clientY - 30}px`;
  draggedElement.style.left = `${e.clientX - 60}px`;
  draggedElement.classList.remove("dragging");
  drawConnections();
})
