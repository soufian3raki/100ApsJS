class VotingApp {
  constructor() {
    this.currentPoll = null;
    this.votes = [];
    this.pollHistory = JSON.parse(localStorage.getItem('votingHistory')) || [];
    this.currentChart = null;
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderHistory();
  }

  bindEvents() {
    document.getElementById('addOption').addEventListener('click', () => {
      this.addOption();
    });

    document.getElementById('createPoll').addEventListener('click', () => {
      this.createPoll();
    });

    document.getElementById('submitVote').addEventListener('click', () => {
      this.submitVote();
    });

    document.getElementById('viewResults').addEventListener('click', () => {
      this.viewResults();
    });

    document.getElementById('resetPoll').addEventListener('click', () => {
      this.resetPoll();
    });

    document.getElementById('exportResults').addEventListener('click', () => {
      this.exportResults();
    });

    document.getElementById('sharePoll').addEventListener('click', () => {
      this.sharePoll();
    });

    document.getElementById('closeResults').addEventListener('click', () => {
      this.closeResults();
    });

    document.getElementById('clearHistory').addEventListener('click', () => {
      this.clearHistory();
    });

    document.getElementById('exportHistory').addEventListener('click', () => {
      this.exportHistory();
    });

    document.getElementById('pollType').addEventListener('change', (e) => {
      this.updateMaxChoicesVisibility(e.target.value);
    });
  }

  addOption() {
    const optionsList = document.getElementById('optionsList');
    const optionCount = optionsList.children.length + 1;
    
    const optionItem = document.createElement('div');
    optionItem.className = 'option-item';
    optionItem.innerHTML = `
      <input type="text" placeholder="Opción ${optionCount}" class="option-input">
      <button class="remove-option" onclick="this.parentElement.remove()">×</button>
    `;
    
    optionsList.appendChild(optionItem);
  }

  updateMaxChoicesVisibility(pollType) {
    const maxChoicesGroup = document.querySelector('input[id="maxChoices"]').parentElement;
    if (pollType === 'multiple') {
      maxChoicesGroup.style.display = 'flex';
    } else {
      maxChoicesGroup.style.display = 'none';
    }
  }

  createPoll() {
    const title = document.getElementById('pollTitle').value.trim();
    const description = document.getElementById('pollDescription').value.trim();
    const pollType = document.getElementById('pollType').value;
    const maxChoices = parseInt(document.getElementById('maxChoices').value);
    const allowAnonymous = document.getElementById('allowAnonymous').checked;
    const showResults = document.getElementById('showResults').checked;

    if (!title) {
      alert('Por favor ingresa un título para la votación');
      return;
    }

    const options = Array.from(document.querySelectorAll('.option-input'))
      .map(input => input.value.trim())
      .filter(option => option);

    if (options.length < 2) {
      alert('Por favor ingresa al menos 2 opciones');
      return;
    }

    this.currentPoll = {
      id: Date.now(),
      title,
      description,
      type: pollType,
      maxChoices: pollType === 'multiple' ? maxChoices : 1,
      allowAnonymous,
      showResults,
      options: options.map((option, index) => ({
        id: index + 1,
        text: option,
        votes: 0
      })),
      createdAt: new Date().toISOString(),
      totalVotes: 0
    };

    this.votes = [];
    this.showVotingInterface();
  }

  showVotingInterface() {
    document.getElementById('votingInterface').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';
    
    document.getElementById('currentPollTitle').textContent = this.currentPoll.title;
    document.getElementById('currentPollDescription').textContent = this.currentPoll.description;
    
    this.renderVotingOptions();
  }

  renderVotingOptions() {
    const votingOptions = document.getElementById('votingOptions');
    const pollType = this.currentPoll.type;
    
    votingOptions.innerHTML = this.currentPoll.options.map(option => {
      if (pollType === 'ranking') {
        return `
          <div class="voting-option" data-option-id="${option.id}">
            <div class="option-label">
              <div class="option-text">${this.escapeHtml(option.text)}</div>
              <div class="option-rank" style="display: none;">1</div>
            </div>
          </div>
        `;
      } else {
        const inputType = pollType === 'multiple' ? 'checkbox' : 'radio';
        const inputName = pollType === 'multiple' ? 'option' : 'poll';
        
        return `
          <div class="voting-option" data-option-id="${option.id}">
            <input type="${inputType}" name="${inputName}" value="${option.id}" id="option-${option.id}">
            <label for="option-${option.id}" class="option-label">
              <div class="option-checkbox"></div>
              <div class="option-text">${this.escapeHtml(option.text)}</div>
            </label>
          </div>
        `;
      }
    }).join('');

    this.bindVotingEvents();
  }

  bindVotingEvents() {
    const votingOptions = document.querySelectorAll('.voting-option');
    
    votingOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        if (e.target.type === 'radio' || e.target.type === 'checkbox') return;
        
        const optionId = parseInt(option.dataset.optionId);
        this.handleOptionClick(optionId, option);
      });
    });

    // Bind input events
    const inputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    inputs.forEach(input => {
      input.addEventListener('change', () => {
        this.updateSubmitButton();
        this.updateOptionSelection();
      });
    });
  }

  handleOptionClick(optionId, optionElement) {
    const pollType = this.currentPoll.type;
    
    if (pollType === 'ranking') {
      this.handleRankingClick(optionId, optionElement);
    } else {
      const input = optionElement.querySelector('input');
      if (input) {
        input.checked = !input.checked;
        this.updateSubmitButton();
        this.updateOptionSelection();
      }
    }
  }

  handleRankingClick(optionId, optionElement) {
    const currentRank = this.getCurrentRank(optionId);
    const nextRank = this.getNextRank();
    
    if (currentRank) {
      this.removeRanking(optionId);
    } else if (nextRank <= this.currentPoll.options.length) {
      this.setRanking(optionId, nextRank);
    }
    
    this.updateSubmitButton();
  }

  getCurrentRank(optionId) {
    const optionElement = document.querySelector(`[data-option-id="${optionId}"]`);
    const rankElement = optionElement.querySelector('.option-rank');
    return rankElement.style.display !== 'none' ? parseInt(rankElement.textContent) : null;
  }

  getNextRank() {
    const usedRanks = Array.from(document.querySelectorAll('.option-rank'))
      .filter(rank => rank.style.display !== 'none')
      .map(rank => parseInt(rank.textContent))
      .sort((a, b) => a - b);
    
    for (let i = 1; i <= this.currentPoll.options.length; i++) {
      if (!usedRanks.includes(i)) {
        return i;
      }
    }
    return this.currentPoll.options.length + 1;
  }

  setRanking(optionId, rank) {
    const optionElement = document.querySelector(`[data-option-id="${optionId}"]`);
    const rankElement = optionElement.querySelector('.option-rank');
    
    rankElement.textContent = rank;
    rankElement.style.display = 'flex';
    optionElement.classList.add('selected');
  }

  removeRanking(optionId) {
    const optionElement = document.querySelector(`[data-option-id="${optionId}"]`);
    const rankElement = optionElement.querySelector('.option-rank');
    
    rankElement.style.display = 'none';
    optionElement.classList.remove('selected');
  }

  updateOptionSelection() {
    const options = document.querySelectorAll('.voting-option');
    
    options.forEach(option => {
      const input = option.querySelector('input');
      if (input) {
        if (input.checked) {
          option.classList.add('selected');
        } else {
          option.classList.remove('selected');
        }
      }
    });
  }

  updateSubmitButton() {
    const submitBtn = document.getElementById('submitVote');
    const pollType = this.currentPoll.type;
    let canSubmit = false;

    if (pollType === 'ranking') {
      const selectedOptions = document.querySelectorAll('.option-rank[style*="flex"]');
      canSubmit = selectedOptions.length === this.currentPoll.options.length;
    } else if (pollType === 'multiple') {
      const checkedInputs = document.querySelectorAll('input[type="checkbox"]:checked');
      canSubmit = checkedInputs.length > 0 && checkedInputs.length <= this.currentPoll.maxChoices;
    } else {
      const checkedInput = document.querySelector('input[type="radio"]:checked');
      canSubmit = !!checkedInput;
    }

    submitBtn.disabled = !canSubmit;
  }

  submitVote() {
    const pollType = this.currentPoll.type;
    let selectedOptions = [];

    if (pollType === 'ranking') {
      const rankedOptions = Array.from(document.querySelectorAll('.option-rank[style*="flex"]'))
        .map(rank => ({
          optionId: parseInt(rank.parentElement.parentElement.dataset.optionId),
          rank: parseInt(rank.textContent)
        }))
        .sort((a, b) => a.rank - b.rank);
      
      selectedOptions = rankedOptions;
    } else {
      const checkedInputs = document.querySelectorAll('input:checked');
      selectedOptions = Array.from(checkedInputs).map(input => ({
        optionId: parseInt(input.value),
        rank: 1
      }));
    }

    const vote = {
      id: Date.now(),
      pollId: this.currentPoll.id,
      selectedOptions,
      timestamp: new Date().toISOString(),
      voterId: this.generateVoterId()
    };

    this.votes.push(vote);
    this.updatePollResults();

    if (this.currentPoll.showResults) {
      this.viewResults();
    } else {
      this.showNotification('Voto registrado exitosamente');
    }

    this.resetVotingForm();
  }

  generateVoterId() {
    return 'voter_' + Math.random().toString(36).substr(2, 9);
  }

  updatePollResults() {
    this.currentPoll.totalVotes = this.votes.length;
    
    // Reset option votes
    this.currentPoll.options.forEach(option => {
      option.votes = 0;
    });

    // Count votes
    this.votes.forEach(vote => {
      vote.selectedOptions.forEach(selected => {
        const option = this.currentPoll.options.find(opt => opt.id === selected.optionId);
        if (option) {
          option.votes++;
        }
      });
    });
  }

  viewResults() {
    this.updatePollResults();
    this.renderResults();
    document.getElementById('resultsSection').style.display = 'block';
  }

  renderResults() {
    // Update stats
    document.getElementById('totalVotes').textContent = this.currentPoll.totalVotes;
    document.getElementById('totalOptions').textContent = this.currentPoll.options.length;
    document.getElementById('pollStatus').textContent = 'Activa';

    // Render table
    this.renderResultsTable();
    
    // Render chart
    this.renderResultsChart();
  }

  renderResultsTable() {
    const tbody = document.getElementById('resultsTableBody');
    const totalVotes = this.currentPoll.totalVotes;
    
    tbody.innerHTML = this.currentPoll.options
      .sort((a, b) => b.votes - a.votes)
      .map(option => {
        const percentage = totalVotes > 0 ? (option.votes / totalVotes * 100).toFixed(1) : 0;
        
        return `
          <tr>
            <td>${this.escapeHtml(option.text)}</td>
            <td>${option.votes}</td>
            <td>${percentage}%</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentage}%"></div>
              </div>
            </td>
          </tr>
        `;
      }).join('');
  }

  renderResultsChart() {
    const ctx = document.getElementById('resultsChart').getContext('2d');
    
    if (this.currentChart) {
      this.currentChart.destroy();
    }

    const labels = this.currentPoll.options.map(option => option.text);
    const data = this.currentPoll.options.map(option => option.votes);
    const colors = this.generateColors(this.currentPoll.options.length);

    this.currentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Votos',
          data: data,
          backgroundColor: colors,
          borderColor: colors.map(color => color.replace('0.8', '1')),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: this.currentPoll.title
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  generateColors(count) {
    const colors = [
      'rgba(59, 130, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(239, 68, 68, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(236, 72, 153, 0.8)',
      'rgba(6, 182, 212, 0.8)',
      'rgba(34, 197, 94, 0.8)'
    ];

    return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
  }

  resetVotingForm() {
    const inputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    inputs.forEach(input => input.checked = false);
    
    const options = document.querySelectorAll('.voting-option');
    options.forEach(option => option.classList.remove('selected'));
    
    const ranks = document.querySelectorAll('.option-rank');
    ranks.forEach(rank => {
      rank.style.display = 'none';
    });
    
    this.updateSubmitButton();
  }

  resetPoll() {
    if (confirm('¿Crear una nueva votación? Se perderán los datos actuales.')) {
      this.currentPoll = null;
      this.votes = [];
      document.getElementById('votingInterface').style.display = 'none';
      document.getElementById('resultsSection').style.display = 'none';
      document.getElementById('pollTitle').value = '';
      document.getElementById('pollDescription').value = '';
    }
  }

  closeResults() {
    document.getElementById('resultsSection').style.display = 'none';
  }

  exportResults() {
    if (!this.currentPoll) return;

    const results = {
      poll: this.currentPoll,
      votes: this.votes,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `votacion_${this.currentPoll.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  sharePoll() {
    if (!this.currentPoll) return;

    const pollData = {
      title: this.currentPoll.title,
      description: this.currentPoll.description,
      options: this.currentPoll.options.map(opt => opt.text),
      type: this.currentPoll.type
    };

    const shareText = `Votación: ${pollData.title}\n\n${pollData.description}\n\nOpciones:\n${pollData.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}`;
    
    if (navigator.share) {
      navigator.share({
        title: pollData.title,
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        this.showNotification('Información de la votación copiada al portapapeles');
      });
    }
  }

  renderHistory() {
    const historyList = document.getElementById('historyList');
    
    if (this.pollHistory.length === 0) {
      historyList.innerHTML = '<p class="no-history">No hay votaciones guardadas</p>';
      return;
    }

    historyList.innerHTML = this.pollHistory.map(poll => `
      <div class="history-item" onclick="votingApp.loadPoll(${poll.id})">
        <div class="history-header">
          <div class="history-title">${this.escapeHtml(poll.title)}</div>
          <div class="history-date">${new Date(poll.createdAt).toLocaleString()}</div>
        </div>
        <div class="history-stats">
          <span class="history-stat">${poll.totalVotes} votos</span>
          <span class="history-stat">${poll.options.length} opciones</span>
          <span class="history-stat">${poll.type}</span>
        </div>
        <div class="history-actions">
          <button class="history-view" onclick="event.stopPropagation(); votingApp.loadPoll(${poll.id})">Ver</button>
          <button class="history-delete" onclick="event.stopPropagation(); votingApp.deletePoll(${poll.id})">Eliminar</button>
        </div>
      </div>
    `).join('');
  }

  loadPoll(pollId) {
    const poll = this.pollHistory.find(p => p.id === pollId);
    if (poll) {
      this.currentPoll = poll;
      this.votes = poll.votes || [];
      this.showVotingInterface();
    }
  }

  deletePoll(pollId) {
    if (confirm('¿Eliminar esta votación del historial?')) {
      this.pollHistory = this.pollHistory.filter(p => p.id !== pollId);
      this.saveHistory();
      this.renderHistory();
    }
  }

  clearHistory() {
    if (confirm('¿Eliminar todo el historial?')) {
      this.pollHistory = [];
      this.saveHistory();
      this.renderHistory();
    }
  }

  exportHistory() {
    const blob = new Blob([JSON.stringify(this.pollHistory, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historial_votaciones_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  saveHistory() {
    if (this.currentPoll) {
      const existingIndex = this.pollHistory.findIndex(p => p.id === this.currentPoll.id);
      if (existingIndex >= 0) {
        this.pollHistory[existingIndex] = { ...this.currentPoll, votes: this.votes };
      } else {
        this.pollHistory.unshift({ ...this.currentPoll, votes: this.votes });
      }
    }
    
    localStorage.setItem('votingHistory', JSON.stringify(this.pollHistory));
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--accent);
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      z-index: 10000;
      font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the voting app
const votingApp = new VotingApp();
