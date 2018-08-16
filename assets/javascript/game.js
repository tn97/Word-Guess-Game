//start audio
// function SetVolume(val) {
//     var player = document.getElementById("music");
//     console.log("Before: " + player.volume);
//     player.volume = val / 100;
//     console.log("After: " + player.volume);
// };
//end audio
"use strict";
// this chooses music depending on word selected by randomizer
var selectableWords = [
    "POKEMON",
    "MONSTERHUNTER",
    "BORDERLANDS",
    "RUNESCAPE",
    "DARKSOULS",
    "HALO",
    "SKYRIM",
    "CALLOFDUTY"
];

var musicChange = selectableWords;

var songObject = {
    "pokemon": "../Media/lavenderTown.mp3",
    "monster hunter world": "../Media/MHW-OS1.mp3",
    "borderlands": "../Media/borderlands.mp3",
    "runescape": "../Media/runescape.mp3",
    "dark souls": "../Media/DS3.mp3",
    "halo": "../HaloOST.mp3",
    "skyrim": "../Media/dragonborn.mp3",
    "Call of Duty": "../Media/MW1.mp3"
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

    //This clears out the arrays
    guessedLetters = [];
    guessingWord = [];

    // Build the _ areas and clear out the last played game
    for (var i = 0; i < selectableWords[currentWord].length; i++) {
        guessingWord.push("_");
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
    document.getElementById("totalWins").innerText = wins;

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
};

// Checks for a win in the game
function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        document.getElementById("youwinImage").style.cssText = "display: block";
        document.getElementById("pressAgain").style.cssText = "display: block";
        wins++;
        hasFinished = true;
    }
};

// Checks for a loss in the game
function checkLoss() {
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



// var acceptedLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// var word = selectableWords(Math.floor(Math.random() * selectableWords.length));
// console.log(word);
// var answerArray = [];
// for (var i = 0; i < word.length; i++) {
//     answerArray[i] = "_";
// }

// var remainingLetters = selectableWords.length;
// while (remainingLetters > 0) {
//     alert(answerArray.join(" "));

//     var guess = prompt("Guess a letter, or click Cancel to stop playing");
//     if (guess === null) {
//         break;
//     } else if (guess.length !== 1) {
//         alert("Please enter a single letter.");
//     } else {
//         for (var i = o; i < word.length; i++) {
//             if (word[i] === guess) {
//                 answerArray[i] = guess;
//                 remainingLetters--;
//             }
//         }
//     }
// }
// alert(answerArray.join(" "));
// alert("Good Job! The answer was " + word);

//WHAT NEEDS TO BE DONE:
//ACTUAL RESETTING OF THE GAME WHEN WIN OR LOSE
//MUSIC WHEN GAME BEGINS, CAN USE CODE ABOVE, JUST MAKE IT SO THAT THE NAMES ARE THE SAME AND MAKE A SCRIPT