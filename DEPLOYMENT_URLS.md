# Deployment URLs Configuration

## Your Render Deployment URLs

Update these in your environment variables and configuration:

### Frontend Deployment
```
URL: https://zerodha-clone-frontend-08fo.onrender.com
Environment Variable: REACT_APP_API_URL
Environment Variable: REACT_APP_DASHBOARD_URL
```

### Backend Deployment
```
URL: https://zerodha-clone-api-h1jz.onrender.com
(Update if your actual backend URL is different)
```

### Dashboard Deployment
```
URL: https://zerodha-clone-dashboard-vd6u.onrender.com
```

## Backend Environment Variables (for Render)

Set these in your Backend service on Render:

```
NODE_ENV=production
FRONTEND_URL=https://zerodha-clone-frontend-08fo.onrender.com
DASHBOARD_URL=https://zerodha-clone-dashboard-vd6u.onrender.com
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

## Frontend Environment Variables (for Render)

Set these in your Frontend service on Render:

```
REACT_APP_API_URL=https://zerodha-clone-api-h1jz.onrender.com
REACT_APP_DASHBOARD_URL=https://zerodha-clone-dashboard-vd6u.onrender.com
```

## Dashboard Environment Variables (for Render)

Set these in your Dashboard service on Render:

```
PORT=3002
REACT_APP_API_URL=https://zerodha-clone-api-h1jz.onrender.com
```

## Important Notes

1. **If your backend URL is different**, update the REACT_APP_API_URL in frontend and dashboard .env files
2. **Make sure CORS is configured** in backend/index.js to include both frontend and dashboard URLs
3. **Cookies must have credentials: true** for authentication to work across different domains
4. **Clear browser cache** after deploying to ensure new .env variables are loaded

## Testing the Configuration

After setting these environment variables on Render:

1. Visit: https://zerodha-clone-frontend-08fo.onrender.com/signup
2. Create a new account or sign in
3. You should be redirected to: https://zerodha-clone-dashboard-vd6u.onrender.com
4. Dashboard should load with stock data
5. Sign out and verify redirect to login page

## Local Development Alternative

If you want to use .env files locally, they're now included in the project:

- `frontend/.env.local` - For development (uses localhost URLs)
- `dashboard/.env.local` - For development (uses localhost URLs)

These files are git-ignored and won't be deployed, so your Render deployments will use the backend environment variables you set in Render instead.
