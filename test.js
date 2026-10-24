const { describe, it, after } = require('node:test');
const assert = require('node:assert');
const { app, server } = require('./index.js');

describe('Health endpoint', () => {
    // Close the server after all tests finish
    after(() => {
        server.close();
    });

    // Test that /health returns 200 and the expected body
    it('should return 200 and healthy status', async () => {
        const response = await fetch('http://localhost:3000/health');
        assert.strictEqual(response.status, 200);
        const body = await response.json();
        assert.strictEqual(body.status, 'healthy');
    });

    // Test that /status returns version and uptime info
    it('should return status info', async () => {
        const response = await fetch('http://localhost:3000/status');
        assert.strictEqual(response.status, 200);
        const body = await response.json();
        assert.strictEqual(body.version, '1.0.1');
        assert.ok(body.uptime >= 0);
        assert.ok(body.timestamp);
    });
});
