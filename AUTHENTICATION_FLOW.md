# Authentication Flow - Complete Guide

## How It Works Now

### ✅ **Dashboard is Protected**
- Dashboard **ONLY opens after successful sign in**
- If you try to access `http://localhost:3002` without being logged in, you'll be redirected to `http://localhost:3000/login`
- Authentication is checked using the `/api/me` endpoint

### ✅ **Complete Flow**

1. **User visits Frontend** (`http://localhost:3000`)
2. **User clicks Sign Up or Sign In**
3. **After successful authentication:**
   - Backend sets an HTTP-only cookie with JWT token
   - User is redirected to Dashboard (`http://localhost:3002`)
4. **Dashboard checks authentication:**
   - ProtectedRoute component calls `/api/me` endpoint
   - If authenticated → Dashboard loads
   - If NOT authenticated → Redirects to login page
5. **User can logout:**
   - Click on profile in dashboard menu
   - Click "Logout" button
   - Redirects back to login page

## File Changes Made

### 1. **Dashboard - ProtectedRoute Component** (`dashboard/src/components/ProtectedRoute.js`)
- Checks authentication on dashboard load
- Shows loading spinner while checking
- Redirects to login if not authenticated

### 2. **Dashboard - Home Component** (`dashboard/src/components/Home.js`)
- Wrapped with ProtectedRoute
- Now requires authentication to access

### 3. **Dashboard - Menu Component** (`dashboard/src/components/Menu.js`)
- Added logout functionality
- Profile dropdown with logout button
- Click outside to close dropdown

### 4. **Backend - Cookie Settings** (`backend/index.js`)
- Fixed cookie settings for localhost:
  - `sameSite: "lax"` (works with localhost)
  - `secure: false` (for HTTP, not HTTPS)
  - `path: "/"` (available for all paths)
- Updated logout to properly clear cookies

## How to Test

### Step 1: Start All Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Runs on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

**Terminal 3 - Dashboard:**
```bash
cd dashboard
npm start
# Runs on http://localhost:3002
```

### Step 2: Test Authentication Flow

1. **Try accessing dashboard directly:**
   - Open `http://localhost:3002` in browser
   - ✅ Should redirect to `http://localhost:3000/login`

2. **Sign Up:**
   - Go to `http://localhost:3000/signup`
   - Create an account
   - ✅ Should redirect to `http://localhost:3002` (dashboard)
   - ✅ Dashboard should load with stocks

3. **Sign In:**
   - Go to `http://localhost:3000/login`
   - Enter credentials
   - ✅ Should redirect to `http://localhost:3002` (dashboard)
   - ✅ Dashboard should load

4. **Logout:**
   - In dashboard, click on profile (top right)
   - Click "Logout"
   - ✅ Should redirect to `http://localhost:3000/login`

5. **Try accessing dashboard after logout:**
   - Try `http://localhost:3002` again
   - ✅ Should redirect to login (not authenticated)

## Technical Details

### Authentication Check
- Dashboard uses `ProtectedRoute` component
- Calls `GET /api/me` with credentials
- Backend verifies JWT token from cookie
- Returns user info if authenticated

### Cookie Configuration
- **HttpOnly**: Prevents JavaScript access (security)
- **SameSite: "lax"**: Works with localhost cross-origin
- **Secure: false**: For HTTP (localhost)
- **Path: "/"**: Available for all routes
- **MaxAge: 7 days**: Token expires after 7 days

### CORS Configuration
Backend allows:
- `http://localhost:3000` (Frontend)
- `http://localhost:3002` (Dashboard)
- Credentials enabled for cookie sharing

## Troubleshooting

### Dashboard redirects to login immediately
- Check if backend is running on port 3001
- Check browser console for errors
- Verify cookie is being set (check browser DevTools → Application → Cookies)

### Login/Signup doesn't redirect
- Make sure dashboard server is running on port 3002
- Check browser console for errors
- Verify backend is running and responding

### "ERR_CONNECTION_REFUSED"
- Make sure all three servers are running
- Check ports: 3000 (frontend), 3001 (backend), 3002 (dashboard)
- Verify `.env` file in dashboard folder has `PORT=3002`

## Summary

✅ Dashboard is now **fully protected**  
✅ Only accessible after **successful sign in**  
✅ Automatic redirect to login if **not authenticated**  
✅ Logout functionality **works properly**  
✅ Backend serves **both frontend and dashboard**  
✅ Cookie-based authentication **working correctly**
