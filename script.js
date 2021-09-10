var clearBtn = document.getElementById("clear-btn")
var resultBtn = document.getElementById("result-btn")
var inputNumbers = document.querySelectorAll(".input-num")
var solveBtn = document.getElementById("solve-btn")
var nextBtn = document.getElementById("next-btn")

//click on the next button gives us some random numbers to solve sudoku
nextBtn.addEventListener('click', ()=>{
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
})

//clear button clears whole board
clearBtn.addEventListener('click', ()=>{
    document.querySelector(".result-text").innerHTML = ""
    for(let i = 0; i < inputNumbers.length; i++){
        inputNumbers[i].value= ""
        inputNumbers[i].classList.remove("success")
        inputNumbers[i].classList.remove("fail")
    }
})

//checking if our solution is correct or not
resultBtn.addEventListener('click', ()=>{
    var grids = [[],[],[],[]]
    document.querySelector(".result-text").innerHTML = ""
    // var grids = inputNumbers[i].value
    
    for(let i = 0; i < inputNumbers.length; i++){
        // grids.push(inputNumbers[i].value)
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
})

//solve button solves the sudoku for us
solveBtn.addEventListener('click', ()=>{

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
})

//returns an array of unique random number(s)
function randomUniqueNum(range, outputCount) {

    let arr = []
    for (let i = 1; i <= range; i++) {
      arr.push(i)
    }
  
    let result = [];
  
    for (let i = 1; i <= outputCount; i++) {
      const random = Math.floor(Math.random() * (range - i));
      result.push(arr[random]);
      arr[random] = arr[range - i];
    }
  
    return result;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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

//only run code if the sudoku is 4x4

for(let i = 0; i < inputNumbers.length; i++){


    //if it's 4x4 then only 1-4 numbers are allowed
    if(inputNumbers.length < 17){

        inputNumbers[i].addEventListener("keypress", (e)=>{
            var pressedKey = e.keyCode || e.which;
            if((pressedKey > 48 && pressedKey < 53)) return;
            e.preventDefault();
            
        })
    }

    inputNumbers[i].oninput = function () {
        if (this.value.length > 1) {
            this.value = this.value.slice(0,1); 
        }
    }
}

/////////////
//stopwatch//
var min = "00";
var sec = "00";
var ms = "00";
var minSpan = document.getElementById("min")
var secSpan = document.getElementById("sec")
var msSpan = document.getElementById("ms")
var startBtn = document.getElementById("start-btn")
var pauseBtn = document.getElementById("pause-btn")
var resetBtn = document.getElementById("reset-btn")
var interval;

startBtn.addEventListener('click', startTime)

pauseBtn.addEventListener('click', ()=>{
    clearInterval(interval);
})

resetBtn.addEventListener('click', resetTime)


function startTime(){
    clearInterval(interval);
    interval = setInterval(startStopwatch, 10);
}

function resetTime(){
    clearInterval(interval);
    ms = "00";
  	sec = "00";
    min = "00"
    msSpan.innerHTML = ms;
  	secSpan.innerHTML = sec;
  	minSpan.innerHTML = min;
}

function startStopwatch () {
    ms++; 
    
    if(ms <= 9){
        msSpan.innerHTML = "0" + ms;
    }
    
    if (ms > 9){
        msSpan.innerHTML = ms;
    } 
    
    if (ms > 99) {
      sec++;
      secSpan.innerHTML = "0" + sec;
      ms = 0;
      msSpan.innerHTML = "0" + 0;
    }
    
    if (sec > 9){
      secSpan.innerHTML = sec;
    }

    if(sec > 59){
        min++
        minSpan.innerHTML = "0" + min
        sec = 0;
        secSpan.innerHTML = "0" + 0
    }
  
  }