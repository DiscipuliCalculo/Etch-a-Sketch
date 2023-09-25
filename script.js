const GRID_CONTAINER = document.createElement('div');
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_COLOR = 'black'

let gridSize = DEFAULT_GRID_SIZE;
let color = DEFAULT_COLOR;

createGrid(gridSize);
Draw();

document.getElementById("resetGrid").addEventListener("click", function() {;
    newGrid();
});

document.getElementById("newGrid").addEventListener("click", function() {
    let input = window.prompt('What size should the grid be?');
    if (input !== null) {
        if (input !== '' && !isNaN(input)) {
            gridSize = input;
            newGrid();
        } else {
            window.alert('Please enter a valid number.');
        }
    }
});

document.getElementById("eraser").addEventListener("click", function() {
    color = 'white';
});

document.getElementById("colorPicker").addEventListener("input", function() {
    color = this.value;
    document.getElementById("currentColor").style.backgroundColor = color;
});

document.getElementById("saveGrid").addEventListener("click", function () {
    saveSketch();
});

// adding the event listener by looping
function Draw() {
    const elements = document.querySelectorAll('.gridSquare');
    elements.forEach(element => {
        element.addEventListener('mousedown', function() {
            isDrawing = true;
            element.style.backgroundColor = color;
        });
        element.addEventListener('mousemove', function() {
            if (isDrawing) {
                element.style.backgroundColor = color;
            }
        });
        element.addEventListener('mouseup', function() {
            isDrawing = false;
        });
    });
}

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

function saveSketch() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const gridBox = document.getElementById("gridBox");

    canvas.width = gridBox.clientWidth;
    canvas.height = gridBox.clientHeight;

    const gridSquares = document.querySelectorAll(".gridSquare");

    gridSquares.forEach((square) => {
        const computedStyle = getComputedStyle(square);
        const bgColor = computedStyle.backgroundColor;
        ctx.fillStyle = bgColor;
        ctx.fillRect(square.offsetLeft, square.offsetTop, square.offsetWidth, square.offsetHeight);
    });

    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "sketch.png";
    a.click();
}
