const GRID_CONTAINER = document.createElement('div');
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_COLOR = 'black'

let gridSize = DEFAULT_GRID_SIZE;
let color = DEFAULT_COLOR;

createGrid(gridSize);
Draw();

document.getElementById("Reset").addEventListener("click", function() {;
    newGrid();
});

document.getElementById("newGrid").addEventListener("click", function() {
    gridSize = window.prompt('What size should the grid be?');
    newGrid();
});

document.getElementById("Eraser").addEventListener("click", function() {
    color = 'white';
});

document.getElementById("changeColor").addEventListener("click", function() {
    color = window.prompt('What color do you want');
    document.getElementById("currentColor").style.backgroundColor = `${color}`;
}); 

// adding the event listener by looping
function Draw() {
    const elements = document.querySelectorAll('.gridSquare');
    elements.forEach(element => {
        element.addEventListener('mouseover', (e)=>{   
        element.setAttribute('style', `background-color: ${color}`);
        });
    });
};

function clearGrid() {
    document.getElementById("gridBox").innerHTML = ''
};

function createGrid (gridSize) {
    document.getElementById('wrapper').appendChild(GRID_CONTAINER);
    GRID_CONTAINER.id = 'gridBox';
    document.getElementById('gridBox').style.cssText = `
    border-color: black;
    border-style: solid;
    display: grid; 
    height: 600px;
    grid-template-columns: repeat(${gridSize}, 1fr);
    grid-template-rows: repeat(${gridSize}, 1fr);
    width: 600px;`
;

    for (let i = 0; i < gridSize ** 2; i++) {
        var gridSquare = document.createElement('div');
        document.getElementById('gridBox').appendChild(gridSquare);
        gridSquare.className = 'gridSquare'
    };
};

function newGrid () {
    clearGrid();
    createGrid(gridSize);
    Draw();    
}
