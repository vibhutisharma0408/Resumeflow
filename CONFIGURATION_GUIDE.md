# Configuration Guide - Resume Builder

This guide lists all the keys, environment variables, and configuration settings you need to set up for both frontend and backend.

## 📋 Table of Contents
1. [Backend Configuration](#backend-configuration)
2. [Frontend Configuration](#frontend-configuration)
3. [Deployment Links](#deployment-links)
4. [Step-by-Step Setup](#step-by-step-setup)

---

## 🔧 Backend Configuration

### Required Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=5000

# MongoDB Database Connection
MONGO_URI=your_mongodb_connection_string_here

# JWT Secret Key (for authentication tokens)
JWT_SECRET=your_jwt_secret_key_here

# Frontend URLs (for CORS)
FRONTEND_URL_LOCAL=http://localhost:5176
FRONTEND_URL_DEPLOYED=https://your-deployed-frontend-url.com
```

### Details:

1. **PORT** (Default: 5000)
   - The port on which your backend server will run
   - Example: `5000` or `3000` or `8000`

2. **MONGO_URI** (Required)
   - Your MongoDB connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority`
   - Or for local MongoDB: `mongodb://localhost:27017/resume_builder`
   - Get this from MongoDB Atlas or your MongoDB instance

3. **JWT_SECRET** (Required)
   - A secret key used to sign and verify JWT tokens
   - Should be a long, random, secure string
   - Example: Generate using: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
   - **IMPORTANT**: Keep this secret and never commit it to version control

4. **FRONTEND_URL_LOCAL** (Optional)
   - Local development frontend URL
   - Default: `http://localhost:5176`

5. **FRONTEND_URL_DEPLOYED** (Required for production)
   - Your deployed frontend URL
   - Example: `https://your-app.vercel.app` or `https://your-app.netlify.app`

---

## 🎨 Frontend Configuration

### Required Environment Variables

Create a `.env` file in the `frontend/` directory with the following variables:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:5000

# For Production (update after deployment)
# VITE_API_BASE_URL=https://your-deployed-backend-url.com
```

### Details:

1. **VITE_API_BASE_URL** (Required)
   - The base URL of your backend API
   - For local development: `http://localhost:5000`
   - For production: `https://your-backend-api-url.com`
   - **Note**: In Vite, environment variables must be prefixed with `VITE_` to be accessible in the frontend

---

## 🌐 Deployment Links

### Backend Deployment

After deploying your backend (e.g., on Render, Railway, Heroku, etc.), you'll get a URL like:
- `https://your-backend-app.onrender.com`
- `https://your-backend-app.railway.app`
- `https://your-backend-app.herokuapp.com`

**Update these files:**
1. Backend `.env` file: Set `FRONTEND_URL_DEPLOYED` to your deployed frontend URL
2. Frontend `.env` file: Set `VITE_API_BASE_URL` to your deployed backend URL

### Frontend Deployment

After deploying your frontend (e.g., on Vercel, Netlify, etc.), you'll get a URL like:
- `https://your-frontend-app.vercel.app`
- `https://your-frontend-app.netlify.app`

**Update these files:**
1. Backend `.env` file: Set `FRONTEND_URL_DEPLOYED` to your deployed frontend URL
2. Backend `server.js`: Update CORS origins (or use environment variable - see below)

---

## 📝 Step-by-Step Setup

### 1. Backend Setup

1. Navigate to the `backend/` directory
2. Create a `.env` file:
   ```bash
   cd backend
   touch .env
   ```

3. Add the following to `.env`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL_LOCAL=http://localhost:5176
   FRONTEND_URL_DEPLOYED=https://your-deployed-frontend-url.com
   ```

4. Replace the placeholder values:
   - Get `MONGO_URI` from MongoDB Atlas or your MongoDB instance
   - Generate `JWT_SECRET` using: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
   - Update `FRONTEND_URL_DEPLOYED` after deploying your frontend

### 2. Frontend Setup

1. Navigate to the `frontend/` directory
2. Create a `.env` file:
   ```bash
   cd frontend
   touch .env
   ```

3. Add the following to `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. For production, update to:
   ```env
   VITE_API_BASE_URL=https://your-deployed-backend-url.com
   ```

### 3. Update Code Files

The following files need to be updated to use environment variables:

#### Backend: `server.js`
- Currently has hardcoded CORS origins
- Should use `FRONTEND_URL_LOCAL` and `FRONTEND_URL_DEPLOYED` from `.env`

#### Frontend: `src/utils/apiPaths.js`
- Currently has hardcoded `BASE_URL = "localhost:5000"`
- Should use `VITE_API_BASE_URL` from environment variables

---

## 🔐 Security Best Practices

1. **Never commit `.env` files to Git**
   - Add `.env` to `.gitignore`
   - Use `.env.example` files as templates

2. **Generate Strong Secrets**
   - Use long, random strings for JWT_SECRET
   - Minimum 32 characters, preferably 64+

3. **Use Different Secrets for Different Environments**
   - Development, Staging, and Production should have different secrets

4. **Protect MongoDB URI**
   - Use strong passwords
   - Restrict IP access in MongoDB Atlas
   - Use connection string with proper authentication

---

## ✅ Checklist

Before deploying, make sure you have:

- [ ] Created `backend/.env` with all required variables
- [ ] Created `frontend/.env` with `VITE_API_BASE_URL`
- [ ] Generated a secure `JWT_SECRET`
- [ ] Set up MongoDB and obtained `MONGO_URI`
- [ ] Updated CORS origins in backend for your frontend URL
- [ ] Updated frontend API base URL for production
- [ ] Added `.env` files to `.gitignore`
- [ ] Tested locally with environment variables
- [ ] Set environment variables in your deployment platform

---

## 🚀 Deployment Platform Environment Variables

When deploying, set these environment variables in your hosting platform:

### Backend (Render, Railway, Heroku, etc.)
- `PORT` (usually auto-set by platform)
- `MONGO_URI`
- `JWT_SECRET`
- `FRONTEND_URL_LOCAL` (optional)
- `FRONTEND_URL_DEPLOYED`

### Frontend (Vercel, Netlify, etc.)
- `VITE_API_BASE_URL`

---

## 📞 Need Help?

If you encounter issues:
1. Check that all environment variables are set correctly
2. Verify MongoDB connection string format
3. Ensure CORS origins match your frontend URL
4. Check that frontend API URL matches your backend URL
5. Review server logs for specific error messages

