class RockPaperScissors {
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.currentRound = 1;
        this.gameHistory = [];
        this.stats = {
            wins: 0,
            draws: 0,
            losses: 0
        };
        
        this.choices = {
            rock: { name: 'Piedra', icon: 'fas fa-hand-rock', beats: 'scissors' },
            paper: { name: 'Papel', icon: 'fas fa-hand-paper', beats: 'rock' },
            scissors: { name: 'Tijera', icon: 'fas fa-hand-scissors', beats: 'paper' }
        };
        
        this.elements = {
            playerScore: document.getElementById('playerScore'),
            computerScore: document.getElementById('computerScore'),
            roundNumber: document.getElementById('roundNumber'),
            resultDisplay: document.getElementById('resultDisplay'),
            playerChoice: document.getElementById('playerChoice'),
            computerChoice: document.getElementById('computerChoice'),
            computerThinking: document.getElementById('computerThinking'),
            historyList: document.getElementById('historyList'),
            winsCount: document.getElementById('winsCount'),
            drawsCount: document.getElementById('drawsCount'),
            lossesCount: document.getElementById('lossesCount'),
            rulesModal: document.getElementById('rulesModal'),
            rulesBtn: document.getElementById('rulesBtn'),
            closeRulesBtn: document.getElementById('closeRulesBtn'),
            newGameBtn: document.getElementById('newGameBtn'),
            resetBtn: document.getElementById('resetBtn')
        };
        
