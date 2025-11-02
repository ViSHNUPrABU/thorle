# Quick Fix - Mock Server Setup

## Issue
The mock API server file was renamed to `.cjs` to work with the ES module setup.

## Solution

### Updated Commands

```bash
# Start mock API server
npm run mock-api

# Start both servers
npm run dev:full

# Or manually
node mock-api-server.cjs
```

### Files Changed
- `mock-api-server.js` → `mock-api-server.cjs`
- `package.json` scripts updated

### To Test

1. **Start the mock server** (in a new terminal):
```bash
npm run mock-api
```

You should see:
```
🚀 Mock API server running on http://localhost:3001

Available endpoints:
  GET /api/dashboards           - List all dashboards
  GET /api/dashboards/:id       - Get dashboard config

Available dashboards:
  - infra-overview: http://localhost:5173/dash/infra-overview
  - app-metrics: http://localhost:5173/dash/app-metrics
```

2. **Start the frontend** (in another terminal):
```bash
npm run dev
```

3. **Navigate to**:
- http://localhost:5173/dash/infra-overview
- http://localhost:5173/dash/app-metrics

## Common Issues

### "Failed to load dashboard: Request failed with status code 500"

**Cause**: Mock API server not running

**Fix**: Make sure you started the mock server:
```bash
npm run mock-api
```

### "EADDRINUSE: address already in use"

**Cause**: Port 3001 is already in use

**Fix**: Kill the process using port 3001 or change the port in `mock-api-server.cjs`

### Module errors

**Cause**: The mock server uses CommonJS syntax

**Fix**: Use the `.cjs` file extension (already done)

## All-in-One Start

For the best experience, use:
```bash
npm run dev:full
```

This starts both servers together using `concurrently`.
