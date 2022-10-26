
// DATA
const gridSize = 10;
const bombsNumber = 16;
let bombsArray = [];

// Bidimentional Array creation
let gridArray = new Array(gridSize);
for (let i = 0; i < gridArray.length; i++) {
    gridArray[i] = new Array(gridSize);
}


// Filling of false
for (let i = 0; i < gridArray.length; i++) {
    for (let b = 0; b < gridArray[i].length; b++) {
        gridArray[i][b] = false;
    }
}

console.log("griD", gridArray);


let index = 0;
let iteration = 0;
while (index < bombsNumber) {
    const posX = getRndInteger(0, (gridSize - 1));
    const posY = getRndInteger(0, (gridSize - 1));
    console.log(posX, posY);

    if (gridArray[posX][posY] === false) {
        gridArray[posX][posY] = true;
        
        bombsArray.push([posX, posY]);
        index++;
    }
    iteration++;
}

console.log("itreration", iteration);
console.log("bombsArray", bombsArray);


// OUTPUT elements
const cellsContainer = document.querySelector(".cell-container");
console.log(cellsContainer);


// Test
for (let i = 0; i < gridSize; i++ ) {
    for (let b = 0; b < gridSize; b++) {
        cellsContainer.innerHTML += `<div class="cell">${i}</div>`;
    }
}



// FUNCTIONS
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }