import React, { useState, useEffect } from "react";

const PuzzleGame = () => {
    const [numbers, setNumbers] = useState([]);
    const [score, setScore] = useState(0);
    const [difficulty, setDifficulty] = useState("Easy");
    const [resetCount, setResetCount] = useState(0);
    const [time, setTime] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    // Adjust grid size based on difficulty
    const getGridSize = () => {
        switch (difficulty) {
            case "Medium":
                return 36; // 6x6 grid
            case "Hard":
                return 64; // 8x8 grid
            default:
                return 16; // 4x4 grid
        }
    };

    // Set up puzzle grid and timer on mount
    useEffect(() => {
        resetGame();
        const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
        setIntervalId(timer);
        return () => clearInterval(timer);
    }, [difficulty]);

    // Reset the game
    const resetGame = () => {
        const gridSize = getGridSize();
        const nums = [...Array(gridSize).keys()];
        do {
            nums.sort(() => Math.random() - 0.5);
        } while (!isSolvable(nums));

        setNumbers(nums);
        setScore(0);
        setTime(0);
        setResetCount((prev) => prev + 1);
    };

    // Check if the puzzle is solvable
    const isSolvable = (nums) => {
        let invCount = 0;
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[i] && nums[j] && nums[i] > nums[j]) invCount++;
            }
        }
        return invCount % 2 === 0;
    };

    // Move a tile based on user click
    const moveTile = (index) => {
        const emptyIndex = numbers.indexOf(0);
        const validMoves = [
            emptyIndex - Math.sqrt(numbers.length), // Up
            emptyIndex + Math.sqrt(numbers.length), // Down
            emptyIndex - 1, // Left
            emptyIndex + 1, // Right
        ];

        if (validMoves.includes(index) && Math.floor(index / Math.sqrt(numbers.length)) === Math.floor(emptyIndex / Math.sqrt(numbers.length))) {
            const newNumbers = [...numbers];
            [newNumbers[emptyIndex], newNumbers[index]] = [
                newNumbers[index],
                newNumbers[emptyIndex],
            ];
            setNumbers(newNumbers);
            setScore((prev) => prev + 1);
        }
    };

    // Check if the puzzle is solved
    const hasWon = numbers.every((num, index) => num === index);

    return (
        <div className="puzzle-container">
            <h2>Puzzle Game</h2>
            <div>
                <p>Score: {score}</p>
                <p>Difficulty: {difficulty}</p>
                <p>Reset Count: {resetCount}</p>
                <p>Time: {time}s</p>
            </div>

            {/* Difficulty Selector */}
            <div>
                <label>Select Difficulty: </label>
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>

            {/* Puzzle Grid */}
            <div
                className="puzzle-grid"
                style={{
                    gridTemplateColumns: `repeat(${Math.sqrt(numbers.length)}, 1fr)`,
                }}
            >
                {numbers.map((num, index) => (
                    <div
                        key={index}
                        onClick={() => moveTile(index)}
                        className={`tile ${num === 0 ? "empty" : ""}`}
                    >
                        {num !== 0 && num}
                    </div>
                ))}
            </div>

            {hasWon && <p>Congratulations! You solved the puzzle!</p>}

            <div>
                <button onClick={resetGame}>Reset Game</button>
            </div>
        </div>
    );
};

export default PuzzleGame;
