# Zerodha Clone - Startup Guide

## Important: Port Configuration

- **Frontend**: `http://localhost:3000` (default React port)
- **Backend**: `http://localhost:3001` (configured in backend/index.js)
- **Dashboard**: `http://localhost:3002` (configured in dashboard/.env)

## How to Start the Application

### Step 1: Start Backend Server
```bash
cd backend
npm install  # if not already done
npm start
```
Backend will run on **http://localhost:3001**

### Step 2: Start Frontend
```bash
cd frontend
npm install  # if not already done
npm start
```
Frontend will run on **http://localhost:3000**

### Step 3: Start Dashboard
```bash
cd dashboard
npm install  # if not already done
npm start
```
Dashboard will run on **http://localhost:3002**

## Troubleshooting

### If Dashboard shows "ERR_CONNECTION_REFUSED":
1. Make sure you've started the dashboard server (Step 3 above)
2. Check if port 3002 is already in use:
   ```bash
   netstat -ano | findstr :3002
   ```
3. Verify dashboard/.env file exists and contains:
   ```
   PORT=3002
   ```

### If Login/Signup redirect fails:
1. Make sure all three servers are running
2. Try accessing dashboard directly: http://localhost:3002
3. Check browser console for errors

### If you see CORS errors:
- Make sure backend is running on port 3001
- Backend CORS is configured to allow:
  - http://localhost:3000 (frontend)
  - http://localhost:3002 (dashboard)

## Quick Test

1. Open http://localhost:3000 in your browser
2. Click Sign Up or Sign In
3. After successful authentication, you'll be redirected to http://localhost:3002
4. Dashboard should display stocks and be fully responsive

## Notes

- Dashboard is accessible without authentication (for now)
- All three servers must be running simultaneously
- Make sure MongoDB is running if using database
