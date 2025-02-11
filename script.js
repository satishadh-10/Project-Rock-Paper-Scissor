let userScore = 0;
let compScore = 0;
let drawScore = 0;
let congratulaionsAud = new Audio("congratulations.mp3");
let wrongAnsAud = new Audio("wrongAnswer.mp3")

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScoreNum = document.querySelector("#user-score");
const compScoreNum = document.querySelector("#comp-score");
const drawScoreNum = document.querySelector("#draw-score")


const genCompChoice = () => {
    const options = ["ROCK", "PAPER", "SCISSOR"];
    const ranIdx = Math.floor(Math.random() * 3);
    return options[ranIdx];  
}

const drawGame = () => {
    drawScore++;
    drawScoreNum.innerText = drawScore;
    msg.innerText = "Game was a Draw."  
    msg.style.backgroundColor = "black";
}

const showWinner = (userWin, compChoice, userChoice) => {
    if (userWin) {
        userScore++;
        userScoreNum.innerText = userScore;
        msg.innerText = `You Win. Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        congratulaionsAud.play();

    }
    else {
        compScore++;
        compScoreNum.innerText = compScore;
        msg.innerText = `You Lose. ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
        wrongAnsAud.play();
        wrongAnsAud.playbackRate = 2;
    }
}

const playGame = (userChoice) => {
    console.log(`User Choice = ${userChoice}`);
    const compChoice = genCompChoice();
    console.log(`Comp Choice = ${compChoice}`);
     
    if (userChoice === compChoice){
        drawGame();
    }
    else{
        let userWin = true;
        if(userChoice === "ROCK"){
            //compChoice = scissor/ paper
           userWin = compChoice === "PAPER" ? false : true;
        }
        else if(userChoice === "PAPER"){
            //compChoice = rock/scissor
            userWin = compChoice === "SCISSOR" ? false : true;
        }
        else {
            //userChoice = scissor
            //compChoice = rock/paper
            userWin = compChoice === "ROCK" ? false : true;
        }
        showWinner(userWin, compChoice, userChoice);
    }
}

choices.forEach((choice) => {
       choice.addEventListener("click", () => {
        congratulaionsAud.pause();
        wrongAnsAud.pause();
        wrongAnsAud.currentTime = 0;
        congratulaionsAud.currentTime = 0;
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
       })
})