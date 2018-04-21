// If I wanted the user to have to click to start the game I would uncomment this code
// document.getElementById("pressAnyKey").textContent = "Click here to play!";
// document.getElementById("pressAnyKey").onclick = function(startGame) {

//Game starts/resets and sets up variables

var wins = 0;
var wordsPlayed = [];
var hackerWorks = ["Hackers", "Tron", "TheMatrix", "Existenz", "JohnnyMnemonic"];

function startGame() {
    var wordBlanks = [];
    var guessesRemaining = 10;
    var lettersGuessed = [];
    var lettersMissed = [];
    var lettersPossible = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",];

    // var hackerRandom = hackerWorks[Math.floor(Math.random()*hackerWorks.length)].toLowerCase();
    // console.log("Hacker random: " + hackerRandom);
    // var computerChoice = hackerRandom;
    // wordsPlayed.push(computerChoice);
    // console.log("Answer (spoiler alert!): " + computerChoice);

    // Randomly selects word for user to guess and secretly shows it in the console for cheaters
    var hackerRandom = [Math.floor(Math.random()*hackerWorks.length)];
    console.log("Hacker random: " + hackerRandom);
    var computerChoice = hackerWorks[hackerRandom].toLowerCase();
    wordsPlayed.push(computerChoice);
    console.log("Answer (spoiler alert!): " + computerChoice);
    hackerWorks[hackerRandom] = hackerWorks[0];
    hackerWorks.shift();
    console.log(hackerWorks);


    // Sets the number of blanks to correspond with the random word chosen
    for (var i = 0; i < computerChoice.length; i++) {
        wordBlanks.push("_");
    }

    // Sets HTML to show number of blanks and guesses remaining to start the game, nullifies onclick so user can't pick another word
    document.getElementById("word-blanks").textContent = wordBlanks.join(" ");
    document.getElementById("guessesRemaining").textContent = "Number of guesses remaining: " + guessesRemaining;
    document.getElementById("pressAnyKey").textContent = "Go ahead and hack the mainframe (guess a letter)!";
    document.getElementById("pressAnyKey").onclick = null;
    document.getElementById("wins").textContent = "Wins: " + wins;
    document.getElementById("lettersMissed").textContent = "Letters you miss will show up here ...";

    // Game function runs when user presses a letter key
    document.onkeyup = function() {
        var positions = [];
        var userGuess = String.fromCharCode(event.keyCode)
        .toLowerCase ();
        console.log(userGuess);

        // Makes sure user hasn't already lost - if so ,the functions ends
        
        if (guessesRemaining === 0) {
            console.log ("Game over!");
            console.log("Words played: " + wordsPlayed);
            return;
        }

        // Makes sure user is typing a letter - if not, console secretly makes fun of user and nothing happens
        if (lettersPossible.includes(userGuess)) {

            // Make sure user hasn't successfully guessed the letter already - if so, nothing happens
            if (lettersGuessed.includes(userGuess)) {
                console.log("Already tried it.");
                return;
            }

            // Checks to see if user guesses right - if so, indices are sent so letters replace blanks
            for (var i = 0; i < computerChoice.length; i++) {
                if (userGuess === computerChoice[i]) {
                    positions.push(i);
                    lettersGuessed.push(userGuess);
                    wordBlanks[i] = userGuess;
                    wordBlanks.push[i];
                    document.getElementById("word-blanks").textContent = wordBlanks.join(" ");
                }
            }

            // Checks to see if user has guessed all letters - if so, winning message pops up and option to restart appears
            if (lettersGuessed.length === computerChoice.length) {
                if (hackerWorks.length === 0) {
                    console.log ("Nothing left to guess!");
                    console.log("Words played: " + wordsPlayed);
                    document.getElementById("wins").textContent = "Wins: " + wins;
                    document.getElementById("pressAnyKey").textContent = "There are no more words for you to guess! Go find something else to do!";
                    document.getElementById("pressAnyKey").onclick = null;
                    document.getElementById("wins").textContent = "You beat the whole game!";
                return;
                }
                wins++;
                console.log("Wins: " + wins);
                console.log("Words played: " + wordsPlayed);
                document.getElementById("wins").textContent = "Wins: " + wins;
                startGame ();
                // document.getElementById("pressAnyKey").textContent = "Congrats, you won! Click here to play again!";
                // document.getElementById("pressAnyKey").onclick = startGame;
            return;
            }

            // Checks to see if user has missed the letter already - if so, nothing happens
            if (lettersMissed.includes(userGuess)) {
                console.log("Already tried it.");
                return;
            }

            // If user did not select a winning letter, this function occurs and guesses remaining goes down by one
            if (positions.length <= 0) {
                guessesRemaining--;
                document.getElementById("guessesRemaining").textContent = "Number of guesses remaining: " + guessesRemaining;
                lettersMissed.push(userGuess);
                document.getElementById("lettersMissed").textContent = "Letters you've missed: " + lettersMissed.join(" ");
            }

            // If letters missed hits 10, user gets game over and option to restart game
            if (lettersMissed.length === 10) {
                if (hackerWorks.length === 0) {
                    console.log ("Nothing left to guess!");
                    console.log("Words played: " + wordsPlayed);
                    document.getElementById("pressAnyKey").textContent = "There are no more words for you to guess! Go find something else to do!";
                    document.getElementById("pressAnyKey").onclick = null;
                    return;
                }
                console.log ("Game over!");
                console.log("Words played: " + wordsPlayed);
                // document.getElementById("pressAnyKey").textContent = "You ran out of turns! Click here to play again!";
                // document.getElementById("pressAnyKey").onclick = startGame;
                startGame();
            return;
            }

            // For testing
            // console.log("Number of guesses remaining: " + guessesRemaining);
            // console.log("Letters guessed: " + lettersGuessed);
            // console.log("Indices of letter guessed: " + positions);
            // console.log("Letters missed: " + lettersMissed);
        }
        else {
            console.log("Not a letter, d00d.");
        }
    }
};