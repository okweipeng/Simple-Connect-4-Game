const rows = 6;
const cols = 7;
let board = [];
let currentPlayer = 1;

const boardDiv = document.getElementById("board");
const player1Indicator = document.getElementById("player1");
const player2Indicator = document.getElementById("player2");

function initBoard() {
    board = Array.from({ length: rows }, () => Array(cols).fill(0));
    boardDiv.innerHTML = "";

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement("div");
            cell.className = "cell empty";
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", () => makeMove(col));
            boardDiv.appendChild(cell);
        }
    }

    updateIndicators();
}

function makeMove(col) {
    for (let row = rows - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
            board[row][col] = currentPlayer;
            updateBoard();

            if (checkWinner(row, col)) {
                alert(`Player ${currentPlayer} wins!`);
                return;
            }

            if (board.flat().every(cell => cell !== 0)) {
                alert("It's a draw!");
                return;
            }

            currentPlayer = currentPlayer === 1 ? 2 : 1;
            updateIndicators();
            break;
        }
    }
}

function updateBoard() {
    Array.from(boardDiv.children).forEach(cell => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        const player = board[row][col];
        cell.classList.remove("player1", "player2", "empty");

        if (player === 1) cell.classList.add("player1");
        if (player === 2) cell.classList.add("player2");
        if (player === 0) cell.classList.add("empty");
    });
}

function checkWinner(row, col) {
    function count(rowStep, colStep) {
        let r = row, c = col, count = 0;
        while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
            count++;
            r += rowStep;
            c += colStep;
        }
        return count;
    }

    return (
        count(0, 1) + count(0, -1) - 1 >= 4 ||
        count(1, 0) + count(-1, 0) - 1 >= 4 ||
        count(1, 1) + count(-1, -1) - 1 >= 4 ||
        count(1, -1) + count(-1, 1) - 1 >= 4
    );
}

function updateIndicators() {
    player1Indicator.classList.toggle("active", currentPlayer === 1);
    player2Indicator.classList.toggle("active", currentPlayer === 2);
    player1Indicator.textContent = currentPlayer === 1 ? "Player 1 (Your Turn)" : "Player 1";
    player2Indicator.textContent = currentPlayer === 2 ? "Player 2 (Your Turn)" : "Player 2";
}

function resetGame() {
    currentPlayer = 1;
    initBoard();
}

initBoard();

