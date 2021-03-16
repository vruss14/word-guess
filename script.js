console.log("Connected");

let wordBank = ["HTML", "CSS", "JavaScript", "String", "Boolean", "Program", "Technology", "Application", "Selector", "Variable", "Class", "jQuery", "Event", "Function", "Method", "Object", "Array", "Declaration", "Expression", "Property", "Value"];

let startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", generateWord);

let wordContainer = document.getElementById("word-container");
let statsContainer = document.getElementById("stats-container");

let placeholders = [];

function generateWord () {
    let randomWordSelection = wordBank[Math.floor(Math.random() * wordBank.length)];
    console.log(randomWordSelection);

    for (let i = 0; i < randomWordSelection.length; i++) {
        placeholders.push("_ ");
    }

    wordContainer.textContent =  placeholders.join("");
}

window.addEventListener("keydown", function (event, randomWordSelection) {
    let key = event.key.toLowerCase();
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    if(alphabet.includes(key)) {
        console.log(key);
    }

})