// Select all cells and the reset button
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');

// Initialize game variables
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isGameActive = true;

// Define winning conditions
const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Function to handle cell clicks
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  // Check if cell is already clicked or game is inactive
  if (gameState[index] || !isGameActive) return;

  // Update game state and UI
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check for a win
  if (checkWinner()) {
    setTimeout(() => alert(`Player ${currentPlayer} wins!`), 100);
    isGameActive = false;
    return;
  }

  // Check for a draw
  if (!gameState.includes(null)) {
    setTimeout(() => alert("It's a draw!"), 100);
    isGameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to check for a winner
function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

// Function to reset the game
function resetGame() {
  gameState = Array(9).fill(null);
  isGameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => cell.textContent = '');
}

// Add event listeners to cells and reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
