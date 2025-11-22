# 🔧 Frontend Deployment Fix - Render

## ❌ Problem
Render is trying to run `dist` as a command, but it's a directory. This happens when:
- Frontend is deployed as **Web Service** instead of **Static Site**
- Start command is incorrectly configured

## ✅ Solution

### Option 1: Deploy as Static Site (Recommended)

1. **Delete the current frontend service** on Render dashboard
2. **Create a new Static Site:**
   - Go to Render Dashboard
   - Click **"New +"** → **"Static Site"**
   - Connect your GitHub repository
   - **Settings:**
     - **Name:** `resume-builder-frontend`
     - **Branch:** `main`
     - **Root Directory:** `frontend` (leave empty if root is frontend folder)
     - **Build Command:** `npm install && npm run build`
     - **Publish Directory:** `dist`
   - **Environment Variables:**
     - **Key:** `VITE_API_BASE_URL`
     - **Value:** `https://your-backend-url.onrender.com`
3. **Deploy**

### Option 2: Fix Web Service Configuration

If you want to keep it as Web Service:

1. Go to your Frontend service on Render
2. **Settings** → **Build & Deploy**
3. **Build Command:** `cd frontend && npm install && npm run build`
4. **Start Command:** `cd frontend && npm run preview`
5. **Root Directory:** `frontend` (or leave empty)
6. Save and redeploy

### Option 3: Use serve package (Alternative)

If `vite preview` doesn't work, add serve:

1. Update `frontend/package.json`:
```json
"scripts": {
  "preview": "vite preview",
  "serve": "npx serve -s dist -l 10000"
}
```

2. Use start command: `cd frontend && npm run serve`

---

## 🎯 Recommended: Static Site

**Why Static Site?**
- ✅ Faster deployment
- ✅ Lower cost (free tier)
- ✅ No server needed
- ✅ Perfect for React/Vite apps
- ✅ Automatic CDN distribution

**Configuration:**
- **Type:** Static Site
- **Build:** `npm install && npm run build`
- **Publish:** `dist`
- **No Start Command needed!**

---

## 📝 Quick Fix Steps

1. **Delete current frontend service** on Render
2. **Create Static Site** with these settings:
   ```
   Build Command: npm install && npm run build
   Publish Directory: dist
   Environment Variable: VITE_API_BASE_URL = your-backend-url
   ```
3. **Deploy** → Should work! ✅

---

## ✅ After Fix

Your frontend should:
- ✅ Build successfully
- ✅ Deploy without errors
- ✅ Serve static files from `dist/` folder
- ✅ Connect to your backend API

---

**The updated `render.yaml` now uses Static Site type for frontend!**

