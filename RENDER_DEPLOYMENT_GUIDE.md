# 🚀 Render Deployment Guide - Resume Builder

Complete step-by-step guide to deploy both frontend and backend on Render.

---

## 📋 Prerequisites

1. ✅ GitHub account (or GitLab/Bitbucket)
2. ✅ Render account (sign up at https://render.com)
3. ✅ MongoDB Atlas account (or your MongoDB connection string)
4. ✅ Your code pushed to a Git repository

---

## 🎯 Deployment Strategy

We'll deploy:
1. **Backend** as a Web Service
2. **Frontend** as a Static Site (or Web Service)

**Recommended Order:** Deploy backend first, then frontend (so you can use the backend URL in frontend config)

---

## 📦 Step 1: Prepare Your Repository

### 1.1 Push to GitHub

If not already done, push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit - Ready for deployment"
git branch -M main
git remote add origin https://github.com/yourusername/resume-builder.git
git push -u origin main
```

### 1.2 Verify Files

Make sure these files exist:
- ✅ `backend/package.json` (with `"start": "node server.js"`)
- ✅ `frontend/package.json` (with build scripts)
- ✅ `.gitignore` (with `.env` files excluded)

---

## 🔧 Step 2: Deploy Backend on Render

### 2.1 Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your repository

### 2.2 Configure Backend Service

**Basic Settings:**
- **Name:** `resume-builder-backend` (or your preferred name)
- **Region:** Choose closest to you
- **Branch:** `main` (or your default branch)
- **Root Directory:** `backend`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Advanced Settings:**
- **Plan:** Free (or paid if needed)
- **Auto-Deploy:** Yes (deploys on every push)

### 2.3 Set Environment Variables

Click on **"Environment"** tab and add:

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | |
| `PORT` | Leave empty (Render sets this automatically) | |
| `MONGO_URI` | `your_mongodb_connection_string` | From MongoDB Atlas |
| `JWT_SECRET` | `your_jwt_secret_key` | Generate a secure random string |
| `FRONTEND_URL_LOCAL` | `http://localhost:5176` | Optional, for local dev |
| `FRONTEND_URL_DEPLOYED` | Leave empty for now | We'll update after frontend deploys |

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2.4 Deploy Backend

1. Click **"Create Web Service"**
2. Wait for deployment (usually 2-5 minutes)
3. Once deployed, you'll get a URL like: `https://resume-builder-backend.onrender.com`
4. **Copy this URL** - you'll need it for frontend!

### 2.5 Test Backend

Visit your backend URL:
- Should see: "API is working"
- Test endpoint: `https://your-backend-url.onrender.com/api/auth/profile`
- Should return 401 (expected without auth)

---

## 🎨 Step 3: Deploy Frontend on Render

### 3.1 Create New Static Site (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository
4. Select your repository

### 3.2 Configure Frontend Service

**Basic Settings:**
- **Name:** `resume-builder-frontend` (or your preferred name)
- **Branch:** `main` (or your default branch)
- **Root Directory:** `frontend`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`

**Environment Variables:**
- **Key:** `VITE_API_BASE_URL`
- **Value:** `https://your-backend-url.onrender.com` (use your actual backend URL)

**Important:** 
- Remove `http://` or `https://` if you're using the full URL
- Or just use: `https://resume-builder-backend.onrender.com`

### 3.3 Deploy Frontend

1. Click **"Create Static Site"**
2. Wait for deployment (usually 2-5 minutes)
3. Once deployed, you'll get a URL like: `https://resume-builder-frontend.onrender.com`
4. **Copy this URL**

### 3.4 Alternative: Deploy as Web Service

If Static Site doesn't work, use Web Service:

1. Click **"New +"** → **"Web Service"**
2. **Root Directory:** `frontend`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run preview`
- **Environment Variables:** Same as above

---

## 🔄 Step 4: Update Backend CORS

Now that frontend is deployed, update backend CORS:

1. Go to your **Backend Service** on Render
2. Click **"Environment"** tab
3. Update `FRONTEND_URL_DEPLOYED`:
   - Value: `https://your-frontend-url.onrender.com`
4. Click **"Save Changes"**
5. Render will automatically redeploy

**Or** manually redeploy:
- Go to **"Manual Deploy"** → **"Deploy latest commit"**

---

## ✅ Step 5: Verify Deployment

### Test Backend:
1. Visit: `https://your-backend-url.onrender.com`
2. Should see: "API is working"

### Test Frontend:
1. Visit: `https://your-frontend-url.onrender.com`
2. Should load your app
3. Try to register/login
4. Check browser console (F12) for errors

### Test Connection:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to register a new user
4. Should see API calls to your backend
5. No CORS errors should appear

---

## 🔧 Troubleshooting

### Backend Issues

**Problem:** Backend won't start
- ✅ Check `package.json` has `"start": "node server.js"` (not nodemon)
- ✅ Verify all environment variables are set
- ✅ Check Render logs for errors

**Problem:** MongoDB connection fails
- ✅ Verify `MONGO_URI` is correct
- ✅ Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for all IPs)
- ✅ Verify database user credentials

