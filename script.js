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

  inputs[gateID] = { output: null };

  gateID++;
  console.log(connections);
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

  //place the fragment of html code into the circuit div
  circuit.appendChild(newGate);

  connections[gateID] = { input_1: null, input_2: null, output: null };

  gateID++;
  console.log(connections);
}

function dragStart(e) {
  e.target.classList.add("dragging");
}

function connect(event) {
  if (!startGate) {
    startGate = event.target.id;
  }
}

function switchInput(event) {
    event.stopPropagation()
  const io = event.target;
  if (io.id === "inputValue") {
    var inputValue = (parseInt(io.innerHTML) + 1) % 2;
    io.innerHTML = inputValue;
    if (inputValue === 0) {
      io.style.backgroundColor = "red";
    } else {
      io.style.backgroundColor = "green";
    }
  }
}

const connections = {};
const inputs = {};
const circuit = document.getElementById("circuit");
var gateID = 0;
var startGate = null;
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
});
