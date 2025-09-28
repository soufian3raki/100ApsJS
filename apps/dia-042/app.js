// Juego de Blackjack - Día 42
class BlackjackGame {
  constructor() {
    this.deck = [];
    this.dealerHand = [];
    this.playerHand = [];
    this.money = parseInt(localStorage.getItem("blackjackMoney")) || 1000;
    this.currentBet = 0;
    this.gameState = "betting"; // betting, playing, dealer, finished
    this.stats = JSON.parse(localStorage.getItem("blackjackStats")) || {
      wins: 0,
      losses: 0,
      ties: 0,
      blackjacks: 0,
      games: 0,
      streak: 0
    };
    
    this.initializeElements();
    this.setupEventListeners();
    this.updateDisplay();
  }

  initializeElements() {
    this.moneyEl = document.getElementById("money");
    this.betEl = document.getElementById("bet");
    this.streakEl = document.getElementById("streak");
    this.gamesEl = document.getElementById("games");
    this.dealerHandEl = document.getElementById("dealerHand");
    this.playerHandEl = document.getElementById("playerHand");
    this.dealerCardsEl = document.getElementById("dealerCards");
    this.playerCardsEl = document.getElementById("playerCards");
    this.gameMessageEl = document.getElementById("gameMessage");
    this.newGameBtn = document.getElementById("newGameBtn");
    this.hitBtn = document.getElementById("hitBtn");
    this.standBtn = document.getElementById("standBtn");
    this.doubleBtn = document.getElementById("doubleBtn");
    this.customBetEl = document.getElementById("customBet");
    this.placeBetBtn = document.getElementById("placeBetBtn");
    this.winsEl = document.getElementById("wins");
    this.lossesEl = document.getElementById("losses");
    this.tiesEl = document.getElementById("ties");
    this.blackjacksEl = document.getElementById("blackjacks");
  }

