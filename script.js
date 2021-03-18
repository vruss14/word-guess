let wordBank = ["string", "boolean", "program", "technology", 
"application", "selector", "variable", "class", "event", 
"function", "method", "object", "array", "declaration", 
"expression", "property", "value", "true", "false", "script", "console",
"debug", "refactor", "syntax", "compile"];

// Start the game with initialized variables

let startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", startGame);

let wordContainer = document.getElementById("word-container");
let numPlaceholders = 0;
let placeholders = [];
let randomWordSelection = "";

let timer;
let timeOnClock;
let timerEl = document.getElementById("timer");

let statsContainer = document.getElementById("stats-container");
let stats = document.getElementById("stats-container");
let userDidWin = false;
let wins = document.getElementById("win-text");
let losses = document.getElementById("lose-text");
let winCount = localStorage.getItem("winCount");
let lossCount = localStorage.getItem("lossCount");

// Starts the timer and generates a word when user clicks the start button
// Resets in case user had won previously
// Start button can't be clicked while game is unfinished

function startGame () {
    userDidWin = false;
    timeOnClock = 15;
    startBtn.disabled = true;
    setTimer();
    generateWord();
}

// Sets a 15 second timer that clears if the user wins or loses

function setTimer () {
    timer = setInterval(function () {
        timeOnClock--;
        timerEl.textContent = `Time left:  ${timeOnClock}`;

        if (userDidWin && timeOnClock > 0) {
            clearInterval(timer);
        }

        // Losing will increase the loss count and update local storage

        if (timeOnClock === 0) {
            clearInterval(timer);
            wordContainer.textContent = "Game Over";
            lossCount++;

            localStorage.setItem("lossCount", lossCount);
            losses.textContent = `Losses: ${lossCount}`;

            startBtn.disabled = false;
        }

    }, 1000);
}

// Selects a random word for each game 

function generateWord () {
    placeholders = []; // Resets the array in case the user plays again
    randomWordSelection = wordBank[Math.floor(Math.random() * wordBank.length)];
    numPlaceholders = randomWordSelection.length;

    for (let i = 0; i < numPlaceholders; i++) {
        placeholders.push("_ ");
    }

    wordContainer.textContent = placeholders.join("");
}

// Listens for keys that the user presses down

document.addEventListener("keydown", function (event) {
    if (timeOnClock === 0) {
        return;
    }

    let key = event.key.toLowerCase();
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    if(alphabet.includes(key)) {
        guessedLetter = key;
        checkGuess(guessedLetter);
        checkIfWinner();
    }
})

// Checks if the guessed letter is within the word
// Replaces underscores with correct letters if guessed letter is correct

function checkGuess(guessedLetter) {
    let letterIsCorrect = false;

    for (let i = 0; i < numPlaceholders; i++) {
        if (randomWordSelection[i] === guessedLetter) {
            letterIsCorrect = true;
        }
    }

    if (letterIsCorrect) {

        for (let j = 0; j < numPlaceholders; j++) {

            if (randomWordSelection[j] === guessedLetter) {
                placeholders[j] = guessedLetter;
            }
        }

        wordContainer.textContent = placeholders.join("");
    }
}

// If the user has correctly the word, then:
// New text is displayed for feedback
// The start button can be clicked again
// The win count and local storage are both updated

function checkIfWinner () {
    if (randomWordSelection === placeholders.join("")) {
        wordContainer.textContent = "You won! 🎉";
        userDidWin = true;
        startBtn.disabled = false;
        winCount++;
        localStorage.setItem("winCount", winCount);
        updateWins();
    }
}

let updateWins = () => wins.textContent = `Wins: ${winCount}`;

// Retrieves current wins and losses based on local storage

getPreviousStats();

function getPreviousStats() {
    if (winCount === null) {
        wins.textContent = `Wins: 0`;
    } else {
        wins.textContent = `Wins: ${winCount}`;
    }

    if (lossCount === null) {
        losses.textContent = `Losses: 0`;
    } else {
        losses.textContent = `Losses: ${lossCount}`;
    }
}

// Resets local storage if desired

let resetBtn = document.getElementById("reset-btn");

resetBtn.addEventListener("click", function () {
    winCount = 0;
    lossCount = 0;

    localStorage.removeItem("winCount");
    localStorage.removeItem("lossCount");

    getPreviousStats();
})