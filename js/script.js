
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
console.log("cellContainer", cellsContainer, typeof(cellsContainer));


// Test
for (let i = 0; i < gridSize; i++ ) {
    for (let b = 0; b < gridSize; b++) {
        // cellsContainer.innerHTML += `<div style="z-index: ${i + 10}" class="cell">${i}-${b}</div>`;
        cellCreator(cellsContainer, b, i, gridSize);
    }
}

// E se si associasse a ogni celle un oggetto cell contenente posX posY bomba.bool cliccato.bool 

// Prelevare tutti gli elementi cell

// Associare un event listener
// funzione click

// FUNCTIONS
/**
 * Description Generate random number between min and max 
 * @param {number} min Min number
 * @param {number} max Max number
 * @returns {number} Random number
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

/**
 * Description Creation of single cell with event listener and graphics
 * @param {object} cellContainer Element grid container
 * @param {number} rowPosition Row position in grid (for z-index)
 * @param {number} rowLength Number of cells for row
 */
function cellCreator(cellContainer, colPosition, rowPosition, rowLength) {
    // Cell-container creation
    const thisCellContainer = document.createElement("div");
    // Add 'cell' class
    thisCellContainer.classList.add("single-cell-container");
    // Cell creation
    const thisCell = document.createElement("div");
    // Add 'cell' class
    thisCell.classList.add("cell");


    // Add dimensions and z-index style (+10 is for a secure starting posizion in z)
    // thisCellContainer.style = `z-index: (${rowPosition} + 10)`;
    thisCellContainer.style.zIndex = `${rowPosition +10 }`;
    thisCellContainer.style.width = `calc(80vh / ${rowLength})`;
    thisCellContainer.style.height = `calc(80vh / ${rowLength})`;

    // Add event at click
    thisCell.addEventListener("click", function(){
        console.log(thisCell.className);
        
        if(thisCell.classList.contains("pressed")) {
            console.log("pressed");
            thisCell.style.bottom = `0`;
        } else {
            console.log("unpressed");
            thisCell.style.bottom = `-5px`;
        };

        // Bomb control
        const cellControlled = bombControl(colPosition, rowPosition);
        
        if (cellControlled === 9) {
            thisCell.innerHTML = "BOOM!"
        } else {
            thisCell.innerHTML = cellControlled;
        }

        thisCell.classList.toggle("pressed");
    });
    
    // Append single-cell-container
    cellContainer.append(thisCellContainer);
    // Append cell
    thisCellContainer.append(thisCell);
}

function bombControl(posX, posY) {
    console.log("Cell pressed:",posX,posY);
    let howManyBombs = 0;

    // Cell pressed bomb control; if true, howManyBombs = 9 -> bomb in cell pressed!
    if (gridArray[posX][posY] === true) {
        howManyBombs = 9;
    } else {
        // Around control
        // What position are possible?
        // Reset all position to possible
        let grantedX = [-1, 0, 1];
        let grantedY = [-1, 0, 1];

        // Remove impossible X position from array
        if (posX - 1 < 0) {
            grantedX.splice(0,1);
        } else if (posX + 1 >= gridSize) {
            grantedX.splice(2,1);
        }

        // Remove impossible Y position from array
        if (posY - 1 < 0) {
            grantedY.splice(0,1);
        } else if (posY + 1 >= gridSize) {
            grantedY.splice(2,1);
        }
        console.log("GRANTED",grantedX, grantedX.length,grantedY,grantedY.length);

        // Control of bombs in granted position around click
        for (i = 0; i < grantedX.length; i++) {
            // Cicle X positions
            console.log("X-",i);
            for (b = 0; b < grantedY.length; b++) {
                // Cicle Y positions
                console.log("Y-",b);
                console.log("TESTED-X", (posX + (grantedX[i])),"TESTED-Y", (posY + (grantedY[b])));
                // Bomb Control in single cell around
                if (gridArray[posX + (grantedX[i])][posY + (grantedY[b])] === true) {
                    howManyBombs++;
                }
                console.log("iterations", i, b);
            }
        }
    }

    return howManyBombs;
}