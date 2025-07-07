class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        this.isAIMode = true;
        this.isAITurn = false;
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        this.initializeGame();
    }

    initializeGame() {
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerText = document.getElementById('currentPlayerText');
        this.gameStatus = document.getElementById('gameStatus');
        this.resetBtn = document.getElementById('resetBtn');
        this.resetScoreBtn = document.getElementById('resetScoreBtn');
        this.modeBtn = document.getElementById('modeBtn');
        this.musicBtn = document.getElementById('musicBtn');
        this.backgroundMusic = document.getElementById('backgroundMusic');
        this.winnerModal = document.getElementById('winnerModal');
        this.winnerText = document.getElementById('winnerText');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        this.scoreX = document.getElementById('scoreX');
        this.scoreO = document.getElementById('scoreO');

        this.isMusicPlaying = false;
        this.setupBackgroundMusic();
        this.addEventListeners();
        this.updateDisplay();
    }

    addEventListeners() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
            cell.addEventListener('mouseenter', () => {
                if (!cell.classList.contains('disabled') && this.gameActive) {
                    audioManager.playHoverSound();
                }
            });
        });

        this.resetBtn.addEventListener('click', () => {
            audioManager.playClickSound();
            this.resetGame();
        });
        this.resetScoreBtn.addEventListener('click', () => {
            audioManager.playClickSound();
            this.resetScore();
        });
        this.modeBtn.addEventListener('click', () => {
            audioManager.playClickSound();
            this.toggleGameMode();
        });
        this.musicBtn.addEventListener('click', () => {
            audioManager.playClickSound();
            this.toggleBackgroundMusic();
        });
        this.playAgainBtn.addEventListener('click', () => {
            audioManager.playClickSound();
            this.playAgain();
        });
        
        // Close modal when clicking outside
        this.winnerModal.addEventListener('click', (e) => {
            if (e.target === this.winnerModal) {
                this.hideModal();
            }
        });
    }

    handleCellClick(e) {
        const cell = e.target;
        const index = parseInt(cell.dataset.index);

        if (this.board[index] !== '' || !this.gameActive || this.isAITurn) {
            return;
        }

        this.makeMove(index, cell);
        
        // AI turn after human move
        if (this.isAIMode && this.gameActive && this.currentPlayer === 'O') {
            this.isAITurn = true;
            this.currentPlayerText.textContent = "AI is thinking...";
            setTimeout(() => {
                this.makeAIMove();
            }, 800); // Add delay to make AI seem more human-like
        }
    }

    makeMove(index, cell) {
        this.board[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        cell.classList.add('disabled');
        
        // Play move sound
        audioManager.playMoveSound();

        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
    }

    makeAIMove() {
        if (!this.gameActive) return;

        const bestMove = this.minimax(this.board, 0, true);
        const cell = this.cells[bestMove.index];
        
        this.makeMove(bestMove.index, cell);
        this.isAITurn = false;
    }

    // Minimax algorithm for AI
    minimax(board, depth, isMaximizing) {
        const winner = this.evaluateBoard(board);
        
        if (winner === 'O') return { score: 10 - depth };
        if (winner === 'X') return { score: depth - 10 };
        if (this.isBoardFull(board)) return { score: 0 };

        if (isMaximizing) {
            let bestScore = -Infinity;
            let bestMove = null;
            
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    const score = this.minimax(board, depth + 1, false);
                    board[i] = '';
                    
                    if (score.score > bestScore) {
                        bestScore = score.score;
                        bestMove = i;
                    }
                }
            }
            return { score: bestScore, index: bestMove };
        } else {
            let bestScore = Infinity;
            let bestMove = null;
            
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    const score = this.minimax(board, depth + 1, true);
                    board[i] = '';
                    
                    if (score.score < bestScore) {
                        bestScore = score.score;
                        bestMove = i;
                    }
                }
            }
            return { score: bestScore, index: bestMove };
        }
    }

    evaluateBoard(board) {
        for (let condition of this.winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    isBoardFull(board) {
        return board.every(cell => cell !== '');
    }

    checkWin() {
        return this.winningConditions.some(condition => {
            const [a, b, c] = condition;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winningCombination = condition;
                return true;
            }
            return false;
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    handleWin() {
        this.gameActive = false;
        this.isAITurn = false;
        this.scores[this.currentPlayer]++;
        this.updateScoreDisplay();
        this.highlightWinningCells();
        
        // Play win/lose sound
        if (this.isAIMode) {
            if (this.currentPlayer === 'X') {
                audioManager.playWinSound();
            } else {
                audioManager.playLoseSound();
            }
        } else {
            audioManager.playWinSound();
        }
        
        const winnerMessage = this.isAIMode ? 
            (this.currentPlayer === 'X' ? 'You Win! 🎉' : 'AI Wins! 🤖') :
            `Player ${this.currentPlayer} Wins! 🎉`;
        
        setTimeout(() => {
            this.showWinnerModal(winnerMessage);
        }, 500);
    }

    handleDraw() {
        this.gameActive = false;
        this.isAITurn = false;
        this.gameStatus.textContent = "It's a draw!";
        this.currentPlayerText.textContent = "Game Over";
        
        // Play draw sound
        audioManager.playDrawSound();
        
        setTimeout(() => {
            this.showWinnerModal("It's a Draw! 🤝");
        }, 500);
    }

    highlightWinningCells() {
        this.winningCombination.forEach(index => {
            this.cells[index].classList.add('winning');
        });
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateDisplay();
    }

    updateDisplay() {
        if (this.gameActive) {
            if (this.isAIMode) {
                this.currentPlayerText.textContent = this.currentPlayer === 'X' ? 
                    "Your Turn" : "AI's Turn";
            } else {
                this.currentPlayerText.textContent = `Player ${this.currentPlayer}'s Turn`;
            }
            this.gameStatus.textContent = '';
        }
    }

    updateScoreDisplay() {
        this.scoreX.textContent = this.scores.X;
        this.scoreO.textContent = this.scores.O;
    }

    toggleGameMode() {
        this.isAIMode = !this.isAIMode;
        this.modeBtn.textContent = this.isAIMode ? 'Playing vs AI' : 'Playing vs Human';
        
        // Update score labels
        const playerOLabel = document.querySelector('.score-item:nth-child(2) .player-label');
        playerOLabel.textContent = this.isAIMode ? 'AI (O)' : 'Player O';
        
        this.resetGame();
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.isAITurn = false;
        this.winningCombination = null;

        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'disabled', 'winning');
        });

        this.updateDisplay();
        this.hideModal();
    }

    resetScore() {
        this.scores = { X: 0, O: 0 };
        this.updateScoreDisplay();
    }

    playAgain() {
        this.resetGame();
    }

    showWinnerModal(message) {
        this.winnerText.textContent = message;
        this.winnerModal.classList.add('show');
        
        // Add celebration animation
        this.addCelebrationEffects();
    }

    hideModal() {
        this.winnerModal.classList.remove('show');
    }

    addCelebrationEffects() {
        // Add some extra visual flair for wins
        if (this.currentPlayer && this.gameActive === false) {
            document.body.style.animation = 'none';
            setTimeout(() => {
                document.body.style.animation = 'celebrationPulse 0.5s ease-in-out';
            }, 10);
        }
    }

    setupBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.volume = 0.3; // Set volume to 30%
            this.backgroundMusic.addEventListener('ended', () => {
                // Auto-restart if music ends (backup for loop)
                if (this.isMusicPlaying) {
                    this.backgroundMusic.currentTime = 0;
                    this.backgroundMusic.play();
                }
            });
        }
    }

    toggleBackgroundMusic() {
        if (!this.backgroundMusic) return;

        if (this.isMusicPlaying) {
            this.backgroundMusic.pause();
            this.musicBtn.classList.add('muted');
            this.isMusicPlaying = false;
        } else {
            // Handle autoplay restrictions
            this.backgroundMusic.play().then(() => {
                this.musicBtn.classList.remove('muted');
                this.isMusicPlaying = true;
            }).catch(error => {
                console.log('Autoplay prevented:', error);
                // Show a message to user that they need to click to enable music
                this.musicBtn.textContent = 'Click to Enable Music';
                this.musicBtn.style.fontSize = '0.8rem';
            });
        }
    }
}

