import React from 'react';
import Navbar from '../components/Navbar';

function HomePage() {
    return (
        <div className="container mx-auto p-6">
            <Navbar />
            <h1 className="text-3xl font-bold mb-4">Welcome to Home Page</h1>
            <p>This is the main page of the application.</p>
        </div>
    );
}

export default HomePage;