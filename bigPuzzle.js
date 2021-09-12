////////////////////
/////BIG PUZZLE/////
////////////////////

//allow numbers from 1-9
function bigSudokuKeys(e){
    var pressedKey = e.keyCode || e.which;
    if((pressedKey > 48 && pressedKey < 58)) return;
    e.preventDefault();
}

//making a 2d vector with only first row having actual number, other rows will be empty
function bigPuzzleMakeVector(row){
    let puzzle = [];
    for (let i = 0; i < 9; i++){
        let temp_row = [];
        for (let j = 0; j < 9; j++){
            if(i == 0){
                temp_row[j] = row[j]
            }
            else{
                temp_row[j] = '.'            
            }
        }
        puzzle[i] = temp_row;
    }
    return puzzle;
}

//check if certain spot is able to have some k number
function isValidToEnter(puzzle, row, col, k) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (puzzle[row][i] == k || puzzle[i][col] == k || puzzle[m][n] == k) {
          return false;
        }
    }
    return true;
}

//solve the puzzle
function bigPuzzleSolve(puzzle) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (puzzle[i][j] == '.') {
                for (let k = 1; k <= 9; k++) {
                    if (isValidToEnter(puzzle, i, j, k)) {
                        puzzle[i][j] = k;
                        if (bigPuzzleSolve(puzzle)) {
                            return true;
                        } else {
                        puzzle[i][j] = '.';
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

//input the solved puzzle into the grids
function solveBigPuzzle(){
    document.querySelector(".result-text").innerHTML = ""
    //get first row of random numbers
    var newBoard = bigPuzzleMakeVector(randomUniqueNum(9,9))
    //solve the puzzle based on the first row
    bigPuzzleSolve(newBoard);
    for(let i = 0; i < inputNumbersBig.length; i++){
        inputNumbersBig[i].classList.remove("success")
        inputNumbersBig[i].classList.remove("fail")
        if(i <= 8){
            inputNumbersBig[i].value = newBoard[0][i]
        }
        else if(i <= 17)
        {
            inputNumbersBig[i].value = newBoard[1][i - 9]
        }
        else if(i <= 26)
        {
            inputNumbersBig[i].value = newBoard[2][i - 18]
        }
        else if(i <= 35)
        {
            inputNumbersBig[i].value = newBoard[3][i - 27]
        }
        else if(i <= 44)
        {
            inputNumbersBig[i].value = newBoard[4][i - 36]
        }
        else if(i <= 53)
        {
            inputNumbersBig[i].value = newBoard[5][i - 45]
        }
        else if(i <= 62)
        {
            inputNumbersBig[i].value = newBoard[6][i - 54]
        }
        else if(i <= 71)
        {
            inputNumbersBig[i].value = newBoard[7][i - 63]
        }
        else if(i <= 80)
        {
            inputNumbersBig[i].value = newBoard[8][i - 72]
        }
    }
}

//check if the puzzle is a valid sudoku solved puzzle
function checkBigPuzzle(){
    var grids = [[],[],[],[],[],[],[],[],[]]
    document.querySelector(".result-text").innerHTML = ""
    
    for(let i = 0; i < inputNumbersBig.length; i++){
        inputNumbersBig[i].classList.remove("success")
        inputNumbersBig[i].classList.remove("fail")

        if(i <= 8){
            grids[0].push(inputNumbersBig[i].value)
        }
        else if(i <= 17){
            grids[1].push(inputNumbersBig[i].value)
        }
        else if(i <= 26){
            grids[2].push(inputNumbersBig[i].value)
        }
        else if(i <= 35){
            grids[3].push(inputNumbersBig[i].value)
        }          
        else if(i <= 44){
            grids[4].push(inputNumbersBig[i].value)
        }
        else if(i <= 53){
            grids[5].push(inputNumbersBig[i].value)
        }
        else if(i <= 62){
            grids[6].push(inputNumbersBig[i].value)
        }          
        else if(i <= 71){
            grids[7].push(inputNumbersBig[i].value)
        }
        else if(i <= 80){
            grids[8].push(inputNumbersBig[i].value)
        }       
    }

    if(isValidSudoku(grids)){
        for(let i= 0; i < 81; i++){
            inputNumbersBig[i].classList.remove("fail")
            inputNumbersBig[i].classList.add("success")
        }
        document.querySelector(".result-text").innerHTML = "You Win! Your Time is: " + document.querySelector(".final-time").innerHTML
        resetTime();
    }
    else{
        for(let i= 0; i < 81; i++){
            inputNumbersBig[i].classList.remove("success")
            inputNumbersBig[i].classList.add("fail")
        }        
        document.querySelector(".result-text").innerHTML = "Not Good!"
    }
}


//https://dev.to/kaxmoglan/valid-sudoku-solution-in-js-gne
function isValidSudoku(board) { 
    let rows = [[],[],[],[],[],[],[],[],[]]
    let columns = [[],[],[],[],[],[],[],[],[]]
    let boxes = [[],[],[],[],[],[],[],[],[]]
    for (let i = 0; i < 9; i++) { 
        for (let j = 0; j < 9; j++) {

            let cell = board[i][j];

            if(cell !== "") {
                if (rows[i].includes(cell)) {
                    return false
                } 
                else{
                    rows[i].push(cell);
                }
                if (columns[j].includes(cell)) {
                    return false;
                } 
                else{
                    columns[j].push(cell);
                }
                let boxIndex = Math.floor((i / 3)) * 3 + Math.floor(j / 3);

                if (boxes[boxIndex].includes(cell)) {
                    return false;
                } 
                else{
                    boxes[boxIndex].push(cell);
                }
            }
            else{
                return false
            }
        }
    } 
    return true;
}