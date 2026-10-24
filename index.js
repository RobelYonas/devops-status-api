const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const startTime = Date.now();
const { version } = require('./package.json');

// Metrics tracking
let totalRequests = 0;
let totalResponseTime = 0;

// Metrics middleware
app.use((req, res, next) => {
    totalRequests++;
    const start = Date.now();
    res.on('finish', () => {
        totalResponseTime += Date.now() - start;
    });
    next();
});



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
        version,
        uptime: Math.floor((Date.now() - startTime) / 1000),
        timestamp: new Date().toISOString()
    });
});

app.get('/metrics', (req, res) => {
    const avgResponseTimeMs = totalRequests > 0
        ? Math.round(totalResponseTime / totalRequests)
        : 0;

    res.json({
        totalRequests,
        avgResponseTimeMs,
        uptime: Math.floor((Date.now() - startTime) / 1000)
    });
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
