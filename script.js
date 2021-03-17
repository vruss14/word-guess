let wordBank = ["string", "boolean", "program", "technology", "application", "selector", "variable", "class", "event", "function", "method", "object", "array", "declaration", "expression", "property", "value"];

let startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", startGame);

let wordContainer = document.getElementById("word-container");
let statsContainer = document.getElementById("stats-container");

let numPlaceholders = 0;
let placeholders = [];

let randomWordSelection = "";

let userDidWin = false;

let timer;
let timeOnClock;
let timerEl = document.getElementById("time-remaining")

// Selects a random word for the game 

function startGame () {
    timeOnClock = 15;
    startBtn.disabled = true;
    setTimer();
    generateWord();
}

function setTimer () {
    timer = setInterval(function () {
        timeOnClock--;
        
        console.log(timeOnClock);
        timerEl.textContent = `  ${timeOnClock}`;

        if (userDidWin && timeOnClock > 0 || timeOnClock === 0) {
            clearInterval(timer);
        }

    }, 1000);

}

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

        wordContainer.textContent =  placeholders.join("");
    }
}

// If the user has correctly the word, new text is displayed for feedback

function checkIfWinner () {

    if (randomWordSelection === placeholders.join("")) {
        wordContainer.textContent = "You won! :)";
        userDidWin = true;
        startBtn.disabled = false;
    }

}
