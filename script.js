document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart-button');

    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let score = 0;
    let timer = 0;
    let timerInterval;

    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const gameEmojis = [...emojis, ...emojis];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createCard(emoji, index) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = emoji;
        card.dataset.index = index;

        card.addEventListener('click', () => flipCard(card));
        return card;
    }

    function flipCard(card) {
        if (flippedCards.length === 2 || card.classList.contains('flipped') || 
            card.classList.contains('matched')) return;

        card.classList.add('flipped');
        card.textContent = card.dataset.value;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        const match = card1.dataset.value === card2.dataset.value;

        if (match) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            score += 10;
            scoreElement.textContent = score;

            if (matchedPairs === emojis.length) {
                endGame();
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            score = Math.max(0, score - 2);
            scoreElement.textContent = score;
        }

        flippedCards = [];
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timer++;
            timerElement.textContent = timer;
        }, 1000);
    }

    function endGame() {
        clearInterval(timerInterval);
        setTimeout(() => {
            alert(`Parabéns! Você completou o jogo em ${timer} segundos com ${score} pontos!`);
        }, 500);
    }

    function initializeGame() {
        gameBoard.innerHTML = '';
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        score = 0;
        timer = 0;
        scoreElement.textContent = score;
        timerElement.textContent = timer;

        clearInterval(timerInterval);
        startTimer();

        const shuffledEmojis = shuffleArray([...gameEmojis]);
        shuffledEmojis.forEach((emoji, index) => {
            const card = createCard(emoji, index);
            cards.push(card);
            gameBoard.appendChild(card);
        });
    }

    restartButton.addEventListener('click', initializeGame);
    initializeGame();
});