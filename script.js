let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
let clickSound = new Audio("click.mp3");
let winSound = new Audio("win.mp3");

function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    document.getElementById("turn-symbol").innerText = turn;
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    winConditions.forEach(condition => {
        let [a, b, c] = condition;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            isGameOver = true;
            boxes[a].classList.add("winning-box");
            boxes[b].classList.add("winning-box");
            boxes[c].classList.add("winning-box");
            document.getElementById("results").innerText = turn + " Wins! 🎉";
            document.getElementById("play-again").style.display = "inline";
            winSound.play();
        }
    });
}

function checkDraw() {
    if ([...boxes].every(box => box.innerText !== "") && !isGameOver) {
        document.getElementById("results").innerText = "It's a Draw! 😅";
        document.getElementById("play-again").style.display = "inline";
        isGameOver = true;
    }
}

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (!isGameOver && box.innerText === "") {
            box.innerText = turn;
            box.style.color = turn === "X" ? "#ff3e7f" : "#00bcd4";
            clickSound.play();
            checkWin();
            checkDraw();
            if (!isGameOver) changeTurn();
        }
    });
});

document.getElementById("play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.getElementById("turn-symbol").innerText = "X";
    document.getElementById("results").innerText = "";
    document.getElementById("play-again").style.display = "none";

    boxes.forEach(box => {
        box.innerText = "";
        box.classList.remove("winning-box");
    });
});
