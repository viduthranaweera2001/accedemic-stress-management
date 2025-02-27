import React, { useState } from "react";

const AiAssistance = () => {
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([
        { from: "Medical Assistance", message: "Hello! How can I assist you today?" }
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.trim()) {
            setChatHistory([
                ...chatHistory,
                { from: "You", message: userInput },
                { from: "Medical Assistance", message: `: ${userInput}` } // Dummy AI response
            ]);
            setUserInput("");
        }
    };

    return (
        <div className="ai-container">
            <h2>AI Assistance</h2>
            <div className="chat-box">
                {chatHistory.map((chat, index) => (
                    <div
                        key={index}
                        className={`chat-message ${chat.from === "You" ? "user-message" : "ai-message"}`}
                    >
                        <strong>{chat.from}:</strong> {chat.message}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default AiAssistance;
