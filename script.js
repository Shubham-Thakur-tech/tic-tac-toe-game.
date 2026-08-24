let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let friendModeBtn = document.querySelector("#friend-mode");
let aiModeBtn = document.querySelector("#ai-mode");

let turnX = true; 
let playAgainstComputer = false; // Tracks which mode is active

const winPatterns = [
  [0, 1, 2], [0, 3, 6], [0, 4, 8],
  [1, 4, 7], [2, 5, 8], [2, 4, 6],
  [3, 4, 5], [6, 7, 8],
];

// Mode Selection
friendModeBtn.addEventListener("click", () => {
    playAgainstComputer = false;
    friendModeBtn.classList.add("active");
    aiModeBtn.classList.remove("active");
    resetGame();
});

aiModeBtn.addEventListener("click", () => {
    playAgainstComputer = true;
    aiModeBtn.classList.add("active");
    friendModeBtn.classList.remove("active");
    resetGame();
});

const resetGame = () => {
  turnX = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val == pos2Val && pos2Val == pos3Val) {
        showWinner(pos1Val);
        return true; // Someone won!
      }
    }
  }
  return false; // No winner yet
};

// Computer AI Logic
const computerMove = () => {
    let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
    
    if (emptyBoxes.length > 0) {
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.innerHTML = "O";
        randomBox.disabled = true;
        turnX = true;
        checkWinner();
    }
};

// Box Click Logic
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Player Move
    if (turnX) {
        box.innerHTML = "X";
        turnX = false;
    } else if (!playAgainstComputer) {
        // Friend's Move
        box.innerHTML = "O";
        turnX = true;
    }
    box.disabled = true;

    // Check if the move won the game
    let isGameOver = checkWinner();

    // Trigger AI if playing against computer and game is not over
    if (!isGameOver && playAgainstComputer && !turnX) {
        setTimeout(computerMove, 500); // 500ms delay to feel realistic
    }
  });
});

newGameBtn.addEventListener("click", resetGame);

// Set default mode UI on load
friendModeBtn.classList.add("active");