        this.loadStats();
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateDisplay();
        this.renderHistory();
    }
    
    bindEvents() {
        // Choice buttons
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const choice = e.currentTarget.dataset.choice;
                this.makeChoice(choice);
            });
        });
        
        // Game controls
        this.elements.newGameBtn.addEventListener('click', () => {
            this.newGame();
        });
        
        this.elements.resetBtn.addEventListener('click', () => {
            this.resetGame();
        });
        
        // Rules modal
        this.elements.rulesBtn.addEventListener('click', () => {
            this.showRules();
        });
        
        this.elements.closeRulesBtn.addEventListener('click', () => {
            this.hideRules();
        });
        
        // Close modal on outside click
        this.elements.rulesModal.addEventListener('click', (e) => {
            if (e.target === this.elements.rulesModal) {
                this.hideRules();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch(e.key.toLowerCase()) {
                case 'r':
                    this.makeChoice('rock');
                    break;
                case 'p':
                    this.makeChoice('paper');
                    break;
                case 's':
                    this.makeChoice('scissors');
                    break;
                case 'escape':
                    this.hideRules();
                    break;
            }
        });
    }
    
    makeChoice(playerChoice) {
        if (this.isGameOver()) return;
        
        // Show player choice
        this.showPlayerChoice(playerChoice);
        
        // Show computer thinking
        this.showComputerThinking();
        
        // Simulate computer thinking delay
        setTimeout(() => {
            const computerChoice = this.getComputerChoice();
            this.showComputerChoice(computerChoice);
            
            // Determine winner
            const result = this.determineWinner(playerChoice, computerChoice);
            this.updateScore(result);
            this.addToHistory(playerChoice, computerChoice, result);
            
            // Update display
            this.updateDisplay();
            this.renderHistory();
            
            // Check if game is over
            if (this.isGameOver()) {
                this.showGameOver();
            } else {
                this.currentRound++;
                this.updateDisplay();
            }
            
            // Reset choices after delay
            setTimeout(() => {
                this.resetChoices();
            }, 2000);
            
        }, 1000);
    }
    
    showPlayerChoice(choice) {
        const choiceBtn = document.querySelector(`[data-choice="${choice}"]`);
        choiceBtn.classList.add('selected');
        
        this.elements.playerChoice.innerHTML = `<i class="${this.choices[choice].icon}"></i>`;
        this.elements.playerChoice.classList.add('active');
    }
    
    showComputerThinking() {
        this.elements.computerThinking.style.display = 'block';
        this.elements.computerChoice.innerHTML = '<i class="fas fa-question"></i>';
        this.elements.computerChoice.classList.remove('active');
    }
    
    showComputerChoice(choice) {
        this.elements.computerThinking.style.display = 'none';
        this.elements.computerChoice.innerHTML = `<i class="${this.choices[choice].icon}"></i>`;
        this.elements.computerChoice.classList.add('active');
    }
    
    getComputerChoice() {
        const choices = Object.keys(this.choices);
        return choices[Math.floor(Math.random() * choices.length)];
    }
    
    determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'draw';
        }
        
        if (this.choices[playerChoice].beats === computerChoice) {
            return 'win';
        } else {
            return 'lose';
        }
    }
    
    updateScore(result) {
        switch(result) {
            case 'win':
                this.playerScore++;
                this.stats.wins++;
                this.elements.resultDisplay.innerHTML = '<span class="result-text" style="color: #27ae60;">¡Ganaste esta ronda!</span>';
                break;
            case 'lose':
                this.computerScore++;
                this.stats.losses++;
                this.elements.resultDisplay.innerHTML = '<span class="result-text" style="color: #e74c3c;">Perdiste esta ronda</span>';
                break;
            case 'draw':
                this.stats.draws++;
                this.elements.resultDisplay.innerHTML = '<span class="result-text" style="color: #f39c12;">¡Empate!</span>';
                break;
        }
    }
    
    addToHistory(playerChoice, computerChoice, result) {
        const historyItem = {
            round: this.currentRound,
            playerChoice: this.choices[playerChoice].name,
            computerChoice: this.choices[computerChoice].name,
            result: result,
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.gameHistory.unshift(historyItem);
        
        // Keep only last 10 games
        if (this.gameHistory.length > 10) {
            this.gameHistory = this.gameHistory.slice(0, 10);
        }
    }
    
    renderHistory() {
        this.elements.historyList.innerHTML = '';
        
        if (this.gameHistory.length === 0) {
            this.elements.historyList.innerHTML = '<p style="text-align: center; color: #7f8c8d;">No hay partidas registradas</p>';
            return;
        }
        
        this.gameHistory.forEach(item => {
            const historyElement = document.createElement('div');
            historyElement.className = `history-item ${item.result}`;
            
            const resultIcon = {
                win: '🏆',
                lose: '💀',
                draw: '🤝'
            };
            
            historyElement.innerHTML = `
                <div>
                    <strong>Ronda ${item.round}</strong>
                    <br>
                    <small>${item.playerChoice} vs ${item.computerChoice}</small>
                </div>
                <div style="text-align: right;">
                    <span style="font-size: 1.2rem;">${resultIcon[item.result]}</span>
                    <br>
                    <small>${item.timestamp}</small>
                </div>
            `;
            
            this.elements.historyList.appendChild(historyElement);
        });
    }
    
    updateDisplay() {
        this.elements.playerScore.textContent = this.playerScore;
        this.elements.computerScore.textContent = this.computerScore;
        this.elements.roundNumber.textContent = this.currentRound;
        this.elements.winsCount.textContent = this.stats.wins;
        this.elements.drawsCount.textContent = this.stats.draws;
        this.elements.lossesCount.textContent = this.stats.losses;
    }
    
    resetChoices() {
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        this.elements.playerChoice.innerHTML = '<i class="fas fa-question"></i>';
        this.elements.playerChoice.classList.remove('active');
        this.elements.computerChoice.innerHTML = '<i class="fas fa-question"></i>';
        this.elements.computerChoice.classList.remove('active');
        
        this.elements.resultDisplay.innerHTML = '<span class="result-text">¡Elige tu jugada!</span>';
    }
    
    isGameOver() {
        return this.playerScore >= 3 || this.computerScore >= 3;
    }
    
    showGameOver() {
        const winner = this.playerScore >= 3 ? '¡Ganaste la partida!' : '¡Perdiste la partida!';
        const color = this.playerScore >= 3 ? '#27ae60' : '#e74c3c';
        
        this.elements.resultDisplay.innerHTML = `<span class="result-text" style="color: ${color}; font-size: 1.5rem;">${winner}</span>`;
    }
    
    newGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.currentRound = 1;
        this.gameHistory = [];
        this.resetChoices();
        this.updateDisplay();
        this.renderHistory();
    }
    
    resetGame() {
        if (confirm('¿Estás seguro de que quieres reiniciar todas las estadísticas?')) {
            this.newGame();
            this.stats = { wins: 0, draws: 0, losses: 0 };
            this.saveStats();
            this.updateDisplay();
        }
    }
    
    showRules() {
        this.elements.rulesModal.classList.add('show');
    }
    
    hideRules() {
        this.elements.rulesModal.classList.remove('show');
    }
    
    saveStats() {
        localStorage.setItem('rps-stats', JSON.stringify(this.stats));
    }
    
    loadStats() {
        const savedStats = localStorage.getItem('rps-stats');
        if (savedStats) {
            this.stats = JSON.parse(savedStats);
        }
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RockPaperScissors();
}); 