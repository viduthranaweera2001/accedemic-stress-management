import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StressAssistance = () => {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [mood, setMood] = useState('');
    const [moodLog, setMoodLog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

    // Fetch mood log on mount
    // useEffect(() => {
    //     fetchMoodLog();
    // }, []);

    const fetchMoodLog = async () => {
        try {
            const response = await axios.get(`${API_URL}/get_mood_log`);
            setMoodLog(response.data.mood_log);
            // Placeholder: Progress based on mood log length
            setProgress(Math.min((response.data.mood_log.length / 10) * 100, 100));
        } catch (error) {
            console.error('Error fetching mood log:', error);
        }
    };

    const sendQuery = async () => {
        if (!query) return;
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/query`, { query });
            setMessages([...messages, { user: query, bot: response.data.mistral }]);
            setQuery('');
        } catch (error) {
            console.error('Error sending query:', error);
        }
        setLoading(false);
    };

    // const logMood = async () => {
    //     if (!mood) return;
    //     try {
    //         await axios.post(`${API_URL}/log_mood`, { mood });
    //         setMood('');
    //         fetchMoodLog();
    //     } catch (error) {
    //         console.error('Error logging mood:', error);
    //     }
    // };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    return (
        <div className="container1">
            <style>
                {`
          .container1 {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            font-family: 'Roboto', 'Nunito', sans-serif;
          }

          h1, h2, h3 {
            text-align: center;
          }

          .chatbox {
            border: 1px solid #ccc;
            padding: 10px;
            height: 300px;
            overflow-y: auto;
            margin-bottom: 20px;
          }

          .messages p {
            margin: 5px 0;
          }

          .loading-dots {
            text-align: center;
            font-size: 24px;
          }

          .loading-dots span {
            animation: blink 1.4s infinite both;
          }

          .loading-dots span:nth-child(2) {
            animation-delay: 0.2s;
          }

          .loading-dots span:nth-child(3) {
            animation-delay: 0.4s;
          }

          @keyframes blink {
            0% { opacity: 0.2; }
            20% { opacity: 1; }
            100% { opacity: 0.2; }
          }

          .input-container {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
          }

          .input-container input {
            flex: 1;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .input-container button {
            padding: 8px 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          .input-container button:hover {
            background-color: #0056b3;
          }

          .mood-logger {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
          }

          .mood-logger input {
            flex: 1;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .mood-logger button {
            padding: 8px 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          .mood-logger button:hover {
            background-color: #0056b3;
          }

          .mood-log {
            margin-top: 20px;
          }

          .mood-log h3 {
            margin-bottom: 10px;
          }

          .mood-log ul {
            list-style: none;
            padding: 0;
          }

          .mood-log li {
            padding: 5px 0;
          }

          .progress-bar-container {
            width: 100%;
            background-color: #f0f0f0;
            border-radius: 4px;
            margin: 20px 0;
            position: relative;
          }

          .progress-bar {
            height: 20px;
            background-color: #007bff;
            border-radius: 4px;
            position: relative;
            transition: width 0.3s ease;
          }

          .sparkles {
            position: absolute;
            right: 0;
            top: 0;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
          }

          .mood-checkpoints {
            display: flex;
            justify-content: space-between;
            position: relative;
            margin-top: 5px;
          }

          .checkpoint {
            position: absolute;
            transform: translateX(-50%);
            font-size: 12px;
            color: #333;
          }
        `}
            </style>
            <h1>Stress and Anxiety AI Assistance</h1>
            <div className="chatbox">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <p><strong>You:</strong> {msg.user}</p>
                            <p><strong>Bot:</strong> {msg.bot}</p>
                        </div>
                    ))}
                </div>
                {loading && (
                    <div className="loading-dots">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </div>
                )}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="How are you feeling today?"
                />
                <button onClick={sendQuery}>Send</button>
            </div>
            {/*<h2>Log Your Mood</h2>*/}
            {/*<div className="mood-logger">*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        value={mood}*/}
            {/*        onChange={(e) => setMood(e.target.value)}*/}
            {/*        placeholder="Enter your mood..."*/}
            {/*    />*/}
            {/*    /!*<button onClick={logMood}>Log Mood</button>*!/*/}
            {/*</div>*/}
            {/*<div className="mood-log">*/}
            {/*    <h3>Mood Log</h3>*/}
            {/*    <ul>*/}
            {/*        {moodLog.map((entry, index) => (*/}
            {/*            <li key={index}>*/}
            {/*                {entry.mood} - {formatDate(entry.timestamp)}*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</div>*/}
            {/*<div className="progress-bar-container">*/}
            {/*    <div className="progress-bar" style={{ width: `${progress}%` }}>*/}
            {/*        <div className="sparkles"></div>*/}
            {/*    </div>*/}
            {/*    <div className="mood-checkpoints">*/}
            {/*        <div className="checkpoint" style={{ left: '0%' }}>Low</div>*/}
            {/*        <div className="checkpoint" style={{ left: '50%' }}>Medium</div>*/}
            {/*        <div className="checkpoint" style={{ left: '100%' }}>High</div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default StressAssistance;