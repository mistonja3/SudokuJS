//////////////////////
/////SMALL PUZZLE/////
//////////////////////

//allow numbers only from 1-4
function smallSudokuKeys(e){
    var pressedKey = e.keyCode || e.which;
    if((pressedKey > 48 && pressedKey < 53)) return;
    e.preventDefault();
}

//fill the fields with the solved puzzle
function solveSmallPuzzle(){
    document.querySelector(".result-text").innerHTML = ""
    var randNum = randomUniqueNum(4,4)

    for(let i = 0; i < inputNumbers.length; i++){
        
        inputNumbers[i].classList.remove("success")
        inputNumbers[i].classList.remove("fail")

        if(i <= 3){
            inputNumbers[i].value = MakeSolution(randNum)[0][i]
        }
        else if(i >= 4 && i <= 7){
            inputNumbers[i].value = MakeSolution(randNum)[1][i - 4]
        }
        else if(i >= 8 && i <= 11){
            inputNumbers[i].value = MakeSolution(randNum)[2][i - 8]
        }
        else if(i >= 12 && i <= 15){
            inputNumbers[i].value = MakeSolution(randNum)[3][i - 12]
        }       
    }
}

//check if the small puzzle satisfies the sudoku rules
function checkResultSmallPuzzle(){
    var grids = [[],[],[],[]]
    document.querySelector(".result-text").innerHTML = ""
    
    for(let i = 0; i < inputNumbers.length; i++){
        inputNumbers[i].classList.remove("success")
        inputNumbers[i].classList.remove("fail")

        if(i <= 3){
            grids[0].push(inputNumbers[i].value)
        }
        else if(i >= 4 && i <= 7){
            grids[1].push(inputNumbers[i].value)
        }
        else if(i >= 8 && i <= 11){
            grids[2].push(inputNumbers[i].value)
        }
        else if(i >= 12 && i <= 15){
            grids[3].push(inputNumbers[i].value)
        }          
    }

    if(ColCheck(grids)){
        for(let i = 0; i < inputNumbers.length; i++){
            inputNumbers[i].classList.add("success")
        }
        document.querySelector(".result-text").innerHTML = "You Win! Your Time is: " + document.querySelector(".final-time").innerHTML
        resetTime();
    }
    else{
        for(let i = 0; i < inputNumbers.length; i++){
            inputNumbers[i].classList.add("fail")
        }
        document.querySelector(".result-text").innerHTML = "Not Good!"
    }
    grids = [[],[],[],[]]
}

//next challange for small puzzle
function nextSmallPuzzle(){
    var randomNums = randomUniqueNum(4,4)
    document.querySelector(".result-text").innerHTML = ""
    for(let i = 0; i < inputNumbers.length; i++){

        if(i <= 3){
            inputNumbers[i].value = MakeSolution(randomNums)[0][i]
            if(i % 2 == getRandomInt(2)){
                inputNumbers[i].value = ""
            }
        }
        else if(i >= 4 && i <= 7){
            inputNumbers[i].value = MakeSolution(randomNums)[1][i - 4]
            if(i % 2 == getRandomInt(2)){
                inputNumbers[i].value = ""
            }
        }
        else if(i >= 8 && i <= 11){
            inputNumbers[i].value = MakeSolution(randomNums)[2][i - 8]
            if(i % 2 == getRandomInt(2)){
                inputNumbers[i].value = ""
            }
        }
        else if(i >= 12 && i <= 15){
            inputNumbers[i].value = MakeSolution(randomNums)[3][i - 12]
            if(i % 2 == getRandomInt(2)){
                inputNumbers[i].value = ""
            }
        }
        inputNumbers[i].classList.remove("success")
        inputNumbers[i].classList.remove("fail")
    }
}

//making 2d array
function MakeVector(row){
    let puzzle = [];
    for (let i=0; i<4; i++){
        
        let temp_row = [];

        for (let j = 0; j < 4; j++){
            temp_row[j] = row[j]
        }
        
        puzzle[i] = temp_row;
    }
    return puzzle;
}

//changing places of the elements in the arrays
function PermuteVector(row, p){
    if(p == 0){
        return row;
    }

    let q = [];

    for(let i = 0; i < 4; i++){
        q.push(row[i]);
    }

    while(p > 0){
        q.push(q[0]);
        q.shift();
        p = p - 1;
    }

    for(let i = 0; i < 4; i++){
        row[i] = q[0];
        q.shift()
    }

    return row;
}

function PermuteRows(puzzle, x, y, z){
    puzzle[1] = PermuteVector(puzzle[1], x);
    puzzle[2] = PermuteVector(puzzle[2], y);
    puzzle[3] = PermuteVector(puzzle[3], z);

    return puzzle;
}

function LinearSearch(vector, item){
    for(let i=0; i < vector.length; i++){
        if(vector[i] == item){
            return true;
        }
    }
    return false;
}

//check one column of the puzzle
function CheckColumn(puzzle, j){
    let temp = [];

    for(let i = 0; i < 4; i++){
    temp[i] = puzzle[i][j]
    
    }
    // console.log(temp)
    for(let k = 1; k < 5; k++){
        if(!LinearSearch(temp, k)){
            return false;
        }
        
    }
    return true;
}

//check all the columns of the puzzle
function ColCheck(puzzle){

    for(let j = 0; j < 4; j++){
        if (!CheckColumn(puzzle,j)){
            return false;
        }
    }
    return true;
}

//check the 2x2 grids 
function ColsFromGrids(puzzle){

    let new_puzzle = [];

    for(let i = 0; i < 4; i++){

        new_puzzle[i] = [];
        let r = Math.floor(i/2);
        let c = i % 2;
        new_puzzle[i][0] = puzzle[r][c];
        new_puzzle[i][1] = puzzle[r][c + 2];
        new_puzzle[i][2] = puzzle[r + 2][c];
        new_puzzle[i][3] = puzzle[r + 2][c + 2];
    } 
    return new_puzzle;
}


//finalizing the puzzle
function MakeSolution(row){

    for(let i = 0; i < 4; i++){

        for(let j = 0; j < 4; j++){

            for(let k = 0; k < 4; k++){
                
                in_puzzle = MakeVector(row);
                
                permuted = PermuteRows(in_puzzle, i, j, k);
                
                check_permuted = ColCheck(permuted);

                subgrid_change = ColsFromGrids(permuted);

                check_subgrid = ColCheck(subgrid_change)
                
                if(check_permuted && check_subgrid){
                    return subgrid_change
                }                
            }
        }
    }
}