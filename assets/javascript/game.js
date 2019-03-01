//variables
var words = ["ruger", "sigsauer", "springfield", "baretta", "smithwesson", "glock", "magnum", "kimber"];
var randWord = "";
var letters = [];
var guess = [];
var wrongLetters = [];

var num = 0;
var guessesLeft = 10;
var losses = 0;
var wins = 0;

//begins the game on load up of the page
function gameStart() {
    randWord = words[Math.floor(Math.random() * words.length)];
    letters = randWord.split("");
    num = letters.length;

    // console.log(num);
    // console.log(letters);
    // console.log(randWord)

    //empty arrays
    guessesLeft = 10;
    wrongLetters = [];
    guess = [];

    for (var i = 0; i < num; i++) {
        guess.push("_")
        //console.log(guess)
    }

    document.getElementById("secretAnswer").innerHTML = guess.join(" ");
    document.getElementById("game").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("guessesLeft").innerHTML = guessesLeft;

};

//function is to check to see if letter that is guessed is correct or wrong
function checkAnswer(letter) {

    var letterInWord = false;

    for (var j = 0; j < num; j++) {

        if (letter === randWord[j]) {
            letterInWord = true;
        }
    }

    if (letterInWord) {
        for (var j = 0; j < num; j++) {
            if (randWord[j] === letter) {
                guess[j] = letter;
                //console.log(guess)
            }
        }
    } else {
        wrongLetters.push(letter);
        guessesLeft--;
    }

};

//the following is the game loop for another following a win or a loss
gameStart();


function rounds() {
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById("answersGuessed").innerHTML = wrongLetters;
    document.getElementById("secretAnswer").innerHTML = guess.join(" ");

    //this triggers a win and adds a point tally to wins
    if (letters.toString() === guess.toString()) {
        wins++
        document.getElementById("game").innerHTML = wins;
        gameStart();
    
    //triggers a loss and adds to the loss tally
    } else if (guessesLeft === 0) {
        losses++
        document.getElementById("losses").innerHTML = losses;
        gameStart();
    }
};

//registers what keystroke was executed
document.onkeypress = function (event) {
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    //console.log(userGuess);
    checkAnswer(userGuess);
    rounds();
};