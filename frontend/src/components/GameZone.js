import React, { useState } from "react";
import PuzzleGame from "./PuzzleGame";
import MemoryGame from "./MemoryGame";

const GameZone = () => {
    const [selectedGame, setSelectedGame] = useState("memory");

    const handleGameChange = (game) => {
        setSelectedGame(game);
    };

    return (
        <div className="game-zone-container">
            {/*<h2>Game Zone</h2>*/}
            <div>
                <button
                    onClick={() => handleGameChange("memory")}
                    style={{
                        backgroundColor: selectedGame === "memory" ? "#007bff" : "#ccc",
                        color: selectedGame === "memory" ? "#fff" : "#000",
                    }}
                >
                    Memory Game
                </button>

                <button
                    onClick={() => handleGameChange("puzzle")}
                    style={{
                        backgroundColor: selectedGame === "puzzle" ? "#007bff" : "#ccc",
                        color: selectedGame === "puzzle" ? "#fff" : "#000",
                    }}
                >
                    Puzzle Game
                </button>

            </div>

            {selectedGame === "puzzle" && <PuzzleGame />}
            {selectedGame === "memory" && <MemoryGame />}
        </div>
    );
};

export default GameZone;
