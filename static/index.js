const CELL_WIDTH = 136;
const MARGIN = 12;

let positions = [];
let colors = {
    2: 'aquamarine',
    4: 'dodgerblue',
    8: 'darkolivegreen',
    16: 'burlywood',
    32: 'crimson',
    64: 'gold',
    128: 'mediumorchid',
    256: 'lightcoral',
    512: 'sienna',
    1024: 'cadetblue',
    2048: 'coral',
}

// Function to generate the board
function generateBoard() {
    for(i = 0; i < 4; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        document.getElementById('container').appendChild(row)
        positions[i] = [];
        for(x = 0; x < 4; x++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `${i},${x}`;
            row.appendChild(cell);
            let text = document.createElement('h2');
            text.id = `t${i},${x}`;
            cell.appendChild(text);
            positions[i][x] = 0;
        }
    }
}
// Function to check if the board is full
function boardFull() {
    let emptyCounter = 0;
    for(i = 0; i < 4; i++) {
        for(x = 0; x < 4; x++) {
            if(document.getElementById(`${i},${x}`).textContent == '') {
                emptyCounter++;
            }
        }
    }
    if(emptyCounter == 0) {
        return true;
    }else {
        return false;
    }
}
// Function to generate a new tile on the board
function generateTile() {

    if(boardFull()) {return false}
    let randX = Math.floor(Math.random() * 4);
    let randY = Math.floor(Math.random() * 4);
    while(positions[randY][randX] != 0) {
        randX = Math.floor(Math.random() * 4);
        randY = Math.floor(Math.random() * 4);
    }
    document.getElementById(`t${randY},${randX}`).textContent = 2;
    document.getElementById(`${randY},${randX}`).style.backgroundColor = colors[2];
    positions[randY][randX] = 2;
    setTimeout(checkWinLoss, 125);
}

// Animation for tiles moving to the right
function animRight(r, c, d, n, n2) {
    let elem = document.createElement('h2');
    elem.id = `${r},${c}temp`;
    elem.className = 'cell-temp';
    elem.style.backgroundColor = colors[n2];
    elem.textContent = n2;
    document.getElementById(`${r},${c}`).appendChild(elem);

    let pos = 0;
    let interval = setInterval(move, 1);
    function move() {
        if(pos > CELL_WIDTH * (d - c) + MARGIN * (d - c)) {
            clearInterval(interval);
            elem.parentElement.removeChild(document.getElementById(`${r},${c}temp`));
            document.getElementById(`t${r},${d}`).textContent = n;
            document.getElementById(`${r},${d}`).style.backgroundColor = colors[n];
        }else {
            elem.style.left = pos + 'px';
            pos += 5 * (d - c);
        }
    }
}

// Function to move tiles to the right
function moveRight() {
    for(i = 2; i >= 0; i--) {
        for(x = 0; x < 4; x++) {
            for(z = 3 - i; z > 0; z--) {
                tilesBetween = 0;
                if(positions[x][i] != 0 && (positions[x][i + z] == 0 || positions[x][i + z] == positions[x][i])) {
                    for(let t = 1; t < (i + z) - i; t++) {
                        if(positions[x][i + t] != 0) {
                            tilesBetween++;
                        }
                    }
                }

                if(tilesBetween == 0 && positions[x][i] != 0 && (positions[x][i + z] == 0 || positions[x][i + z] == positions[x][i])) {
                    placeHolderNum = positions[x][i];
                    placeHolderNum2 = positions[x][i];
                    if(positions[x][i + z] == positions[x][i]) {
                        placeHolderNum = positions[x][i] * 2;
                    }

                    positions[x][i] = 0;
                    positions[x][i + z] = placeHolderNum;
                    document.getElementById(`t${x},${i}`).textContent = '';
                    document.getElementById(`${x},${i}`).style.backgroundColor = 'rgb(221, 221, 221)';

                    animRight(x, i, i + z, placeHolderNum, placeHolderNum2);
                }
            }
        }
    }
}

