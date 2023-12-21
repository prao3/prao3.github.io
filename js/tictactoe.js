// Making a tictactoe board
let board = new Board;
// Integer representing if computer plays first or if player plays first
// Set to 0 if the player goes first, otherwise set to 1 for computer first
let firstTurn = 1;
// Computer turn, for solver
// This is confusing, should probably fix this
let solverTurn = firstTurn == 0 ? 2 : 1;
// Solver
let solver = new Solver(solverTurn);

// Tictactoe grid
const tttBoard = document.getElementById('board');
// Tictactoe buttons
const tttButtons = tttBoard.children;

// Reset button
const resetButton = document.getElementById('reset');

// Computer turn select button
const computerTurnButton = document.getElementById('computer-turn');

// Player turn select button
const playerTurnButton = document.getElementById('player-turn');

/*
Setting computer turn button onclick
By default, this button is active
When we click this button, we want to set turn one to the computer
We then reset the board
*/
playerTurnButton.onclick = () => {
    // If already active, don't do anything
    if (firstTurn == 0) {
        return;
    }
    // Setting first turn to computer
    firstTurn = 0;
    solverTurn = firstTurn == 0 ? 2 : 1;
    // Making this button active
    playerTurnButton.children[0].classList.add("active");
    // Removing active from class list in other button
    computerTurnButton.children[0].classList.remove("active");
    // Resetting board
    reset();
}

/*
Setting player turn button onclick
By default, this button is active
When we click this button, we want to set turn one to the player
We then reset the board
*/
computerTurnButton.onclick = () => {
    // If already active, don't do anything
    if (firstTurn == 1) {
        return;
    }
    // Setting first turn to computer
    firstTurn = 1;
    solverTurn = firstTurn == 0 ? 2 : 1;
    // Making this button active
    computerTurnButton.children[0].classList.add("active");
    // Removing active from class list in other button
    playerTurnButton.children[0].classList.remove("active");
    // Resetting board
    reset();
}

/*
Setting reset button onclick
We want to reset the whole board and play computer move if it's their turn
*/
resetButton.onclick = reset;

// If the computer goes first, do the move
if (firstTurn == 1) {
    // Doing move!
    computerMove(board, solver);
}

// onclick for all buttons
for (let button of tttButtons) {
    button.onclick = () => {
        // Current turn
        let turn = board.numMoves % board.players.length;
        // Button row
        const row = parseInt(button.id[1]);
        // Button column
        const col = parseInt(button.id[3]);
        // Try to play move on the board
        if (turn == firstTurn && !gameEnd(board) && board.move(row, col)) {
            // Set button text
            button.textContent = turn == 0 ? "X" : "O";
            // Doing computer move
            computerMove(board, solver);
        }
    }
}

/*
Calculates and does computer move on board
Only makes a move if the game isn't over
Updates tictactoe buttons
*/
function computerMove(board, solver) {
    // If the game is over, stop
    if (gameEnd(board)) {
        return;
    }
    // Getting turn
    const turn = board.numMoves % board.players.length;
    // Calculate computer move
    const computerMove = solver.nextMove(board);
    // Making move on board
    board.move(computerMove[0], computerMove[1]);
    // Updating buttons
    const moveId = "_" + computerMove[0] + "-" + computerMove[1];
    const targetButton = document.getElementById(moveId);
    targetButton.textContent = turn == 0 ? "X" : "O";
}

// Checks if the game is over, returns a boolean
function gameEnd(board) {
    return board.isFilled() || board.isWin(1) || board.isWin(2);
}

// Resets the board
function reset() {
    // Removing all content from tictactoe buttons
    for (let button of tttButtons) {
        button.textContent = "";
    }
    // Making a new board
    board = new Board;
    // Making a new solver
    solver = new Solver(solverTurn);
    // If it's the computer to go first, do it
    if (firstTurn == 1) {
        computerMove(board, solver);
    }
}