// Enable music after first user interaction (to handle autoplay restrictions)
document.addEventListener('click', function enableMusicOnFirstClick() {
    const game = window.ticTacToeGame;
    if (game && game.backgroundMusic && !game.isMusicPlaying) {
        // Don't auto-start music, just prepare it
        game.backgroundMusic.load();
    }
    // Remove this listener after first click
    document.removeEventListener('click', enableMusicOnFirstClick);
}, { once: true });

// Add celebration animation to body
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrationPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.ticTacToeGame = new TicTacToe();
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        const cell = document.querySelector(`[data-index="${index}"]`);
        if (cell && !cell.classList.contains('disabled')) {
            cell.click();
        }
    }
    
    if (e.key === 'r' || e.key === 'R') {
        document.getElementById('resetBtn').click();
    }
});

// Add sound effects (optional - requires audio files)
class SoundManager {
    constructor() {
        this.sounds = {
            move: this.createBeep(800, 0.1),
            win: this.createBeep(1200, 0.3),
            draw: this.createBeep(600, 0.2)
        };
    }

    createBeep(frequency, duration) {
        return () => {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
            } catch (e) {
                // Silently fail if audio context is not available
            }
        };
    }

    play(sound) {
        if (this.sounds[sound]) {
            this.sounds[sound]();
        }
    }
}

// Add sound manager to the game
const soundManager = new SoundManager();

// Enhance the original game with sound effects
document.addEventListener('DOMContentLoaded', () => {
    const originalMakeMove = TicTacToe.prototype.makeMove;
    TicTacToe.prototype.makeMove = function(index, cell) {
        soundManager.play('move');
        originalMakeMove.call(this, index, cell);
    };

    const originalHandleWin = TicTacToe.prototype.handleWin;
    TicTacToe.prototype.handleWin = function() {
        soundManager.play('win');
        originalHandleWin.call(this);
    };

    const originalHandleDraw = TicTacToe.prototype.handleDraw;
    TicTacToe.prototype.handleDraw = function() {
        soundManager.play('draw');
        originalHandleDraw.call(this);
    };
});
