# 🔧 CORS Error Fix Guide

## ❌ Error You're Seeing

```
Access to XMLHttpRequest at 'https://resume-builder04.onrender.com/api/auth/register' 
from origin 'https://resume-builder04-21.onrender.com' has been blocked by CORS policy
```

## 🔍 What This Means

Your backend (`resume-builder04.onrender.com`) is not allowing requests from your frontend (`resume-builder04-21.onrender.com`).

## ✅ Solution: Update Backend Environment Variable

### Step 1: Go to Render Dashboard

1. Go to https://dashboard.render.com
2. Click on your **Backend Service** (`resume-builder04`)

### Step 2: Update Environment Variable

1. Click on **"Environment"** tab (in the left sidebar)
2. Find the variable: `FRONTEND_URL_DEPLOYED`
3. **Update the value to:**
   ```
   https://resume-builder04-21.onrender.com
   ```
   **Important:**
   - ✅ Include `https://`
   - ✅ No trailing slash (`/`)
   - ✅ Exact match with your frontend URL

4. Click **"Save Changes"**

### Step 3: Redeploy Backend

After saving, Render will automatically redeploy. Or manually:
1. Go to **"Manual Deploy"** tab
2. Click **"Deploy latest commit"**
3. Wait for deployment to complete (~2-3 minutes)

### Step 4: Verify

1. Check backend logs to see: `Allowed CORS origins: [array with your frontend URL]`
2. Try registering again from frontend
3. Should work now! ✅

---

## 🔍 Verify Your URLs

**Your URLs:**
- Backend: `https://resume-builder04.onrender.com`
- Frontend: `https://resume-builder04-21.onrender.com`

**Backend Environment Variable Should Be:**
```
FRONTEND_URL_DEPLOYED=https://resume-builder04-21.onrender.com
```

---

## 📋 Complete Environment Variables Checklist

Make sure your **Backend** service has these environment variables:

| Variable | Value | Status |
|----------|-------|--------|
| `MONGO_URI` | Your MongoDB connection string | ✅ Required |
| `JWT_SECRET` | Your JWT secret key | ✅ Required |
| `FRONTEND_URL_DEPLOYED` | `https://resume-builder04-21.onrender.com` | ⚠️ **FIX THIS** |
| `FRONTEND_URL_LOCAL` | `http://localhost:5176` | Optional |
| `NODE_ENV` | `production` | Optional |
| `PORT` | (auto-set by Render) | Auto |

---

## 🐛 Troubleshooting

### Still Getting CORS Error?

1. **Check Backend Logs:**
   - Go to Backend service → "Logs" tab
   - Look for: `Allowed CORS origins:`
   - Verify your frontend URL is in the list

2. **Verify URL Format:**
   - ✅ Correct: `https://resume-builder04-21.onrender.com`
   - ❌ Wrong: `https://resume-builder04-21.onrender.com/` (trailing slash)
   - ❌ Wrong: `resume-builder04-21.onrender.com` (no https)
   - ❌ Wrong: `http://resume-builder04-21.onrender.com` (http instead of https)

3. **Clear Browser Cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or clear browser cache

4. **Check Network Tab:**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Try registering again
   - Check the request headers
   - Look for CORS-related errors

5. **Verify Backend is Running:**
   - Visit: `https://resume-builder04.onrender.com`
   - Should see: "API is working"

---

## 🔄 Alternative: Allow All Origins (NOT Recommended for Production)

If you want to quickly test (not secure for production):

Update backend `server.js` temporarily:
```javascript
app.use(cors({
    origin: '*',  // Allows all origins
    credentials: true
}));
```

**Then revert back to the secure version after testing!**

---

## ✅ After Fix

Once `FRONTEND_URL_DEPLOYED` is set correctly:
- ✅ CORS errors will disappear
- ✅ Frontend can communicate with backend
- ✅ Registration/login will work
- ✅ All API calls will succeed

---

## 📝 Quick Fix Summary

1. **Render Dashboard** → Backend Service
2. **Environment** tab
3. Set `FRONTEND_URL_DEPLOYED` = `https://resume-builder04-21.onrender.com`
4. **Save** → Auto-redeploys
5. **Test** → Should work! 🎉

---

**The code has been updated to better handle CORS and log allowed origins for debugging!**

