
const cells = document.querySelectorAll('.cell');
const board = document.querySelector('.board');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let gameActive = true;

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkForWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkForWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            alert(`${gameBoard[a]} wins!`);
            gameActive = false;
            return;
        }
    }

    if (!gameBoard.includes(null)) {
        alert('It\'s a draw!');
        gameActive = false;
    }
}

function resetGame() {
    gameBoard = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