  setupEventListeners() {
    this.newGameBtn.addEventListener("click", () => this.newGame());
    this.hitBtn.addEventListener("click", () => this.hit());
    this.standBtn.addEventListener("click", () => this.stand());
    this.doubleBtn.addEventListener("click", () => this.doubleDown());
    this.placeBetBtn.addEventListener("click", () => this.placeBet());
    
    document.querySelectorAll(".bet-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const amount = parseInt(e.target.dataset.amount);
        this.setBet(amount);
      });
    });
  }

  createDeck() {
    const suits = ["♠", "♥", "♦", "♣"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const deck = [];
    
    for (let suit of suits) {
      for (let value of values) {
        deck.push({
          suit: suit,
          value: value,
          color: suit === "♥" || suit === "♦" ? "red" : "black"
        });
      }
    }
    
    return this.shuffleDeck(deck);
  }

  shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  setBet(amount) {
    if (this.gameState !== "betting") return;
    
    if (amount > this.money) {
      this.updateMessage("No tienes suficiente dinero", "error");
      return;
    }
    
    this.currentBet = amount;
    this.updateDisplay();
    
    document.querySelectorAll(".bet-btn").forEach(btn => {
      btn.classList.remove("selected");
    });
    
    document.querySelector(`[data-amount="${amount}"]`).classList.add("selected");
  }

  placeBet() {
    const customBet = parseInt(this.customBetEl.value);
    if (customBet && customBet > 0) {
      this.setBet(customBet);
    }
    
    if (this.currentBet === 0) {
      this.updateMessage("Debes hacer una apuesta primero", "error");
      return;
    }
    
    this.startGame();
  }

  startGame() {
    this.gameState = "playing";
    this.deck = this.createDeck();
    this.dealerHand = [];
    this.playerHand = [];
    
    this.money -= this.currentBet;
    
    this.dealInitialCards();
    this.updateDisplay();
    this.updateButtons();
    
    if (this.getHandValue(this.playerHand) === 21) {
      this.checkBlackjack();
    }
  }

  dealInitialCards() {
    this.dealCard(this.playerHand, this.playerCardsEl);
    this.dealCard(this.dealerHand, this.dealerCardsEl);
    this.dealCard(this.playerHand, this.playerCardsEl);
    this.dealCard(this.dealerHand, this.dealerCardsEl, true);
  }

  dealCard(hand, container, isHidden = false) {
    const card = this.deck.pop();
    hand.push(card);
    
    const cardEl = document.createElement("div");
    cardEl.className = "card dealing";
    
    if (isHidden) {
      cardEl.classList.add("card-back");
      cardEl.textContent = "🂠";
    } else {
      cardEl.classList.add(card.color);
      cardEl.innerHTML = `
        <div class="card-value">${card.value}</div>
        <div class="card-suit">${card.suit}</div>
      `;
    }
    
    container.appendChild(cardEl);
    
    setTimeout(() => {
      cardEl.classList.remove("dealing");
    }, 500);
  }

  getHandValue(hand) {
    let value = 0;
    let aces = 0;
    
    for (let card of hand) {
      if (card.value === "A") {
        aces++;
        value += 11;
      } else if (["J", "Q", "K"].includes(card.value)) {
        value += 10;
      } else {
        value += parseInt(card.value);
      }
    }
    
    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }
    
    return value;
  }

  hit() {
    if (this.gameState !== "playing") return;
    
    this.dealCard(this.playerHand, this.playerCardsEl);
    this.updateDisplay();
    
    const playerValue = this.getHandValue(this.playerHand);
    
    if (playerValue > 21) {
      this.bust();
    } else if (playerValue === 21) {
      this.stand();
    }
  }

  stand() {
    if (this.gameState !== "playing") return;
    
    this.gameState = "dealer";
    this.updateButtons();
    this.dealerPlay();
  }

  doubleDown() {
    if (this.gameState !== "playing" || this.currentBet > this.money) return;
    
    this.money -= this.currentBet;
    this.currentBet *= 2;
    this.hit();
    this.stand();
  }

  dealerPlay() {
    this.revealDealerCard();
    
    const dealerValue = this.getHandValue(this.dealerHand);
    
    if (dealerValue < 17) {
      setTimeout(() => {
        this.dealCard(this.dealerHand, this.dealerCardsEl);
        this.updateDisplay();
        this.dealerPlay();
      }, 1000);
    } else {
      this.finishGame();
    }
  }

  revealDealerCard() {
    const hiddenCard = this.dealerCardsEl.querySelector(".card-back");
    if (hiddenCard) {
      const card = this.dealerHand[1];
      hiddenCard.classList.remove("card-back");
      hiddenCard.classList.add(card.color);
      hiddenCard.innerHTML = `
        <div class="card-value">${card.value}</div>
        <div class="card-suit">${card.suit}</div>
      `;
    }
  }

  finishGame() {
    this.gameState = "finished";
    this.updateButtons();
    
    const playerValue = this.getHandValue(this.playerHand);
    const dealerValue = this.getHandValue(this.dealerHand);
    
    let result = "";
    
    if (playerValue > 21) {
      result = "bust";
    } else if (dealerValue > 21) {
      result = "win";
    } else if (playerValue > dealerValue) {
      result = "win";
    } else if (playerValue < dealerValue) {
      result = "lose";
    } else {
      result = "tie";
    }
    
    this.handleResult(result);
  }

  handleResult(result) {
    this.stats.games++;
    
    switch (result) {
      case "win":
        this.money += this.currentBet * 2;
        this.stats.wins++;
        this.stats.streak = Math.max(0, this.stats.streak) + 1;
        this.updateMessage("¡Ganaste! +$" + (this.currentBet * 2), "win");
        break;
      case "lose":
        this.stats.losses++;
        this.stats.streak = 0;
        this.updateMessage("Perdiste -$" + this.currentBet, "lose");
        break;
      case "tie":
        this.money += this.currentBet;
        this.stats.ties++;
        this.updateMessage("Empate. Recuperas tu apuesta", "tie");
        break;
      case "bust":
        this.stats.losses++;
        this.stats.streak = 0;
        this.updateMessage("Te pasaste de 21. Perdiste -$" + this.currentBet, "lose");
        break;
    }
    
    this.currentBet = 0;
    this.updateDisplay();
    this.saveGame();
  }

  checkBlackjack() {
    const playerValue = this.getHandValue(this.playerHand);
    const dealerValue = this.getHandValue(this.dealerHand);
    
    if (playerValue === 21 && dealerValue === 21) {
      this.money += this.currentBet;
      this.stats.ties++;
      this.updateMessage("Blackjack doble. Empate", "tie");
    } else if (playerValue === 21) {
      this.money += Math.floor(this.currentBet * 2.5);
      this.stats.wins++;
      this.stats.blackjacks++;
      this.stats.streak = Math.max(0, this.stats.streak) + 1;
      this.updateMessage("¡Blackjack! +$" + Math.floor(this.currentBet * 2.5), "win");
    }
    
    this.gameState = "finished";
    this.currentBet = 0;
    this.updateDisplay();
    this.updateButtons();
    this.saveGame();
  }

  bust() {
    this.gameState = "finished";
    this.stats.losses++;
    this.stats.streak = 0;
    this.updateMessage("Te pasaste de 21. Perdiste -$" + this.currentBet, "lose");
    this.currentBet = 0;
    this.updateDisplay();
    this.updateButtons();
    this.saveGame();
  }

  newGame() {
    if (this.money <= 0) {
      this.updateMessage("No tienes dinero. Reiniciando...", "error");
      this.money = 1000;
      this.stats = {
        wins: 0,
        losses: 0,
        ties: 0,
        blackjacks: 0,
        games: 0,
        streak: 0
      };
    }
    
    this.gameState = "betting";
    this.dealerHand = [];
    this.playerHand = [];
    this.currentBet = 0;
    
    this.dealerCardsEl.innerHTML = "";
    this.playerCardsEl.innerHTML = "";
    
    this.updateDisplay();
    this.updateButtons();
    this.updateMessage("Haz tu apuesta y presiona Nueva Partida", "");
  }

  updateDisplay() {
    this.moneyEl.textContent = "$" + this.money;
    this.betEl.textContent = "$" + this.currentBet;
    this.streakEl.textContent = this.stats.streak;
    this.gamesEl.textContent = this.stats.games;
    
    this.dealerHandEl.textContent = this.gameState === "playing" ? "?" : this.getHandValue(this.dealerHand);
    this.playerHandEl.textContent = this.getHandValue(this.playerHand);
    
    this.winsEl.textContent = this.stats.wins;
    this.lossesEl.textContent = this.stats.losses;
    this.tiesEl.textContent = this.stats.ties;
    this.blackjacksEl.textContent = this.stats.blackjacks;
  }

  updateButtons() {
    const isPlaying = this.gameState === "playing";
    const canBet = this.gameState === "betting";
    
    this.newGameBtn.disabled = !canBet;
    this.hitBtn.disabled = !isPlaying;
    this.standBtn.disabled = !isPlaying;
    this.doubleBtn.disabled = !isPlaying || this.currentBet > this.money;
  }

  updateMessage(message, type = "") {
    this.gameMessageEl.textContent = message;
    this.gameMessageEl.className = "game-message";
    
    if (type) {
      this.gameMessageEl.classList.add(type);
    }
    
    if (type === "win" || type === "lose" || type === "tie") {
      this.gameMessageEl.classList.add("pulse");
    }
  }

  saveGame() {
    localStorage.setItem("blackjackMoney", this.money.toString());
    localStorage.setItem("blackjackStats", JSON.stringify(this.stats));
  }
}

let blackjackGame;

document.addEventListener("DOMContentLoaded", () => {
  blackjackGame = new BlackjackGame();
});
