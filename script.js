let bombsPosition = [];
let startGame = 0;
let remainMoves = 90;
let rightClick = 0;
let displayMoves;

function createGrid() {
    if (startGame < 1) {                    //don't let multiple grids being created
        const grid = document.getElementById("grid");
        for (let i = 0; i < 10; ++i) {
            for (let j = 0; j < 10; ++j) {
                button = document.createElement("button");
                button.style.width = "20px";
                button.style.height = "25px";
                button.style.margin = "0.4px";
                button.style.border = "1px solid block";
                document.body.appendChild(button);
                grid.appendChild(button);
                button.id = "button-" + i + "-" + j;
                button.addEventListener("contextmenu", function(event) { //to send the coordinates of the button clicked for"🚩"
                    handleRightClick(event, this);
                });
                button.onclick = function() {
                    handleButtonClick(i, j); //sending the clicked button coordinates 
                };
            }
        }
        document.body.appendChild(grid);
    }
    ++startGame;
}
createGrid();

function generateBombs() {
    for (let i = 0; i < 10; ++i) {
        let randomI = Math.floor(Math.random() * 10);
        let randomJ = Math.floor(Math.random() * 10);
        let matchFound = false;
        for (let j = 0; j < bombsPosition.length; ++j) {
            if (bombsPosition[j][0] === randomI && bombsPosition[j][1] === randomJ) { //check if generated position is unique or not
                matchFound = true;
                break;
            }
        }
        if (!matchFound) {
            bombsPosition.push([randomI, randomJ]);
        } else {
            --i;
        }
    }
}
generateBombs();

function handleButtonClick(i, j) {
    let nearBombs = 0;
    let button = document.getElementById("button-" + i + "-" + j);
    if (bombsPosition.some(coordinates => coordinates[0] === i && coordinates[1] === j)) {
        button.innerHTML = "💣";
        popupLose();
    } else {
        if (bombsPosition.some(coordinates => coordinates[0] === i - 1 && coordinates[1] === j - 1)) {
            button.innerText = ++nearBombs;
        }
        if (bombsPosition.some(coordinates => coordinates[0] === i - 1 && coordinates[1] === j)) {
            button.innerText = ++nearBombs;
        }
        if (bombsPosition.some(coordinates => coordinates[0] === i - 1 && coordinates[1] === j + 1)) {
            button.innerText = ++nearBombs;
        }
        if (bombsPosition.some(coordinates => coordinates[0] === i && coordinates[1] === j - 1)) {
            button.innerText = ++nearBombs;
        }
        if (bombsPosition.some(coordinates => coordinates[0] === i + 1 && coordinates[1] === j - 1)) {
            button.innerText = ++nearBombs;
        }
        if (bombsPosition.some(coordinates => coordinates[0] === i + 1 && coordinates[1] === j)) {
            button.innerText = ++nearBombs;
        }
        if (bombsPosition.some(coordinates => coordinates[0] === i + 1 && coordinates[1] === j + 1)) {
            button.innerText = ++nearBombs;
        }
        if (bombsPosition.some(coordinates => coordinates[0] === i && coordinates[1] === j + 1)) {
            button.innerText = ++nearBombs;
        }
        if (nearBombs === 0) {
            button.innerText = "0";
        }
        button.disabled = true;
        --remainMoves;
        updateMoves(remainMoves);
        if (remainMoves === 0) {
            popupWin();
        }
    }
}

function handleRightClick(event, button) {
    button.innerHTML = "🚩";
    event.preventDefault(); //so the menu doesn't pop up when pressing r.click inside the grid
    console.log("Right-click detected");
    ++rightClick;
    if (rightClick == 2) { //to deactivate the flag if you don't want it
        button.innerHTML = null;
        rightClick = 0;
    }
}
document.addEventListener("contextmenu", handleRightClick);

function popupLose() {
    handleButtonClick = null;
    var popup = document.createElement("div");
    popup.classList.add("popupLose");
    popup.innerHTML = "GAME OVER";
    document.body.appendChild(popup);
}

function popupWin() {
    handleButtonClick = null;
    var popup = document.createElement("div");
    popup.classList.add("popupWin");
    popup.innerHTML = "YOU WIN";
    document.body.appendChild(popup);
}

function updateMoves(remainMoves) {
    const counterDisplay = document.getElementById('counter-display');
    counterDisplay.innerHTML = remainMoves;
}