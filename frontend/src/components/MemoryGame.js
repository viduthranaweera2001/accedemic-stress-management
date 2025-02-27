import React, { useState, useEffect } from 'react';

const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        initializeGame();
        const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
        setIntervalId(timer);

        return () => clearInterval(timer);
    }, []);

    const initializeGame = () => {
        const cardValues = [
            1, 2, 3, 4, 5, 6, 7, 8,
            1, 2, 3, 4, 5, 6, 7, 8,
        ];

        // Shuffle the card values
        const shuffledCards = cardValues.sort(() => Math.random() - 0.5);

        setCards(shuffledCards);
        setFlippedIndices([]);
        setMatchedCards([]);
        setMoves(0);
        setTime(0);
    };

    const flipCard = (index) => {
        // If already flipped 2 cards or if this card is already matched, do nothing
        if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedCards.includes(cards[index])) {
            return;
        }

        const newFlippedIndices = [...flippedIndices, index];
        setFlippedIndices(newFlippedIndices);

        // If two cards are flipped, check for a match
        if (newFlippedIndices.length === 2) {
            setMoves((prev) => prev + 1);
            const [firstIndex, secondIndex] = newFlippedIndices;

            if (cards[firstIndex] === cards[secondIndex]) {
                setMatchedCards((prev) => [...prev, cards[firstIndex]]);
                setFlippedIndices([]); // Clear flipped indices
            } else {
                setTimeout(() => {
                    setFlippedIndices([]); // Reset flipped indices after delay
                }, 1000);
            }
        }
    };

    const resetGame = () => {
        initializeGame();
    };

    const hasWon = matchedCards.length === cards.length / 2;

    return (
        <div className="memory-game-container">
            <h2>Memory Game</h2>
            <p>Moves: {moves}</p>
            <p>Time: {time}s</p>
            <p>Wrong selection: 4</p>
            {hasWon && <p>Congratulations! You've won the game!</p>}
            <div className="memory-game-grid">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`memory-card ${flippedIndices.includes(index) || matchedCards.includes(card) ? 'flipped' : ''}`}
                        onClick={() => flipCard(index)}
                    >
                        {flippedIndices.includes(index) || matchedCards.includes(card) ? card : '?'}
                    </div>
                ))}
            </div>
            <button onClick={resetGame}>Start</button>
            <button onClick={resetGame}>Stop</button>
            <button onClick={resetGame}>Reset Game</button>

        </div>
    );
};

export default MemoryGame;
