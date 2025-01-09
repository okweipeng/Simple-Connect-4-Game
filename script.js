// Number of rows and columns for the Connect 4 board
const rows = 6;
const cols = 7;

// Initialize an empty board (2D array), each cell starts with a value of 0 (no player has moved there yet)
let board = [];
let currentPlayer = 1; // Player 1 starts first

// Get the HTML elements for displaying the board and player indicators
const boardDiv = document.getElementById("board");
const player1Indicator = document.getElementById("player1");
const player2Indicator = document.getElementById("player2");

// Function to initialize or reset the board
function initBoard() {
    // Create a 2D array of the board with all cells set to 0 (empty)
    board = Array.from({ length: rows }, () => Array(cols).fill(0));
    boardDiv.innerHTML = ""; // Clear the existing board

    // Loop through each row and column to create the cells in the HTML
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement("div"); // Create a new cell div
            cell.className = "cell empty"; // Add classes for styling
            cell.dataset.row = row; // Set the row and column as data attributes for each cell
            cell.dataset.col = col;
            // Add an event listener to handle cell clicks (to make a move)
            cell.addEventListener("click", () => makeMove(col)); 
            boardDiv.appendChild(cell); // Add the cell to the board in the HTML
        }
    }

    // Update the indicators for which player’s turn it is
    updateIndicators();
}

// Function to make a move (called when a player clicks on a column)
function makeMove(col) {
    // Loop through the rows starting from the bottom to find the first empty cell in the selected column
    for (let row = rows - 1; row >= 0; row--) {
        if (board[row][col] === 0) { // If the cell is empty (0), the player can drop their piece here
            board[row][col] = currentPlayer; // Mark the cell with the current player's number (1 or 2)
            updateBoard(); // Update the visual representation of the board

            // Check if the current move wins the game
            if (checkWinner(row, col)) {
                alert(`Player ${currentPlayer} wins!`); // If there's a winner, show a message
                return; // Stop further moves
            }

            // Check if the board is full (draw condition)
            if (board.flat().every(cell => cell !== 0)) {
                alert("It's a draw!"); // If no empty cells are left, it's a draw
                return;
            }

            // Switch to the next player
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            updateIndicators(); // Update the player indicators
            break; // Exit the loop once the move is made
        }
    }
}

// Function to update the visual board on the screen
function updateBoard() {
    // Loop through all the cells and update the visual class for each one
    Array.from(boardDiv.children).forEach(cell => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        const player = board[row][col]; // Get the value of the cell (player number)
        
        // Remove the current player class (if any) and reset to empty
        cell.classList.remove("player1", "player2", "empty");

        // Add the appropriate class based on the player number
        if (player === 1) cell.classList.add("player1");
        if (player === 2) cell.classList.add("player2");
        if (player === 0) cell.classList.add("empty");
    });
}

// Function to check if the current move results in a win
function checkWinner(row, col) {
    // Helper function to count consecutive discs in a direction (horizontal, vertical, diagonal)
    function count(rowStep, colStep) {
        let r = row, c = col, count = 0;
        // Move in the given direction while within bounds and matching the current player
        while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
            count++; // Count consecutive discs
            r += rowStep; // Move to the next row (based on rowStep)
            c += colStep; // Move to the next column (based on colStep)
        }
        return count;
    } 

    // Check all four possible directions for a win (horizontal, vertical, and two diagonals)
    return (
        count(0, 1) + count(0, -1) - 1 >= 4 || // Horizontal
        count(1, 0) + count(-1, 0) - 1 >= 4 || // Vertical
        count(1, 1) + count(-1, -1) - 1 >= 4 || // Diagonal (bottom-left to top-right)
        count(1, -1) + count(-1, 1) - 1 >= 4 // Diagonal (bottom-right to top-left)
    );
}

// Function to update the visual indicators of which player’s turn it is
function updateIndicators() {
    // Highlight the current player’s indicator and show the turn message
    player1Indicator.classList.toggle("active", currentPlayer === 1);
    player2Indicator.classList.toggle("active", currentPlayer === 2);
    player1Indicator.textContent = currentPlayer === 1 ? "Player 1 (Your Turn)" : "Player 1";
    player2Indicator.textContent = currentPlayer === 2 ? "Player 2 (Your Turn)" : "Player 2";
}

// Function to reset the game to its initial state
function resetGame() {
    currentPlayer = 1; // Set Player 1 to start
    initBoard(); // Re-initialize the board
}

// Initialize the game board when the page is loaded
initBoard();
