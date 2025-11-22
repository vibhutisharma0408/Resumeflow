# 🚀 Setup Checklist - Resume Builder

Quick reference checklist for all configuration keys and settings you need to set up.

## ✅ Backend Configuration

### Create `backend/.env` file with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL_LOCAL=http://localhost:5176
FRONTEND_URL_DEPLOYED=https://your-deployed-frontend-url.com
```

**Where to get these values:**
- **PORT**: Use `5000` for local, or let your hosting platform set it automatically
- **MONGO_URI**: 
  - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - Create a cluster and database
  - Get connection string from "Connect" → "Connect your application"
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
- **JWT_SECRET**: 
  - Generate using: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
  - Or use any long random string (minimum 32 characters)
- **FRONTEND_URL_DEPLOYED**: Your deployed frontend URL (e.g., `https://your-app.vercel.app`)

---

## ✅ Frontend Configuration

### Create `frontend/.env` file with:

```env
VITE_API_BASE_URL=http://localhost:5000
```

**For Production:**
```env
VITE_API_BASE_URL=https://your-deployed-backend-url.com
```

**Where to get this value:**
- **Local**: `http://localhost:5000` (or whatever port your backend runs on)
- **Production**: Your deployed backend URL (e.g., `https://your-backend.onrender.com`)

---

## 📝 Files That Need Your Keys

### Backend Files Using Environment Variables:
1. ✅ `backend/server.js` - Uses `PORT`, `FRONTEND_URL_LOCAL`, `FRONTEND_URL_DEPLOYED`
2. ✅ `backend/config/db.js` - Uses `MONGO_URI`
3. ✅ `backend/middleware/authMiddleware.js` - Uses `JWT_SECRET`
4. ✅ `backend/controllers/userController.js` - Uses `JWT_SECRET`

### Frontend Files Using Environment Variables:
1. ✅ `frontend/src/utils/apiPaths.js` - Uses `VITE_API_BASE_URL`
2. ✅ `frontend/src/utils/axiosInstance.js` - Uses `BASE_URL` from apiPaths.js

---

## 🔄 After Deployment

### Step 1: Deploy Backend
1. Deploy backend to your hosting platform (Render, Railway, Heroku, etc.)
2. Set environment variables in your hosting platform's dashboard
3. Note your backend URL (e.g., `https://your-backend.onrender.com`)

### Step 2: Update Frontend
1. Update `frontend/.env` with your deployed backend URL:
   ```env
   VITE_API_BASE_URL=https://your-deployed-backend-url.com
   ```

### Step 3: Deploy Frontend
1. Deploy frontend to your hosting platform (Vercel, Netlify, etc.)
2. Set `VITE_API_BASE_URL` environment variable in your hosting platform
3. Note your frontend URL (e.g., `https://your-app.vercel.app`)

### Step 4: Update Backend CORS
1. Update `backend/.env` with your deployed frontend URL:
   ```env
   FRONTEND_URL_DEPLOYED=https://your-deployed-frontend-url.com
   ```
2. Redeploy backend (or restart if environment variables are updated automatically)

---

## 🔐 Security Reminders

- [ ] Never commit `.env` files to Git
- [ ] Add `.env` to `.gitignore` (check if it's already there)
- [ ] Use different secrets for development and production
- [ ] Keep your JWT_SECRET secure and long (64+ characters recommended)
- [ ] Use strong MongoDB passwords
- [ ] Restrict MongoDB IP whitelist in MongoDB Atlas

---

## 🧪 Testing Locally

1. **Start Backend:**
   ```bash
   cd backend
   npm install
   # Make sure .env file exists with all variables
   npm start
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   # Make sure .env file exists with VITE_API_BASE_URL
   npm run dev
   ```

3. **Verify:**
   - Backend should connect to MongoDB (check console logs)
   - Frontend should be able to make API calls to backend
   - Check browser console for any CORS errors

---

## 📋 Quick Command Reference

### Generate JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Check if .env files exist:
```bash
# Windows PowerShell
Test-Path backend\.env
Test-Path frontend\.env

# Linux/Mac
test -f backend/.env && echo "exists" || echo "missing"
test -f frontend/.env && echo "exists" || echo "missing"
```

---

## ❓ Common Issues

**Issue**: CORS errors in browser
- **Solution**: Make sure `FRONTEND_URL_DEPLOYED` in backend matches your actual frontend URL (no trailing slash)

**Issue**: Cannot connect to MongoDB
- **Solution**: Check `MONGO_URI` format, verify MongoDB Atlas IP whitelist includes your IP (or 0.0.0.0/0 for all)

**Issue**: Frontend can't reach backend
- **Solution**: Verify `VITE_API_BASE_URL` matches your backend URL exactly (include `http://` or `https://`)

**Issue**: JWT token errors
- **Solution**: Make sure `JWT_SECRET` is the same in all environments and is a valid string

---

## 📞 Summary

**You need to set up:**
1. ✅ Backend `.env` with: PORT, MONGO_URI, JWT_SECRET, FRONTEND_URL_LOCAL, FRONTEND_URL_DEPLOYED
2. ✅ Frontend `.env` with: VITE_API_BASE_URL
3. ✅ Update these values after deployment with your actual deployed URLs

**All code has been updated to use environment variables - no hardcoded values remain!**

