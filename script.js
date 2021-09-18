var clearBtn = document.getElementById("clear-btn")
var resultBtn = document.getElementById("result-btn")
var inputNumbers = document.querySelectorAll(".input-num")
var inputNumbersBig = document.querySelectorAll(".input-num.big")
var solveBtn = document.getElementById("solve-btn")
var nextBtn = document.getElementById("next-btn")
var undoBtn = document.getElementById("undo-btn")

//the value of the select will be none at the start of the game
if(document.querySelector('.change-grid').value == "none"){
    document.querySelector('.board.big').classList.add("hide")
    document.querySelector('.board.small').classList.add("hide")
}

//on change of the selected option we display different grids and different numberes are allowed
document.querySelector('.change-grid').onchange = function(){
    if(document.querySelector('.change-grid').value == "none"){
        document.querySelector('.board.big').classList.add("hide")
        document.querySelector('.board.small').classList.add("hide")
        for(let i = 0; i < inputNumbers.length; i++){
            inputNumbers[i].classList.remove("fail")
            inputNumbers[i].classList.remove("success")
        }
    }
    else if(document.querySelector('.change-grid').value == "Easy"){
        document.querySelector('.board.big').classList.add("hide")
        document.querySelector('.board.small').classList.remove("hide")
        
        for(let i = 0; i < inputNumbers.length; i++){
            inputNumbers[i].classList.remove("fail")
            inputNumbers[i].classList.remove("success")
            inputNumbers[i].removeEventListener("keypress", bigSudokuKeys, false)
            inputNumbers[i].addEventListener("keypress", smallSudokuKeys, false)

            //only allow single digits
            inputNumbers[i].oninput = function () {
                if (this.value.length > 1) {
                    this.value = this.value.slice(0,1); 
                }
            }
        }

        //click on the next button gives us some random numbers to solve sudoku
        nextBtn.addEventListener('click', nextSmallPuzzle, false)

        //checking if our solution is correct or not
        resultBtn.addEventListener('click', checkResultSmallPuzzle, false)

        //solve button solves the sudoku for us
        solveBtn.addEventListener('click', solveSmallPuzzle, false)

    }
    else{
        document.querySelector('.board.big').classList.remove("hide")
        document.querySelector('.board.small').classList.add("hide")

        for(let i = 0; i < inputNumbers.length; i++){
            inputNumbers[i].classList.remove("fail")
            inputNumbers[i].classList.remove("success")
            inputNumbers[i].removeEventListener("keypress", smallSudokuKeys, false)
            inputNumbers[i].addEventListener("keypress", bigSudokuKeys, false)
            
            //only single digits
            inputNumbers[i].oninput = function () {
                if (this.value.length > 1) {
                    this.value = this.value.slice(0,1); 
                }
            }
        }
        
        nextBtn.removeEventListener('click', nextSmallPuzzle, false)
        resultBtn.removeEventListener('click', checkResultSmallPuzzle, false)
        solveBtn.removeEventListener('click', solveSmallPuzzle, false)

        //solve button solves the sudoku for us
        solveBtn.addEventListener('click', solveBigPuzzle, false)
        //checking if our solution is correct or not
        resultBtn.addEventListener('click', checkBigPuzzle, false)
        //make some empty fields so the player can play
        nextBtn.addEventListener('click', nextBigSudoku, false)
    }
}

//clear button clears whole board
clearBtn.addEventListener('click', clearGrids, false)

function clearGrids(){
    document.querySelector(".result-text").innerHTML = ""
    for(let i = 0; i < inputNumbers.length; i++){
        inputNumbers[i].value= ''
        inputNumbers[i].classList.remove("success")
        inputNumbers[i].classList.remove("fail")
    }
}

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