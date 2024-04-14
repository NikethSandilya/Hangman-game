// Dynamic Button as keyboard
// ASCII value of a=97 to b =122
const hangmanImage = document.querySelector(".hangman-box img");
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplayDiv = document.querySelector(".word-display")
const guessesText =document.querySelector(".guesses-text b")
const gameModel = document.querySelector(".game-model")
const playAgainBtn = document.querySelector(".playagain")
let currentWord, correctLetters,worngGuessedCount;
const maxGuessedCount =6;
for (let i=97; i<=122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click",e => initGame(e.target,String.fromCharCode(i)));
}
const resetGame= () =>{
    // Resetting all game variables and UI elements
    correctLetters = [];
    worngGuessedCount=0;
    wordDisplayDiv.innerHTML = currentWord.split("").map(()=>'<li class="letter"></li>').join("");
    guessesText.innerHTML=`${worngGuessedCount}/${maxGuessedCount}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled=false);
    hangmanImage.src=`images/hangman-${worngGuessedCount}.svg`
    gameModel.classList.remove("show");
}

// get Random Word
const getRandomWord = () => {
    // Selecting of Random word from the word-list.js file and getting some intex of the objects and getting that
     const {word,hint} = wordList[Math.floor(Math.random()*wordList.length)];
     currentWord = word;
     document.querySelector(".hint-text b").innerHTML = hint;
     resetGame()
    //  To make the blanks of same size of the word
}
const gameOver = (isVictory)=>{
   setTimeout(()=>{
      const modelText = isVictory? `You found the word` : `The correct word was:`;
      gameModel.querySelector("img").src=`images/${isVictory? 'victory':`lost`}.gif`;
      gameModel.querySelector("h4").innerHTML=`${isVictory ? 'Congrats!':'Game Over!'}`;
      gameModel.querySelector("p").innerHTML= `${isVictory?modelText:modelText+" "+currentWord}`;
      gameModel.classList.add("show");
   },300)
}
// Checking the letter presences in word
const initGame=(button,clickedLetter) =>{
    if(currentWord.includes(clickedLetter)){
        // Spreading of letter in the word to get each char
       [...currentWord].forEach((letter,index)=>{
        if(letter === clickedLetter){
            correctLetters.push(letter);
            wordDisplayDiv.querySelectorAll("li")[index].innerHTML = letter;
            wordDisplayDiv.querySelectorAll("li")[index].classList.add("guessed");
        }
       })
    }else{
        worngGuessedCount++;
        hangmanImage.src=`images/hangman-${worngGuessedCount}.svg`
    }
    button.disabled=true;
    guessesText.innerHTML=`${worngGuessedCount}/${maxGuessedCount}`;
    // Calling the function be win or loss of the game 
    if(worngGuessedCount === maxGuessedCount) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

getRandomWord();
playAgainBtn.addEventListener("click",getRandomWord);
