# 🔧 Fix for "Failed to load dashboard" Error

## The Problem

You're seeing: **"Failed to load dashboard: Request failed with status code 500"**

## The Solution

The Vite dev server needs to be **restarted** to pick up the proxy configuration changes.

### Steps to Fix

1. **Stop the current dev server**
   - Press `Ctrl+C` in the terminal running `npm run dev`

2. **Restart both servers together**
   ```bash
   npm run dev:full
   ```

   OR restart them separately:
   
   **Terminal 1:**
   ```bash
   npm run mock-api
   ```
   
   **Terminal 2:**
   ```bash
   npm run dev
   ```

3. **Navigate to the dashboard**
   - http://localhost:5173/dash/infra-overview

## Why This Happens

The `vite.config.ts` proxy configuration was added after the dev server started. Vite only reads the config on startup, so it needs to be restarted to enable the proxy that forwards `/api/*` requests to `http://localhost:3001`.

## Verify It's Working

After restarting, you should see the dashboard load successfully with all widgets rendering from the API configuration.

### Expected Console Output (Mock Server)
```
🚀 Mock API server running on http://localhost:3001

Available endpoints:
  GET /api/dashboards           - List all dashboards
  GET /api/dashboards/:id       - Get dashboard config

Available dashboards:
  - infra-overview: http://localhost:5173/dash/infra-overview
  - app-metrics: http://localhost:5173/dash/app-metrics
```

### Expected Console Output (Vite Dev Server)
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Still Having Issues?

Check:
1. ✅ Mock server is running on port 3001
2. ✅ Vite dev server is running on port 5173
3. ✅ Both servers were started/restarted
4. ✅ Browser cache is cleared (Ctrl+Shift+R)

## Quick Test

Test the API directly:
```bash
curl http://localhost:3001/api/dashboards/infra-overview
```

Should return JSON config.

Test through the proxy:
```bash
curl http://localhost:5173/api/dashboards/infra-overview
```

Should return the same JSON (proxied).
