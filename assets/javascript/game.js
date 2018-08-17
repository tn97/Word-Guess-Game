// start audio
function SetVolume(val) {
    var player = document.getElementById("music");
    console.log("Before: " + player.volume);
    player.volume = val / 100;
    console.log("After: " + player.volume);
};
// end audio

"use strict";

// this chooses music depending on word selected by randomizer
var selectableWords = [
    "POKEMON",
    "MONSTER HUNTER WORLD",
    "BORDERLANDS",
    "RUNESCAPE",
    "DARKSOULS",
    "HALO",
    "SKYRIM",
    "CALL OF DUTY"
];

var musicChange = selectableWords;

var songObject = {
    "POKEMON": "../sounds/lavenderTown.mp3",
    "MONSTER HUNTER WORLD": "../sounds/MHW-OS1.mp3",
    "BORDERLANDS": "../sounds/borderlands.mp3",
    "RUNESCAPE": "../sounds/runescape.mp3",
    "DARK SOULS": "../sounds/DS3.mp3",
    "HALO": "../sounds/HaloOST.mp3",
    "SKYRIM": "../sounds/dragonborn.mp3",
    "CALL OF DUTY": "../sounds/MW1.mp3"
};
//end choosing music

var maxErrors = 10; // The maximum number of errors the user can make
var guessedLetters = []; // Stores the letters that the user has guessed
var currentWord; // The current word in the array
var guessingWord; // The word that is selected to be in the current game of Hangman
var remainingGuesses = 0; // How many tries the user has left
var hasFinished = false; // A flag that will be used to see if the person has won
var wins = 0; // Stores how many wins the user has under their belt

// Used for resetting our game level variables
function resetGame() {
    // Resets the number of guesses to the number of maximum errors that the user can make
    remainingGuesses = maxErrors;

    // Using the randomizer function to round the number down to the nearest whole number and chooses from the list of selectableWords
    currentWord = Math.floor(Math.random() * (selectableWords.length));

    // if (currentWord === "POKEMON") {
    //     music.getElementById("audio").src = songObject[musicChange]
    // }
    //This clears out the arrays
    guessedLetters = [];
    guessingWord = [];
//   var audiowin = new Audio()
//   audiowin.src = soundsr
//   audiowin.muted = mutetog  
  // songObject[currentWord]
    
    // Build the _ areas and clear out the last played game
    for (var i = 0; i < selectableWords[currentWord].length; i++) {
        if (selectableWords[currentWord][i] == " ") {
        guessingWord.push(" ");
        } else {
        guessingWord.push("_");
        }
    }

    // Hide the game over and you win images/texts
    document.getElementById("pressAgain").style.cssText = "display: none";
    document.getElementById("gameoverImage").style.cssText = "display: none";
    document.getElementById("youWinImage").style.cssText = "display: none";
    console.log("displayNoneWorking5")
    // Show display
    updateDisplay();
};

// Updates the display on HTML
function updateDisplay() {
    document.getElementById("totalWins").innerText = Math.round(wins);

    //Displays how much of the word has already been guessed
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];

    }

    // Refresh the values of these elements that are displayed
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};

//This function takes a letter and finds all instances of it in the string shown in-game
function evaluateGuess(letter) {
    // This is an array that stores the positions of the letters in the string
    var positions = [];

    // This loop will find all the instances of the letter and store them in the array above
    for (var i = 0; i < selectableWords[currentWord].length; i++) {
        if (selectableWords[currentWord][i] === letter) {
            positions.push(i);
        }
    }

    // This will remove a guess if the guessed letter is incorrect
    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        // Otherwise, if the guessed letter is correct, replace the _ with the letter
        for (var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
    checkWin();

};

// Checks for a win in the game
function checkWin() {
    console.log("hi");
    if (guessingWord.indexOf("_") === -1) {
        document.getElementById("youWinImage").style.cssText = "display: block";
        document.getElementById("pressAgain").style.cssText = "display: block";
        wins += 0.5;
        hasFinished = true;
    }
    checkLoss();
};

// Checks for a loss in the game
function checkLoss() {
    console.log("hi loss")
    if (remainingGuesses <= 0) {
        document.getElementById("gameoverImage").style.cssText = "display: block";
        document.getElementById("pressAgain").style.cssText = "display: block";
        hasFinished = true;
    }
};

// Takes a guess
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        // Protection for the user if they type the same letter in
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
};

// Event Listener
document.onkeydown = function (event) {
    // If the game is finished, one keystroke will reset the game
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // Make sure A-Z was actually pressed
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};


//WHAT NEEDS TO BE DONE:
//MUSIC WHEN GAME BEGINS, CAN USE CODE ABOVE, JUST MAKE IT SO THAT THE NAMES ARE THE SAME AND MAKE A SCRIPT
//GO THROUGH OG CODE TO SEE^^^^^^
// add win or false, throw logic behind game running
// if game isnt running, dont do anything when press key