let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameOver = false;
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const resetButton = document.getElementById('reset');
const gameOverModal = document.getElementById('gameOverModal');
const finalScore = document.getElementById('finalScore');
const finalHighScore = document.getElementById('finalHighScore');
const playAgainButton = document.getElementById('playAgain');

// Initialize high score display
highScoreDisplay.textContent = highScore;

// Start game with balloon creation
startGame();

function startGame() {
    gameOver = false;
    score = 0;
    scoreDisplay.textContent = score;
    gameContainer.innerHTML = ''; // Clear balloons

    // Generate balloons every second
    const balloonInterval = setInterval(() => {
        if (!gameOver) {
            createBalloon(balloonInterval);
        }
    }, 1000);

    // Reset game
    resetButton.addEventListener('click', function() {
        resetGame(balloonInterval);
    });

    playAgainButton.addEventListener('click', function() {
        resetGame(balloonInterval);
        closeGameOverModal();
    });
}

function createBalloon(balloonInterval) {
    if (gameOver) return;

    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    
    // Randomize balloon color and position
    balloon.style.backgroundColor = getRandomColor();
    balloon.style.left = Math.random() * (window.innerWidth - 50) + 'px';
    
    // Add the balloon to the game container
    gameContainer.appendChild(balloon);

    // Pop the balloon when clicked
    balloon.addEventListener('click', function() {
        popBalloon(balloon);
    });

    // Remove balloon if it goes out of bounds and end game
    setTimeout(function() {
        if (balloon.parentElement && !gameOver) {
            endGame(balloonInterval);
        }
    }, 5000); // Balloon disappears after animation duration (5 seconds)
}

function popBalloon(balloon) {
    score++;
    scoreDisplay.textContent = score;
    balloon.remove(); // Remove balloon from the game
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function resetGame(balloonInterval) {
    gameOver = false;
    score = 0;
    scoreDisplay.textContent = score;
    gameContainer.innerHTML = ''; // Clear all balloons
    closeGameOverModal(); // Close modal if open

    clearInterval(balloonInterval);
    startGame();
}

function endGame(balloonInterval) {
    gameOver = true;
    clearInterval(balloonInterval);

    // Update high score if needed
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = highScore;
    }

    // Show game over modal
    finalScore.textContent = score;
    finalHighScore.textContent = highScore;
    gameOverModal.style.display = 'block';
}

function closeGameOverModal() {
    gameOverModal.style.display = 'none';
}
