const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const startTime = Date.now();

// Root route - confirms the API is reachable
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the DevOps Status API' });
});

// Health endpoint - returns a simple status check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Status endpoint - reports system info
app.get('/status', (req, res) => {
    res.json({
        version: '1.0.0',
        uptime: Math.floor((Date.now() - startTime) / 1000),
        timestamp: new Date().toISOString()
    });
});

// Start the server and export for testing
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