// Animation for tiles moving to the left
function animLeft(r, c, d, n, n2) {
    let elem = document.createElement('h2');
    elem.id = `${r},${c}temp`;
    elem.className = 'cell-temp';
    elem.style.backgroundColor = colors[n2];
    elem.textContent = n2;
    document.getElementById(`${r},${c}`).appendChild(elem);

    let pos = 0;
    let interval = setInterval(move, 1);
    function move() {
        if(pos > CELL_WIDTH * (c - d) + MARGIN * (c - d)) {
            clearInterval(interval);
            elem.parentElement.removeChild(document.getElementById(`${r},${c}temp`));
            document.getElementById(`t${r},${d}`).textContent = n;
            document.getElementById(`${r},${d}`).style.backgroundColor = colors[n];
        }else {
            elem.style.right = pos + 'px';
            pos += 5 * (c - d);
        }
    }
}

// Function to move tiles to the left
function moveLeft() {
    for(i = 1; i <= 3; i++) {
        for(x = 0; x < 4; x++) {
            for(z = i; z > 0; z--) {
                tilesBetween = 0;
                if(positions[x][i] != 0 && (positions[x][i - z] == 0 || positions[x][i - z] == positions[x][i])) {
                    for(let t = 1; t < i - (i - z); t++) {
                        if(positions[x][i - t] != 0) {
                            tilesBetween++;
                        }
                    }
                }

                if(tilesBetween == 0 && positions[x][i] != 0 && (positions[x][i - z] == 0 || positions[x][i - z] == positions[x][i])) {

                    placeHolderNum = positions[x][i];
                    placeHolderNum2 = positions[x][i];
                    if(positions[x][i - z] == positions[x][i]) {
                        placeHolderNum = positions[x][i] * 2;
                    }

                    positions[x][i] = 0;
                    positions[x][i - z] = placeHolderNum;
                    document.getElementById(`t${x},${i}`).textContent = '';
                    document.getElementById(`${x},${i}`).style.backgroundColor = 'rgb(221, 221, 221)';

                    animLeft(x, i, i - z, placeHolderNum, placeHolderNum2);
                }
            }
        }
    }
}

// Animation for tiles moving down
function animDown(c, r, d, n, n2) {
    let elem = document.createElement('h2');
    elem.id = `${r},${c}temp`;
    elem.className = 'cell-temp';
    elem.style.backgroundColor = colors[n2];
    elem.textContent = n2;
    document.getElementById(`${r},${c}`).appendChild(elem);

    let pos = 0;
    let interval = setInterval(move, 1);
    function move() {
        if(pos > CELL_WIDTH * (d - r) + MARGIN * (d - r)) {
            clearInterval(interval);
            elem.parentElement.removeChild(document.getElementById(`${r},${c}temp`));
            document.getElementById(`t${d},${c}`).textContent = n;
            document.getElementById(`${d},${c}`).style.backgroundColor = colors[n];
        }else {
            elem.style.top = pos + 'px';
            pos += 5 * (d - r);
        }
    }
}
// Function to move tiles down
function moveDown() {
    for(i = 2; i >= 0; i--) {
        for(x = 0; x < 4; x++) {
            for(z = 3 - i; z > 0; z--) {
                
                tilesBetween = 0;
                if(positions[i][x] != 0 && (positions[i + z][x] == 0 || positions[i + z][x] == positions[i][x])) {
                    for(let t = 1; t < (i + z) - i; t++) {
                        if(positions[i + t][x] != 0) {
                            tilesBetween++;
                        }
                    }
                }

                if(tilesBetween == 0 && positions[i][x] != 0 && (positions[i + z][x] == 0 || positions[i + z][x] == positions[i][x])) {
                    placeHolderNum = positions[i][x];
                    placeHolderNum2 = positions[i][x];
                    if(positions[i][x] == positions[i + z][x]) {
                        placeHolderNum = positions[i][x] * 2;
                    }

                    positions[i][x] = 0;
                    positions[i + z][x] = placeHolderNum;
                    document.getElementById(`t${i},${x}`).textContent = '';
                    document.getElementById(`${i},${x}`).style.backgroundColor = 'rgb(221, 221, 221)';

                    animDown(x, i, i + z, placeHolderNum, placeHolderNum2);
                }
            }
        }
    }
}

