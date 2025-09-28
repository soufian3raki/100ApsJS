class QuizGame {
  constructor() {
    this.questions = [];
    this.currentQuestion = 0;
    this.score = 0;
    this.timeLeft = 0;
    this.timer = null;
    this.quizStartTime = null;
    this.answers = [];
    this.leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadQuestions();
  }

  bindEvents() {
    document.getElementById('startQuiz').addEventListener('click', () => {
      this.startQuiz();
    });

    document.getElementById('skipQuestion').addEventListener('click', () => {
      this.skipQuestion();
    });

    document.getElementById('pauseQuiz').addEventListener('click', () => {
      this.pauseQuiz();
    });

    document.getElementById('quitQuiz').addEventListener('click', () => {
      this.quitQuiz();
    });

    document.getElementById('playAgain').addEventListener('click', () => {
      this.playAgain();
    });

    document.getElementById('viewLeaderboard').addEventListener('click', () => {
      this.viewLeaderboard();
    });

    document.getElementById('shareResults').addEventListener('click', () => {
      this.shareResults();
    });

    document.getElementById('backToResults').addEventListener('click', () => {
      this.backToResults();
    });

    document.getElementById('clearLeaderboard').addEventListener('click', () => {
      this.clearLeaderboard();
    });

    document.getElementById('leaderboardCategory').addEventListener('change', () => {
      this.filterLeaderboard();
    });

    document.getElementById('leaderboardDifficulty').addEventListener('change', () => {
      this.filterLeaderboard();
    });

    // Option buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('option-btn') && !e.target.disabled) {
        this.selectAnswer(parseInt(e.target.dataset.option));
      }
    });
  }

  loadQuestions() {
    this.questions = [
      // General
      {
        category: 'general',
        difficulty: 'easy',
        question: '¿Cuál es la capital de España?',
        options: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'],
        correct: 0,
        explanation: 'Madrid es la capital y ciudad más poblada de España.'
      },
      {
        category: 'general',
        difficulty: 'easy',
        question: '¿Cuántos días tiene un año bisiesto?',
        options: ['365', '366', '364', '367'],
        correct: 1,
        explanation: 'Un año bisiesto tiene 366 días, con un día extra en febrero.'
      },
      {
        category: 'general',
        difficulty: 'medium',
        question: '¿Cuál es el océano más grande del mundo?',
        options: ['Atlántico', 'Pacífico', 'Índico', 'Ártico'],
        correct: 1,
        explanation: 'El Océano Pacífico es el más grande, cubriendo más del 30% de la superficie terrestre.'
      },
      {
        category: 'general',
        difficulty: 'hard',
        question: '¿En qué año se fundó la ONU?',
        options: ['1944', '1945', '1946', '1947'],
        correct: 1,
        explanation: 'La Organización de las Naciones Unidas se fundó el 24 de octubre de 1945.'
      },
      // Ciencia
      {
        category: 'science',
        difficulty: 'easy',
        question: '¿Cuál es el símbolo químico del oro?',
        options: ['Go', 'Au', 'Ag', 'Or'],
        correct: 1,
        explanation: 'Au es el símbolo químico del oro, del latín "aurum".'
      },
      {
        category: 'science',
        difficulty: 'medium',
        question: '¿Cuál es la velocidad de la luz en el vacío?',
        options: ['300,000 km/s', '299,792,458 m/s', '3 × 10⁸ m/s', 'Todas las anteriores'],
        correct: 3,
        explanation: 'Todas son correctas, la velocidad de la luz es aproximadamente 300,000 km/s.'
      },
      {
        category: 'science',
        difficulty: 'hard',
        question: '¿Qué partícula subatómica tiene carga positiva?',
        options: ['Electrón', 'Protón', 'Neutrón', 'Fotón'],
        correct: 1,
        explanation: 'El protón tiene carga positiva, mientras que el electrón tiene carga negativa.'
      },
      // Historia
      {
        category: 'history',
        difficulty: 'easy',
        question: '¿En qué año llegó Colón a América?',
        options: ['1490', '1491', '1492', '1493'],
        correct: 2,
        explanation: 'Cristóbal Colón llegó a América el 12 de octubre de 1492.'
      },
      {
        category: 'history',
        difficulty: 'medium',
        question: '¿Quién escribió "El Quijote"?',
        options: ['Miguel de Cervantes', 'Federico García Lorca', 'Antonio Machado', 'Lope de Vega'],
        correct: 0,
        explanation: 'Miguel de Cervantes escribió "Don Quijote de la Mancha" en 1605.'
      },
      {
        category: 'history',
        difficulty: 'hard',
        question: '¿En qué siglo vivió Leonardo da Vinci?',
        options: ['XIV', 'XV', 'XVI', 'XVII'],
        correct: 1,
        explanation: 'Leonardo da Vinci vivió en el siglo XV (1452-1519).'
      },
      // Deportes
      {
        category: 'sports',
        difficulty: 'easy',
        question: '¿Cuántos jugadores tiene un equipo de fútbol en el campo?',
        options: ['10', '11', '12', '9'],
        correct: 1,
        explanation: 'Un equipo de fútbol tiene 11 jugadores en el campo (incluyendo el portero).'
      },
      {
        category: 'sports',
        difficulty: 'medium',
        question: '¿En qué deporte se usa una raqueta?',
        options: ['Fútbol', 'Tenis', 'Básquetbol', 'Voleibol'],
        correct: 1,
        explanation: 'El tenis se juega con raqueta, mientras que otros deportes usan diferentes implementos.'
      },
      {
        category: 'sports',
        difficulty: 'hard',
        question: '¿Cuántos sets se necesitan para ganar un partido de tenis masculino en Grand Slam?',
        options: ['2 de 3', '3 de 5', '2 de 5', '3 de 7'],
        correct: 1,
        explanation: 'En Grand Slam masculino se juega al mejor de 5 sets (3 de 5).'
      },
      // Geografía
      {
        category: 'geography',
        difficulty: 'easy',
        question: '¿Cuál es el río más largo del mundo?',
        options: ['Nilo', 'Amazonas', 'Misisipi', 'Yangtsé'],
        correct: 0,
        explanation: 'El río Nilo es el más largo del mundo con aproximadamente 6,650 km.'
      },
      {
        category: 'geography',
        difficulty: 'medium',
        question: '¿Cuál es el país más grande del mundo?',
        options: ['China', 'Estados Unidos', 'Rusia', 'Canadá'],
        correct: 2,
        explanation: 'Rusia es el país más grande del mundo con más de 17 millones de km².'
      },
      {
        category: 'geography',
        difficulty: 'hard',
        question: '¿Cuál es la montaña más alta del mundo?',
        options: ['K2', 'Everest', 'Kilimanjaro', 'Aconcagua'],
        correct: 1,
        explanation: 'El Monte Everest es la montaña más alta con 8,848 metros sobre el nivel del mar.'
      },
      // Entretenimiento
      {
        category: 'entertainment',
        difficulty: 'easy',
        question: '¿Quién interpretó a Harry Potter en las películas?',
        options: ['Daniel Radcliffe', 'Rupert Grint', 'Tom Felton', 'Emma Watson'],
        correct: 0,
        explanation: 'Daniel Radcliffe interpretó a Harry Potter en todas las películas de la saga.'
      },
      {
        category: 'entertainment',
        difficulty: 'medium',
        question: '¿En qué año se estrenó "Titanic"?',
        options: ['1996', '1997', '1998', '1999'],
        correct: 1,
        explanation: 'La película "Titanic" se estrenó en 1997 y fue dirigida por James Cameron.'
      },
      {
        category: 'entertainment',
        difficulty: 'hard',
        question: '¿Cuál es el nombre real de Lady Gaga?',
        options: ['Stefani Germanotta', 'Stefani Joanne Angelina Germanotta', 'Stefani Joanne Germanotta', 'Stefani Angelina Germanotta'],
        correct: 1,
        explanation: 'El nombre completo de Lady Gaga es Stefani Joanne Angelina Germanotta.'
      }
    ];
  }

  startQuiz() {
    const playerName = document.getElementById('playerName').value.trim();
    const difficulty = document.getElementById('difficulty').value;
    const category = document.getElementById('category').value;
    const questionCount = parseInt(document.getElementById('questionCount').value);
    const timeLimit = parseInt(document.getElementById('timeLimit').value);

    if (!playerName) {
      alert('Por favor ingresa tu nombre');
      return;
    }

    // Filter questions based on difficulty and category
    let filteredQuestions = this.questions.filter(q => 
      q.difficulty === difficulty && 
      (category === 'general' || q.category === category)
    );

    // Shuffle and select questions
    this.questions = this.shuffleArray(filteredQuestions).slice(0, questionCount);
    
    if (this.questions.length === 0) {
      alert('No hay preguntas disponibles para la configuración seleccionada');
      return;
    }

    this.currentQuestion = 0;
    this.score = 0;
    this.answers = [];
    this.quizStartTime = Date.now();
    this.timeLimit = timeLimit;

    this.showQuizGame();
    this.displayQuestion();
    this.startTimer();
  }

  showQuizGame() {
    document.getElementById('quizSetup').style.display = 'none';
    document.getElementById('quizGame').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'none';

    document.getElementById('playerNameDisplay').textContent = document.getElementById('playerName').value;
    this.updateProgress();
  }

  displayQuestion() {
    const question = this.questions[this.currentQuestion];
    
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('questionCounter').textContent = 
      `Pregunta ${this.currentQuestion + 1} de ${this.questions.length}`;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'option-btn';
      button.dataset.option = index;
      button.textContent = option;
      optionsContainer.appendChild(button);
    });

    this.updateProgress();
  }

  selectAnswer(selectedOption) {
    const question = this.questions[this.currentQuestion];
    const isCorrect = selectedOption === question.correct;
    
    if (isCorrect) {
      this.score++;
    }

    // Disable all options
    const options = document.querySelectorAll('.option-btn');
    options.forEach((option, index) => {
      option.disabled = true;
      if (index === question.correct) {
        option.classList.add('correct');
      } else if (index === selectedOption && !isCorrect) {
        option.classList.add('incorrect');
      }
    });

    // Store answer
    this.answers.push({
      question: question.question,
      selected: selectedOption,
      correct: question.correct,
      isCorrect: isCorrect,
      explanation: question.explanation
    });

    // Move to next question after delay
    setTimeout(() => {
      this.nextQuestion();
    }, 2000);
  }

  skipQuestion() {
    const question = this.questions[this.currentQuestion];
    
    // Disable all options
    const options = document.querySelectorAll('.option-btn');
    options.forEach((option, index) => {
      option.disabled = true;
      if (index === question.correct) {
        option.classList.add('correct');
      }
    });

    // Store skipped answer
    this.answers.push({
      question: question.question,
      selected: -1,
      correct: question.correct,
      isCorrect: false,
      explanation: question.explanation,
      skipped: true
    });

    setTimeout(() => {
      this.nextQuestion();
    }, 1000);
  }

  nextQuestion() {
    this.currentQuestion++;
    
    if (this.currentQuestion < this.questions.length) {
      this.displayQuestion();
      this.startTimer();
    } else {
      this.finishQuiz();
    }
  }

  startTimer() {
    this.timeLeft = this.timeLimit;
    this.updateTimerDisplay();
    
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();
      
      if (this.timeLeft <= 0) {
        this.timeUp();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.textContent = this.timeLeft;
    
    const timerCircle = document.querySelector('.timer-circle');
    timerCircle.classList.remove('warning', 'danger');
    
    if (this.timeLeft <= 10) {
      timerCircle.classList.add('danger');
    } else if (this.timeLeft <= 20) {
      timerCircle.classList.add('warning');
    }
  }

  timeUp() {
    clearInterval(this.timer);
    this.skipQuestion();
  }

  pauseQuiz() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      document.getElementById('pauseQuiz').textContent = 'Reanudar';
    } else {
      this.startTimer();
      document.getElementById('pauseQuiz').textContent = 'Pausar';
    }
  }

  quitQuiz() {
    if (confirm('¿Estás seguro de que quieres salir del quiz?')) {
      this.finishQuiz();
    }
  }

  finishQuiz() {
    clearInterval(this.timer);
    
    const totalTime = Math.floor((Date.now() - this.quizStartTime) / 1000);
    const accuracy = Math.round((this.score / this.questions.length) * 100);
    
    this.showResults(totalTime, accuracy);
    this.saveToLeaderboard(totalTime, accuracy);
  }

  showResults(totalTime, accuracy) {
    document.getElementById('quizGame').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    document.getElementById('finalScore').textContent = `${this.score}/${this.questions.length}`;
    document.getElementById('percentage').textContent = `${accuracy}%`;
    document.getElementById('totalTime').textContent = this.formatTime(totalTime);
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    
    this.displayAnswers();
  }

  displayAnswers() {
    const answersList = document.getElementById('answersList');
    answersList.innerHTML = '';

    this.answers.forEach((answer, index) => {
      const answerItem = document.createElement('div');
      answerItem.className = 'answer-item';
      
      const status = answer.skipped ? 'skipped' : (answer.isCorrect ? 'correct' : 'incorrect');
      const statusText = answer.skipped ? 'Saltada' : (answer.isCorrect ? 'Correcta' : 'Incorrecta');
      
      answerItem.innerHTML = `
        <div class="answer-question">${answer.question}</div>
        <div class="answer-status ${status}">${statusText}</div>
      `;
      
      answersList.appendChild(answerItem);
    });
  }

  saveToLeaderboard(totalTime, accuracy) {
    const playerName = document.getElementById('playerName').value.trim();
    const difficulty = document.getElementById('difficulty').value;
    const category = document.getElementById('category').value;
    
    const result = {
      id: Date.now(),
      playerName,
      score: this.score,
      totalQuestions: this.questions.length,
      accuracy,
      totalTime,
      difficulty,
      category,
      date: new Date().toISOString()
    };
    
    this.leaderboard.push(result);
    this.leaderboard.sort((a, b) => b.score - a.score || a.totalTime - b.totalTime);
    
    // Keep only top 50 results
    this.leaderboard = this.leaderboard.slice(0, 50);
    
    localStorage.setItem('quizLeaderboard', JSON.stringify(this.leaderboard));
  }

  viewLeaderboard() {
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'block';
    
    this.filterLeaderboard();
  }

  filterLeaderboard() {
    const category = document.getElementById('leaderboardCategory').value;
    const difficulty = document.getElementById('leaderboardDifficulty').value;
    
    let filteredLeaderboard = this.leaderboard;
    
    if (category !== 'all') {
      filteredLeaderboard = filteredLeaderboard.filter(item => item.category === category);
    }
    
    if (difficulty !== 'all') {
      filteredLeaderboard = filteredLeaderboard.filter(item => item.difficulty === difficulty);
    }
    
    this.displayLeaderboard(filteredLeaderboard);
  }

  displayLeaderboard(leaderboard) {
    const leaderboardList = document.getElementById('leaderboardList');
    
    if (leaderboard.length === 0) {
      leaderboardList.innerHTML = '<div class="no-results">No hay resultados para mostrar</div>';
      return;
    }
    
    leaderboardList.innerHTML = leaderboard.map((item, index) => {
      const rank = index + 1;
      const rankClass = rank <= 3 ? `top-3 rank-${rank === 1 ? 'gold' : rank === 2 ? 'silver' : 'bronze'}` : '';
      
      return `
        <div class="leaderboard-item ${rankClass}">
          <div class="leaderboard-rank ${rank <= 3 ? (rank === 1 ? 'gold' : rank === 2 ? 'silver' : 'bronze') : ''}">${rank}</div>
          <div class="leaderboard-info">
            <div class="leaderboard-name">${this.escapeHtml(item.playerName)}</div>
            <div class="leaderboard-details">
              ${item.category} • ${item.difficulty} • ${this.formatTime(item.totalTime)}
            </div>
          </div>
          <div class="leaderboard-score">${item.score}/${item.totalQuestions}</div>
        </div>
      `;
    }).join('');
  }

  backToResults() {
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
  }

  clearLeaderboard() {
    if (confirm('¿Estás seguro de que quieres limpiar el ranking?')) {
      this.leaderboard = [];
      localStorage.removeItem('quizLeaderboard');
      this.displayLeaderboard([]);
    }
  }

  playAgain() {
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizSetup').style.display = 'block';
  }

  shareResults() {
    const accuracy = Math.round((this.score / this.questions.length) * 100);
    const shareText = `¡Acabo de completar un quiz y obtuve ${this.score}/${this.questions.length} (${accuracy}%)! 🎯`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Resultados del Quiz',
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Resultados copiados al portapapeles');
      });
    }
  }

  updateProgress() {
    const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${this.currentQuestion + 1}/${this.questions.length}`;
    document.getElementById('scoreDisplay').textContent = `Puntuación: ${this.score}`;
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the quiz game
const quizGame = new QuizGame();
