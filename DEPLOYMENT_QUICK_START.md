# ⚡ Quick Start - Render Deployment

## 🚀 Fast Deployment Steps

### 1️⃣ Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2️⃣ Deploy Backend (5 minutes)

1. Go to https://dashboard.render.com
2. **New +** → **Web Service**
3. Connect GitHub repo
4. **Settings:**
   - Name: `resume-builder-backend`
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
5. **Environment Variables:**
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL_DEPLOYED=(leave empty for now)
   ```
6. **Deploy** → Copy backend URL

### 3️⃣ Deploy Frontend (5 minutes)

1. **New +** → **Static Site**
2. Connect same GitHub repo
3. **Settings:**
   - Name: `resume-builder-frontend`
   - Root Directory: `frontend`
   - Build: `npm install && npm run build`
   - Publish: `dist`
4. **Environment Variables:**
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com
   ```
5. **Deploy** → Copy frontend URL

### 4️⃣ Update Backend CORS

1. Go to Backend service
2. **Environment** tab
3. Update `FRONTEND_URL_DEPLOYED` = your frontend URL
4. Save → Auto-redeploys

### 5️⃣ Test

- ✅ Backend: `https://your-backend.onrender.com` → "API is working"
- ✅ Frontend: `https://your-frontend.onrender.com` → App loads
- ✅ Try register/login → Should work!

---

## 🔑 Required Environment Variables

### Backend:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Random 64-char string
- `FRONTEND_URL_DEPLOYED` - Frontend URL (after deployment)

### Frontend:
- `VITE_API_BASE_URL` - Backend URL

---

## 📚 Full Guide

See `RENDER_DEPLOYMENT_GUIDE.md` for detailed instructions.

