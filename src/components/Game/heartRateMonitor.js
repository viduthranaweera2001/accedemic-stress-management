import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, TimeScale);

const HeartRateMonitor = () => {
    const [heartRateData, setHeartRateData] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newDataPoint = {
                time: new Date(),
                heartRate: Math.random() * (100 - 60) + 60,
            };
            setHeartRateData((prevData) => {
                const newData = [...prevData, newDataPoint];
                if (newData.length > 10) {
                    return newData.slice(newData.length - 10);
                }
                return newData;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const chartData = {
        datasets: [
            {
                label: 'Heart Rate (BPM)',
                data: heartRateData.map((data) => ({
                    x: data.time,
                    y: data.heartRate,
                })),
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'second',
                    displayFormats: {
                        second: 'HH:mm:ss',
                    },
                },
                title: {
                    display: true,
                    text: 'Time',
                },
            },
            y: {
                beginAtZero: false,
                min: 50,
                max: 120,
                title: {
                    display: true,
                    text: 'Heart Rate (BPM)',
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => `Heart Rate: ${context.parsed.y.toFixed(1)} BPM`,
                },
            },
        },
    };

    return (
        <div
            style={{
                background: '#c4e1ff',
                padding: '40px',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                minHeight: '200px',
                overflow: 'auto',
                boxSizing: 'border-box',
                position: 'relative',
                zIndex: 10,
            }}
        >
            <h2
                style={{
                    color: '#e74c3c',
                    marginBottom: '15px',
                    fontSize: '1.5em',
                    textAlign: 'center',
                }}
            >
                Live Heart Rate Monitor
            </h2>
            <div style={{ height: '200px', width: '100%' }}>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default HeartRateMonitor;