// Constants
const user1 = document.getElementById("player-1");
const user2 = document.querySelector("#player-2");
const submit = document.querySelector("#submit");
const form = document.querySelector("#form");
const gameBoard = document.querySelector("#game-board");
const restart = document.getElementById("restart");
let message = document.getElementById("message");
let boxes = document.getElementsByClassName("box");
let player1, player2, turn, playerTurn;
let winStatus = false;

//function to add players

submit.addEventListener('click', (event)=>{
    event.preventDefault();
    player1 = (user1.value).trim();
    player2 = (user2.value).trim();
    if(player1 == "" || player2 == "") return;
    turn = "X";
    playerTurn = player1;
    form.classList.add("disabled", "inactive");
    gameBoard.classList.remove("disabled", "inactive");
    message.innerHTML = playerTurn + ", you're up";
})

//function to Play
Array.from(boxes).forEach(box =>{
    box.addEventListener(`click`, ()=>{
        if(box.innerHTML === ""){
            box.innerHTML = turn;
            checkWin();
        }
    })
})

//function to change the Turn
function changeTurn(){
    if(turn == "X" && playerTurn == player1){
        turn = "O";
        playerTurn = player2;
    }else{
        turn = "X";
        playerTurn = player1;
    }
    message.innerHTML = playerTurn + ", you're up";
}

//function to check Win
function checkWin(){
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    wins.forEach(e =>{
        if(boxes[e[0]].innerText == boxes[e[1]].innerText && boxes[e[1]].innerText == boxes[e[2]].innerText && boxes[e[2]].innerText != ""){
            message.innerHTML = playerTurn + ", congratulations you won!";
            boxes[e[0]].classList.add("win");
            boxes[e[1]].classList.add("win");
            boxes[e[2]].classList.add("win");
            document.getElementsByClassName("game-field")[0].classList.add("disabled");
            winStatus = true;
        }
    })

    if(winStatus){
        restart.classList.remove("disabled", "inactive");
    }else{
        changeTurn();
    }
}

//function to reload
restart.addEventListener(`click`, (event)=>{
    location.reload();
})