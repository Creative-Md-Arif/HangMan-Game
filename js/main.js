const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");



let currentWord, correctletters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () =>{
    //Ressetting all game variables and Ui elements
    correctletters =[];
    wrongGuessCount = 0;
    hangmanImage.src = `image/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");   
}

const getRandomWord = () => {
    //Selecting a random word and hint from the wordlist
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();

}


const gameOver = (isVictory) => {
    //after 600ms of game comlete .. showing modal with relevant details
    const modalText = isVictory ? `You Found the word:` : `the correct word was :`;
    gameModal.querySelector("img").src = `image/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats' : 'Game Over'}`;
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    setTimeout(() => {
        gameModal.classList.add("show");   
    }, 300);
}



const initGame = (button , clickedLetter) => {
    //Checking if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)){
    //Showing all correct letters on the word display
       [...currentWord].forEach((letter, index)=>{
        if(letter === clickedLetter){
            correctletters.push(letter);
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
       })
    }else{
        // If clicked letter dosen't exist then update the wrongGuessCount and Hangman image
       wrongGuessCount++;
       hangmanImage.src = `image/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    //Calling gameover function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctletters.length === currentWord.length) return gameOver(true);
  
}




// keyboard button js and adding event Listeners
for (let i = 97; i <= 122; i++){
    const button = document.createElement ("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));


    
}


getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);