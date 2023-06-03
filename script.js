// Use const instead of let for variables that don't change
const btnRef = document.querySelectorAll(".button-option");
const popupRef = document.querySelector(".popup");
const newgameBtn = document.getElementById("new-game");
const restartBtn = document.getElementById("restart");
const msgRef = document.getElementById("message");

// Winning Pattern Array
const winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true;
let count = 0;

// Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  // enable popup
  popupRef.classList.remove("hide");
};

// Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  // disable popup
  popupRef.classList.add("hide");
};

// This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  msgRef.innerHTML = `🙌✊🥳🎉👏 <br> Player '${letter}' Wins`;
};

// Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "😒😏😐 <br> OOPS!  It's a Draw";
};

// New Game
const resetGame = () => {
  count = 0;
  enableButtons();
};

newgameBtn.addEventListener("click", resetGame);
restartBtn.addEventListener("click", resetGame);

// Win Logic
const winChecker = () => {
  // Loop through all win patterns
  for (let pattern of winningPattern) {
    const [element1, element2, element3] = [
      btnRef[pattern[0]].innerText,
      btnRef[pattern[1]].innerText,
      btnRef[pattern[2]].innerText,
    ];

    // Check if elements are filled
    if (element1 !== "" && element2 !== "" && element3 !== "") {
      if (element1 === element2 && element2 === element3) {
        // If all 3 buttons have the same values, then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

// Display X/O on click
const handleClick = (element) => {
  if (xTurn) {
    xTurn = false;
    // Display X
    element.innerText = "X";
  } else {
    xTurn = true;
    // Display O
    element.innerText = "O";
  }

  element.disabled = true;
  count += 1;

  if (count === 9) {
    drawFunction();
  }

  winChecker();
};

btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    handleClick(element);
  });
});

// Enable Buttons and disable popup on page load
window.onload = enableButtons;
