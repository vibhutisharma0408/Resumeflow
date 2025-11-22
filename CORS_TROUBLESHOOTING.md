# 🔧 CORS Troubleshooting - Step by Step

## ❌ Still Getting CORS Error?

If you're still seeing CORS errors after setting the environment variable, follow these steps:

---

## Step 1: Verify Environment Variable in Render

1. Go to **Render Dashboard** → Your **Backend Service**
2. Click **"Environment"** tab
3. **Check if `FRONTEND_URL_DEPLOYED` exists and has the correct value:**
   ```
   https://resume-builder04-21.onrender.com
   ```
4. **Important checks:**
   - ✅ Variable name is exactly: `FRONTEND_URL_DEPLOYED` (case-sensitive)
   - ✅ Value starts with `https://`
   - ✅ Value has NO trailing slash
   - ✅ Value matches your frontend URL exactly

---

## Step 2: Check Backend Logs

1. Go to **Backend Service** → **"Logs"** tab
2. Look for these log messages:
   ```
   === CORS Configuration ===
   Allowed CORS origins: [...]
   FRONTEND_URL_DEPLOYED: https://resume-builder04-21.onrender.com
   ```

3. **What to check:**
   - Is `FRONTEND_URL_DEPLOYED` showing in logs? (If `undefined`, variable not set)
   - Is your frontend URL in the "Allowed CORS origins" array?
   - Are you seeing "CORS BLOCKED origin" messages?

---

## Step 3: Manual Redeploy

After setting/updating the environment variable:

1. Go to **"Manual Deploy"** tab
2. Click **"Deploy latest commit"**
3. Wait for deployment to complete
4. Check logs again

**Why?** Sometimes Render doesn't auto-redeploy when env vars change.

---

## Step 4: Verify Frontend Environment Variable

Make sure your **Frontend** service has:

**Environment Variable:**
- Key: `VITE_API_BASE_URL`
- Value: `https://resume-builder04.onrender.com`

**Why?** Frontend needs to know where the backend is.

---

## Step 5: Test Backend Directly

Test if backend is accessible:

1. Open browser and go to: `https://resume-builder04.onrender.com`
2. Should see: "API is working"

2. Test CORS with curl (optional):
   ```bash
   curl -X OPTIONS https://resume-builder04.onrender.com/api/auth/login \
     -H "Origin: https://resume-builder04-21.onrender.com" \
     -H "Access-Control-Request-Method: POST" \
     -v
   ```
   Should see `Access-Control-Allow-Origin` header in response.

---

## Step 6: Clear Browser Cache

1. Open browser DevTools (F12)
2. Right-click refresh button → "Empty Cache and Hard Reload"
3. Or use: `Ctrl+Shift+Delete` → Clear cache

---

## Step 7: Check Network Tab

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Try to register/login
4. Look for the failed request
5. Click on it → Check **Headers** tab:
   - **Request Headers:** Should have `Origin: https://resume-builder04-21.onrender.com`
   - **Response Headers:** Should have `Access-Control-Allow-Origin`

---

## 🔍 Common Issues & Fixes

### Issue 1: Environment Variable Not Set
**Symptom:** Logs show `FRONTEND_URL_DEPLOYED: undefined`
**Fix:** Set the variable in Render dashboard

### Issue 2: Wrong URL Format
**Symptom:** Variable set but CORS still blocked
**Fix:** 
- ✅ Correct: `https://resume-builder04-21.onrender.com`
- ❌ Wrong: `https://resume-builder04-21.onrender.com/` (trailing slash)
- ❌ Wrong: `resume-builder04-21.onrender.com` (no https)
- ❌ Wrong: `http://resume-builder04-21.onrender.com` (http not https)

### Issue 3: Backend Not Redeployed
**Symptom:** Variable set but old code still running
**Fix:** Manually redeploy backend

### Issue 4: Typo in Variable Name
**Symptom:** Variable not found
**Fix:** Check exact spelling: `FRONTEND_URL_DEPLOYED` (all caps, underscores)

---

## 🚨 Emergency Fix: Temporarily Allow All Origins

**⚠️ WARNING: Only for testing! Not secure for production!**

If nothing works, temporarily allow all origins to test:

1. Update `backend/server.js`:
```javascript
app.use(cors({
    origin: '*',  // Allows all origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

2. Push to GitHub
3. Render will auto-deploy
4. Test if it works
5. **Then fix properly** with environment variable
6. **Revert the change** after fixing

---

## ✅ Verification Checklist

After fixing, verify:

- [ ] `FRONTEND_URL_DEPLOYED` is set in Render dashboard
- [ ] Backend logs show the correct frontend URL
- [ ] Backend has been redeployed after setting variable
- [ ] Frontend `VITE_API_BASE_URL` is set correctly
- [ ] Browser cache cleared
- [ ] Network tab shows `Access-Control-Allow-Origin` header
- [ ] Registration/login works without CORS errors

---

## 📞 Still Not Working?

If you've tried everything:

1. **Share backend logs** (especially the CORS configuration section)
2. **Share frontend environment variables** (screenshot)
3. **Share backend environment variables** (screenshot - hide sensitive values)
4. **Share Network tab** screenshot showing the failed request

---

**The updated code now has better logging to help debug CORS issues!**