// Animation for tiles moving up
function animUp(c, r, d, n, n2) {
    let elem = document.createElement('h2');
    elem.id = `${r},${c}temp`;
    elem.className = 'cell-temp';
    elem.style.backgroundColor = colors[n2];
    elem.textContent = n2;
    document.getElementById(`${r},${c}`).appendChild(elem);

    let pos = 0;
    let interval = setInterval(move, 1);
    function move() {
        if(pos > CELL_WIDTH * (r - d) + MARGIN * (r - d)) {
            clearInterval(interval);
            elem.parentElement.removeChild(document.getElementById(`${r},${c}temp`));
            document.getElementById(`t${d},${c}`).textContent = n;
            document.getElementById(`${d},${c}`).style.backgroundColor = colors[n];
        }else {
            elem.style.bottom = pos + 'px';
            pos += 5 * (r - d);
        }
    }
}

// Function to move tiles up
function moveUp() {
    for(i = 1; i <= 3; i++) {
        for(x = 0; x < 4; x++) {
            for(z = i; z > 0; z--) {
                tilesBetween = 0;
                if(positions[i][x] != 0 && (positions[i - z][x] == 0 || positions[i - z][x] == positions[i][x])) {
                    for(let t = 1; t < i - (i - z); t++) {
                        if(positions[i - t][x] != 0) {
                            tilesBetween++;
                        }
                    }
                }

                if(tilesBetween == 0 && positions[i][x] != 0 && (positions[i - z][x] == 0 || positions[i - z][x] == positions[i][x])) {

                    placeHolderNum = positions[i][x];
                    placeHolderNum2 = positions[i][x];
                    if(positions[i - z][x] == positions[i][x]) {
                        placeHolderNum = positions[i][x] * 2;
                    }

                    positions[i][x] = 0;
                    positions[i - z][x] = placeHolderNum;
                    document.getElementById(`t${i},${x}`).textContent = '';
                    document.getElementById(`${i},${x}`).style.backgroundColor = 'rgb(221, 221, 221)';

                    animUp(x, i, i - z, placeHolderNum, placeHolderNum2);
                }
            }
        }
    }
}

function checkWinLoss() {
    tilesAdjacent = 0;
    for(let i = 0; i < 4; i++) {
        for(let x = 0; x < 4; x++) {
            if(positions[i][x] == 2048) {
                alert('You won!');
                location.reload();
                return 2;
            }

            if(i != 0 && (positions[i - 1][x] == positions[i][x] || positions[i - 1][x] == 0)){
                return 0;
            }
            if(i != 3 && (positions[i + 1][x] == positions[i][x] || positions[i + 1][x] == 0)){
                return 0;
            }
            if(x != 0 && (positions[i][x - 1] == positions[i][x] || positions[i][x - 1] == 0)){
                return 0;
            }
            if(x != 3 && (positions[i][x + 1] == positions[i][x] || positions[i][x + 1] == 0)){
                return 0;
            }
        }
    }
    alert('Game over!');
    location.reload();
    return 1;
}

//Generate the board and the first two tiles
generateBoard();

generateTile();
generateTile();

document.addEventListener('keydown', (e) => {
    // 'D' Key is pressed
    if(e.key == 'd') {
        moveRight();
        setTimeout(generateTile, 125);
    }else if(e.key == 'a') {
        moveLeft();
        setTimeout(generateTile, 125);
    }else if(e.key == 's') {
        moveDown();
        setTimeout(generateTile, 125);
    }else if(e.key == 'w') {
        moveUp();
        setTimeout(generateTile, 125);
    }
});