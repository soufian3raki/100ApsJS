class HangmanGame {
    constructor() {
        this.currentWord = '';
        this.guessedLetters = new Set();
        this.lives = 6;
        this.score = 0;
        this.currentCategory = 'general';
        this.stats = {
            wins: 0,
            losses: 0,
            wordsPlayed: 0
        };
        
        this.categories = {
            general: {
                name: 'General',
                words: [
                    { word: 'JAVASCRIPT', hint: 'Lenguaje de programación web' },
                    { word: 'HTML', hint: 'Lenguaje de marcado' },
                    { word: 'CSS', hint: 'Lenguaje de estilos' },
                    { word: 'PYTHON', hint: 'Lenguaje de programación' },
                    { word: 'REACT', hint: 'Biblioteca de JavaScript' },
                    { word: 'NODEJS', hint: 'Runtime de JavaScript' },
                    { word: 'DATABASE', hint: 'Base de datos' },
                    { word: 'ALGORITHM', hint: 'Secuencia de pasos' },
                    { word: 'FUNCTION', hint: 'Bloque de código reutilizable' },
                    { word: 'VARIABLE', hint: 'Contenedor de datos' }
                ]
            },
            animals: {
                name: 'Animales',
                words: [
                    { word: 'ELEFANTE', hint: 'Mamífero de gran tamaño' },
                    { word: 'LEON', hint: 'Rey de la selva' },
                    { word: 'TIGRE', hint: 'Felino rayado' },
                    { word: 'OSO', hint: 'Mamífero plantígrado' },
                    { word: 'DELFIN', hint: 'Mamífero acuático inteligente' },
                    { word: 'JIRAFA', hint: 'Animal de cuello largo' },
                    { word: 'CANGURO', hint: 'Marsupial saltador' },
                    { word: 'PINGUINO', hint: 'Ave no voladora' },
                    { word: 'COCODRILO', hint: 'Reptil acuático' },
                    { word: 'RINOCERONTE', hint: 'Mamífero con cuerno' }
                ]
            },
            countries: {
                name: 'Países',
                words: [
                    { word: 'ESPAÑA', hint: 'País de la península ibérica' },
                    { word: 'FRANCIA', hint: 'País de la torre Eiffel' },
                    { word: 'ITALIA', hint: 'País de la pizza' },
                    { word: 'ALEMANIA', hint: 'País de la cerveza' },
                    { word: 'PORTUGAL', hint: 'País vecino de España' },
                    { word: 'HOLANDA', hint: 'País de los tulipanes' },
                    { word: 'BELGICA', hint: 'País del chocolate' },
                    { word: 'SUIZA', hint: 'País de los relojes' },
                    { word: 'AUSTRIA', hint: 'País de Mozart' },
                    { word: 'GRECIA', hint: 'País de la Acrópolis' }
                ]
            },
            sports: {
                name: 'Deportes',
                words: [
                    { word: 'FUTBOL', hint: 'Deporte con balón' },
                    { word: 'BALONCESTO', hint: 'Deporte con canasta' },
                    { word: 'TENIS', hint: 'Deporte con raqueta' },
                    { word: 'NATACION', hint: 'Deporte acuático' },
                    { word: 'CICLISMO', hint: 'Deporte con bicicleta' },
                    { word: 'ATLETISMO', hint: 'Deporte de pista' },
                    { word: 'VOLEIBOL', hint: 'Deporte con red' },
                    { word: 'BOXEO', hint: 'Deporte de combate' },
                    { word: 'GOLF', hint: 'Deporte con palos' },
                    { word: 'SKI', hint: 'Deporte de nieve' }
                ]
            }
        };
        
        this.wordHistory = [];
        
        this.elements = {
            categoryName: document.getElementById('categoryName'),
            livesCount: document.getElementById('livesCount'),
            scoreValue: document.getElementById('scoreValue'),
            wordContainer: document.getElementById('wordContainer'),
            statusMessage: document.getElementById('statusMessage'),
            hintDisplay: document.getElementById('hintDisplay'),
            keyboard: document.getElementById('keyboard'),
            winsCount: document.getElementById('winsCount'),
            lossesCount: document.getElementById('lossesCount'),
            wordsCount: document.getElementById('wordsCount'),
            historyList: document.getElementById('historyList'),
            gameOverModal: document.getElementById('gameOverModal'),
            modalTitle: document.getElementById('modalTitle'),
            modalResult: document.getElementById('modalResult'),
            wordReveal: document.getElementById('wordReveal'),
            scoreUpdate: document.getElementById('scoreUpdate'),
            categoryModal: document.getElementById('categoryModal'),
            categoryGrid: document.getElementById('categoryGrid'),
            categoryBtn: document.getElementById('categoryBtn'),
            closeCategoryBtn: document.getElementById('closeCategoryBtn'),
            newGameBtn: document.getElementById('newGameBtn'),
            hintBtn: document.getElementById('hintBtn'),
            resetBtn: document.getElementById('resetBtn'),
            playAgainBtn: document.getElementById('playAgainBtn'),
            closeModalBtn: document.getElementById('closeModalBtn'),
            closeModalBtn2: document.getElementById('closeModalBtn2')
        };
        
        this.canvas = document.getElementById('hangmanCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.loadStats();
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.generateKeyboard();
        this.newGame();
        this.renderHistory();
    }
    
    bindEvents() {
        // Game controls
        this.elements.newGameBtn.addEventListener('click', () => {
            this.newGame();
        });
        
        this.elements.hintBtn.addEventListener('click', () => {
            this.showHint();
        });
        
        this.elements.resetBtn.addEventListener('click', () => {
            this.resetGame();
        });
        
        // Modal controls
        this.elements.playAgainBtn.addEventListener('click', () => {
            this.hideGameOverModal();
            this.newGame();
        });
        
        this.elements.closeModalBtn.addEventListener('click', () => {
            this.hideGameOverModal();
        });
        
        this.elements.closeModalBtn2.addEventListener('click', () => {
            this.hideGameOverModal();
        });
        
        this.elements.closeCategoryBtn.addEventListener('click', () => {
            this.hideCategoryModal();
        });
        
        this.elements.categoryBtn.addEventListener('click', () => {
            this.showCategoryModal();
        });
        
        // Close modals on outside click
        this.elements.gameOverModal.addEventListener('click', (e) => {
            if (e.target === this.elements.gameOverModal) {
                this.hideGameOverModal();
            }
        });
        
        this.elements.categoryModal.addEventListener('click', (e) => {
            if (e.target === this.elements.categoryModal) {
                this.hideCategoryModal();
            }
        });
        
        // Keyboard input
        document.addEventListener('keydown', (e) => {
            const key = e.key.toUpperCase();
            if (/^[A-Z]$/.test(key)) {
                this.makeGuess(key);
            }
        });
    }
    
    generateKeyboard() {
        const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
        this.elements.keyboard.innerHTML = '';
        
        letters.forEach(letter => {
            const key = document.createElement('div');
            key.className = 'key';
            key.textContent = letter;
            key.dataset.letter = letter;
            
            key.addEventListener('click', () => {
                this.makeGuess(letter);
            });
            
            this.elements.keyboard.appendChild(key);
        });
    }
    
    newGame() {
        this.lives = 6;
        this.guessedLetters.clear();
        this.currentWord = this.getRandomWord();
        this.updateDisplay();
        this.drawHangman();
        this.renderWord();
        this.updateKeyboard();
    }
    
    getRandomWord() {
        const category = this.categories[this.currentCategory];
        const randomIndex = Math.floor(Math.random() * category.words.length);
        return category.words[randomIndex];
    }
    
    makeGuess(letter) {
        if (this.guessedLetters.has(letter) || this.lives <= 0) return;
        
        this.guessedLetters.add(letter);
        
        if (!this.currentWord.word.includes(letter)) {
            this.lives--;
            this.elements.statusMessage.textContent = `¡Incorrecto! La letra "${letter}" no está en la palabra.`;
        } else {
            this.elements.statusMessage.textContent = `¡Correcto! La letra "${letter}" está en la palabra.`;
        }
        
        this.updateDisplay();
        this.renderWord();
        this.updateKeyboard();
        this.drawHangman();
        
        if (this.isGameWon()) {
            this.handleGameWon();
        } else if (this.lives <= 0) {
            this.handleGameLost();
        }
    }
    
    isGameWon() {
        return this.currentWord.word.split('').every(letter => 
            this.guessedLetters.has(letter) || letter === ' '
        );
    }
    
    handleGameWon() {
        this.score += this.lives * 10;
        this.stats.wins++;
        this.stats.wordsPlayed++;
        this.addToHistory(true);
        this.saveStats();
        this.showGameOverModal(true);
    }
    
    handleGameLost() {
        this.stats.losses++;
        this.stats.wordsPlayed++;
        this.addToHistory(false);
        this.saveStats();
        this.showGameOverModal(false);
    }
    
    showGameOverModal(won) {
        this.elements.modalTitle.textContent = won ? '¡Felicidades!' : '¡Game Over!';
        this.elements.modalResult.textContent = won ? '¡Ganaste!' : '¡Perdiste!';
        this.elements.modalResult.style.color = won ? '#27ae60' : '#e74c3c';
        this.elements.wordReveal.textContent = `La palabra era: ${this.currentWord.word}`;
        this.elements.scoreUpdate.textContent = `Puntuación: ${this.score}`;
        this.elements.gameOverModal.classList.add('show');
    }
    
    hideGameOverModal() {
        this.elements.gameOverModal.classList.remove('show');
    }
    
    showCategoryModal() {
        this.renderCategories();
        this.elements.categoryModal.classList.add('show');
    }
    
    hideCategoryModal() {
        this.elements.categoryModal.classList.remove('show');
    }
    
    renderCategories() {
        this.elements.categoryGrid.innerHTML = '';
        
        Object.keys(this.categories).forEach(categoryKey => {
            const category = this.categories[categoryKey];
            const categoryItem = document.createElement('div');
            categoryItem.className = 'category-item';
            categoryItem.classList.toggle('selected', categoryKey === this.currentCategory);
            categoryItem.textContent = category.name;
            
            categoryItem.addEventListener('click', () => {
                this.currentCategory = categoryKey;
                this.elements.categoryName.textContent = category.name;
                this.hideCategoryModal();
                this.newGame();
            });
            
            this.elements.categoryGrid.appendChild(categoryItem);
        });
    }
    
    renderWord() {
        this.elements.wordContainer.innerHTML = '';
        
        this.currentWord.word.split('').forEach(letter => {
            const letterBox = document.createElement('div');
            letterBox.className = 'letter-box';
            
            if (letter === ' ') {
                letterBox.classList.add('space');
            } else if (this.guessedLetters.has(letter)) {
                letterBox.classList.add('revealed');
                letterBox.textContent = letter;
            } else {
                letterBox.textContent = '_';
            }
            
            this.elements.wordContainer.appendChild(letterBox);
        });
    }
    
    updateKeyboard() {
        document.querySelectorAll('.key').forEach(key => {
            const letter = key.dataset.letter;
            key.classList.remove('used', 'correct', 'incorrect');
            
            if (this.guessedLetters.has(letter)) {
                if (this.currentWord.word.includes(letter)) {
                    key.classList.add('correct');
                } else {
                    key.classList.add('incorrect');
                }
            }
        });
    }
    
    updateDisplay() {
        this.elements.livesCount.textContent = this.lives;
        this.elements.scoreValue.textContent = this.score;
        this.elements.winsCount.textContent = this.stats.wins;
        this.elements.lossesCount.textContent = this.stats.losses;
        this.elements.wordsCount.textContent = this.stats.wordsPlayed;
    }
    
    showHint() {
        this.elements.hintDisplay.textContent = `Pista: ${this.currentWord.hint}`;
    }
    
    drawHangman() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 3;
        
        const lives = this.lives;
        
        // Base
        if (lives < 6) {
            this.ctx.beginPath();
            this.ctx.moveTo(50, 250);
            this.ctx.lineTo(250, 250);
            this.ctx.stroke();
        }
        
        // Vertical pole
        if (lives < 6) {
            this.ctx.beginPath();
            this.ctx.moveTo(100, 250);
            this.ctx.lineTo(100, 50);
            this.ctx.stroke();
        }
        
        // Top horizontal
        if (lives < 6) {
            this.ctx.beginPath();
            this.ctx.moveTo(100, 50);
            this.ctx.lineTo(200, 50);
            this.ctx.stroke();
        }
        
        // Rope
        if (lives < 6) {
            this.ctx.beginPath();
            this.ctx.moveTo(200, 50);
            this.ctx.lineTo(200, 80);
            this.ctx.stroke();
        }
        
        // Head
        if (lives < 5) {
            this.ctx.beginPath();
            this.ctx.arc(200, 100, 20, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
        
        // Body
        if (lives < 4) {
            this.ctx.beginPath();
            this.ctx.moveTo(200, 120);
            this.ctx.lineTo(200, 180);
            this.ctx.stroke();
        }
        
        // Left arm
        if (lives < 3) {
            this.ctx.beginPath();
            this.ctx.moveTo(200, 140);
            this.ctx.lineTo(170, 160);
            this.ctx.stroke();
        }
        
        // Right arm
        if (lives < 2) {
            this.ctx.beginPath();
            this.ctx.moveTo(200, 140);
            this.ctx.lineTo(230, 160);
            this.ctx.stroke();
        }
        
        // Left leg
        if (lives < 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(200, 180);
            this.ctx.lineTo(170, 220);
            this.ctx.stroke();
        }
        
        // Right leg
        if (lives < 0) {
            this.ctx.beginPath();
            this.ctx.moveTo(200, 180);
            this.ctx.lineTo(230, 220);
            this.ctx.stroke();
        }
    }
    
    addToHistory(won) {
        const historyItem = {
            word: this.currentWord.word,
            category: this.categories[this.currentCategory].name,
            result: won ? 'win' : 'lose',
            lives: this.lives,
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.wordHistory.unshift(historyItem);
        
        // Keep only last 10 games
        if (this.wordHistory.length > 10) {
            this.wordHistory = this.wordHistory.slice(0, 10);
        }
    }
    
    renderHistory() {
        this.elements.historyList.innerHTML = '';
        
        if (this.wordHistory.length === 0) {
            this.elements.historyList.innerHTML = '<p style="text-align: center; color: #7f8c8d;">No hay partidas registradas</p>';
            return;
        }
        
        this.wordHistory.forEach(item => {
            const historyElement = document.createElement('div');
            historyElement.className = `history-item ${item.result}`;
            
            const resultIcon = item.result === 'win' ? '🏆' : '💀';
            
            historyElement.innerHTML = `
                <div>
                    <strong>${item.word}</strong>
                    <br>
                    <small>${item.category} - ${item.lives} vidas</small>
                </div>
                <div style="text-align: right;">
                    <span style="font-size: 1.2rem;">${resultIcon}</span>
                    <br>
                    <small>${item.timestamp}</small>
                </div>
            `;
            
            this.elements.historyList.appendChild(historyElement);
        });
    }
    
    resetGame() {
        if (confirm('¿Estás seguro de que quieres reiniciar todas las estadísticas?')) {
            this.score = 0;
            this.stats = { wins: 0, losses: 0, wordsPlayed: 0 };
            this.wordHistory = [];
            this.saveStats();
            this.updateDisplay();
            this.renderHistory();
            this.newGame();
        }
    }
    
    saveStats() {
        localStorage.setItem('hangman-stats', JSON.stringify(this.stats));
        localStorage.setItem('hangman-score', this.score.toString());
    }
    
    loadStats() {
        const savedStats = localStorage.getItem('hangman-stats');
        if (savedStats) {
            this.stats = JSON.parse(savedStats);
        }
        
        const savedScore = localStorage.getItem('hangman-score');
        if (savedScore) {
            this.score = parseInt(savedScore);
        }
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HangmanGame();
}); 