**Problem:** CORS errors
- ✅ Check `FRONTEND_URL_DEPLOYED` matches your frontend URL exactly
- ✅ No trailing slash in the URL
- ✅ Include `https://` in the URL

### Frontend Issues

**Problem:** Frontend shows blank page
- ✅ Check `VITE_API_BASE_URL` is set correctly
- ✅ Verify build completed successfully
- ✅ Check browser console for errors

**Problem:** Can't connect to backend
- ✅ Verify `VITE_API_BASE_URL` matches your backend URL
- ✅ Check backend is running and accessible
- ✅ Verify CORS is configured correctly

**Problem:** Environment variable not working
- ✅ Vite requires `VITE_` prefix
- ✅ Rebuild after changing env vars
- ✅ Check variable name is exactly `VITE_API_BASE_URL`

---

## 📝 Environment Variables Summary

### Backend (Render Dashboard):
```
NODE_ENV=production
PORT=(auto-set by Render)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL_LOCAL=http://localhost:5176
FRONTEND_URL_DEPLOYED=https://your-frontend-url.onrender.com
```

### Frontend (Render Dashboard):
```
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

---

## 🎯 Quick Deployment Checklist

### Before Deployment:
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas account ready
- [ ] MongoDB connection string ready
- [ ] JWT secret generated
- [ ] Backend `package.json` has production start script

### Backend Deployment:
- [ ] Created Web Service on Render
- [ ] Set root directory to `backend`
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`
- [ ] Added all environment variables
- [ ] Backend deployed successfully
- [ ] Backend URL copied

### Frontend Deployment:
- [ ] Created Static Site (or Web Service) on Render
- [ ] Set root directory to `frontend`
- [ ] Set build command: `npm install && npm run build`
- [ ] Set publish directory: `dist`
- [ ] Added `VITE_API_BASE_URL` environment variable
- [ ] Frontend deployed successfully
- [ ] Frontend URL copied

### After Deployment:
- [ ] Updated backend `FRONTEND_URL_DEPLOYED` with frontend URL
- [ ] Backend redeployed
- [ ] Tested backend endpoint
- [ ] Tested frontend in browser
- [ ] Tested user registration/login
- [ ] No CORS errors
- [ ] Everything working! 🎉

---

## 💡 Pro Tips

1. **Free Tier Limitations:**
   - Services spin down after 15 minutes of inactivity
   - First request after spin-down takes ~30 seconds
   - Consider upgrading for production use

2. **Custom Domain:**
   - Render allows custom domains on free tier
   - Add your domain in service settings

3. **Environment Variables:**
   - Use Render's environment variable sync for secrets
   - Never commit `.env` files to Git

4. **Monitoring:**
   - Check Render logs regularly
   - Set up alerts for service failures

5. **Database:**
   - MongoDB Atlas free tier is perfect for this
   - Consider upgrading for production traffic

---

## 📞 Need Help?

If you encounter issues:
1. Check Render service logs
2. Check browser console for frontend errors
3. Verify all environment variables are set
4. Test backend API directly (Postman/curl)
5. Check MongoDB connection
6. Verify CORS configuration

---

## 🎉 Success!

Once everything is deployed:
- ✅ Backend: `https://your-backend.onrender.com`
- ✅ Frontend: `https://your-frontend.onrender.com`
- ✅ Both services communicating
- ✅ Users can register/login
- ✅ Resume builder fully functional

**Congratulations! Your full-stack app is live! 🚀**

