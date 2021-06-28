import { wordsArray } from "./mainArray.js";

let shuffleWordsArr = [...wordsArray];

shuffleWordsArr.sort(() => Math.random() - 0.5);

console.log(shuffleWordsArr);

const container = document.getElementById("container");
const heading = document.getElementById("heading");
const winDiv = document.getElementById("gameWin");
const gameOverDiv = document.getElementById("gameOver");
const mainContent = document.getElementById("mainContent");
const wordArea = document.getElementById("wordArea");
const hiddenWordDiv = document.getElementById("hiddenWords");
const wrongWordDiv = document.getElementById("wrongWords");
const hangmanArea = document.getElementById("hangmanArea");
const fullHangman = document.getElementById("stand-6");

let index = 0;
let wordLength = 0;
let userKey = "";
let word = "";
let lives = 0;
let userInputArr = [];
let userAns = [];

let renderWord = () => {
  wordLength = shuffleWordsArr[index].word.length;
  word = shuffleWordsArr[index].word;

  for (let i = 0; i < wordLength; i++) {
    let div = document.createElement("div");
    div.id = `div-${i + 1}`;
    div.innerHTML = `
    <span id = "span-${i + 1}" style= "display: none;">
      ${shuffleWordsArr[index].word[i]}
    </span>`;
    hiddenWordDiv.append(div);
  }
  // console.log(word);
};

renderWord();

let userInput = () => {
  document.addEventListener("keyup", (event) => {
    if (lives >= 6) return;

    if (event.keyCode >= 65 && event.keyCode <= 90) {
      userKey = event.key.toUpperCase();
      console.log(userKey);

      if (userInputArr.includes(userKey)) {
        alert("You have already pressed: " + userKey);
      } else {
        userInputArr.push(userKey);
        console.log(userInputArr);

        let foundWord = false;

        for (let i = 0; i < word.length; i++) {
          if (userKey === word[i]) {
            foundWord = true;
            document.getElementById(`span-${i + 1}`).style.display = "block";
            userAns.push(i);
          }
        }

        if (userAns.length === word.length) {
          if (winDiv.style.display !== "flex") {
            foundWord = true;
            lives = 0;

            setTimeout(() => {
              mainContent.style.display = "none";
            }, 500);

            setTimeout(() => {
              winDiv.style.display = "flex";
              winDiv.innerHTML = `<h3>You Win!<h3>`;
            }, 1000);
          }
          return;
        }
        console.log({ userAns });

        if (foundWord === false) {
          lives++;
          document.getElementById(`stand-${lives - 1}`).style.display = "none";
          document.getElementById(`stand-${lives}`).style.display = "block";
        }
      }

      if (fullHangman.style.display === "block") {
        lives = 0;
        if (gameOverDiv.style.display !== "flex") {
          setTimeout(() => {
            mainContent.style.display = "none";
          }, 500);
  
          setTimeout(() => {
            gameOverDiv.style.display = "flex";
            gameOverDiv.innerHTML = `<h3>Game Over<h3>`;

          }, 1000);
        }
      }
    } else {
      console.log("Invalid Word!, please press only Alphabetical Words.");
    }
    console.log({ lives });
  });
};
userInput();
