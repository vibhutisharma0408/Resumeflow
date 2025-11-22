# 🔑 Environment Variables Summary

## Quick Reference - All Keys You Need to Set

---

## 📦 BACKEND Environment Variables

**File Location:** `backend/.env`

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | `5000` | ✅ Yes |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority` | ✅ Yes |
| `JWT_SECRET` | Secret key for JWT tokens | `your-64-character-random-string-here` | ✅ Yes |
| `FRONTEND_URL_LOCAL` | Local frontend URL for CORS | `http://localhost:5176` | ⚠️ Optional |
| `FRONTEND_URL_DEPLOYED` | Deployed frontend URL for CORS | `https://your-app.vercel.app` | ✅ Yes (for production) |

### Backend .env Template:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/resume_builder?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_minimum_32_characters_long
FRONTEND_URL_LOCAL=http://localhost:5176
FRONTEND_URL_DEPLOYED=https://your-deployed-frontend-url.com
```

---

## 🎨 FRONTEND Environment Variables

**File Location:** `frontend/.env`

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000` (local) or `https://your-backend.onrender.com` (production) | ✅ Yes |

### Frontend .env Template:
```env
# For local development:
VITE_API_BASE_URL=http://localhost:5000

# For production (after deploying backend):
# VITE_API_BASE_URL=https://your-deployed-backend-url.com
```

---

## 🔍 Where These Variables Are Used

### Backend Code:
- ✅ `backend/server.js` → Uses `PORT`, `FRONTEND_URL_LOCAL`, `FRONTEND_URL_DEPLOYED`
- ✅ `backend/config/db.js` → Uses `MONGO_URI`
- ✅ `backend/middleware/authMiddleware.js` → Uses `JWT_SECRET`
- ✅ `backend/controllers/userController.js` → Uses `JWT_SECRET`

### Frontend Code:
- ✅ `frontend/src/utils/apiPaths.js` → Uses `VITE_API_BASE_URL`
- ✅ `frontend/src/utils/axiosInstance.js` → Uses `BASE_URL` (from apiPaths.js)

---

## 🚀 Deployment URLs

### After Deploying Backend:
You'll get a URL like:
- `https://your-backend.onrender.com`
- `https://your-backend.railway.app`
- `https://your-backend.herokuapp.com`

**Action Required:**
1. Update `frontend/.env`: Set `VITE_API_BASE_URL` to your backend URL
2. Set `VITE_API_BASE_URL` in your frontend hosting platform's environment variables

### After Deploying Frontend:
You'll get a URL like:
- `https://your-app.vercel.app`
- `https://your-app.netlify.app`

**Action Required:**
1. Update `backend/.env`: Set `FRONTEND_URL_DEPLOYED` to your frontend URL
2. Set `FRONTEND_URL_DEPLOYED` in your backend hosting platform's environment variables
3. Redeploy backend (or restart if env vars auto-update)

---

## 📝 Step-by-Step Setup

### 1. Local Development Setup

**Backend:**
```bash
cd backend
# Create .env file
echo "PORT=5000" > .env
echo "MONGO_URI=your_mongodb_uri_here" >> .env
echo "JWT_SECRET=your_jwt_secret_here" >> .env
echo "FRONTEND_URL_LOCAL=http://localhost:5176" >> .env
echo "FRONTEND_URL_DEPLOYED=" >> .env
```

**Frontend:**
```bash
cd frontend
# Create .env file
echo "VITE_API_BASE_URL=http://localhost:5000" > .env
```

### 2. Generate JWT Secret

Run this command to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET` value.

### 3. Get MongoDB URI

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or use `0.0.0.0/0` for all IPs - less secure)
5. Click "Connect" → "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your database user password
8. Replace `<dbname>` with your database name (e.g., `resume_builder`)

---

## ✅ Verification Checklist

Before deploying, verify:

- [ ] `backend/.env` file exists with all 5 variables
- [ ] `frontend/.env` file exists with `VITE_API_BASE_URL`
- [ ] MongoDB connection string is valid and accessible
- [ ] JWT_SECRET is a long random string (64+ characters recommended)
- [ ] Backend starts without errors
- [ ] Frontend can connect to backend (check browser console)
- [ ] No CORS errors in browser console
- [ ] `.env` files are in `.gitignore` (already done ✅)

---

## 🔄 After Deployment

### Update These Values:

1. **Backend .env** (or hosting platform env vars):
   - `FRONTEND_URL_DEPLOYED` = Your deployed frontend URL

2. **Frontend .env** (or hosting platform env vars):
   - `VITE_API_BASE_URL` = Your deployed backend URL

3. **Redeploy** both frontend and backend after updating URLs

---

## 🛠️ Code Changes Made

I've updated the code to use environment variables:

1. ✅ **backend/server.js** - Now uses `FRONTEND_URL_LOCAL` and `FRONTEND_URL_DEPLOYED` from env
2. ✅ **frontend/src/utils/apiPaths.js** - Now uses `VITE_API_BASE_URL` from env

**No more hardcoded URLs!** Everything is now configurable via environment variables.

---

## 📚 Additional Resources

- See `CONFIGURATION_GUIDE.md` for detailed explanations
- See `SETUP_CHECKLIST.md` for a quick checklist
- MongoDB Atlas Setup: https://www.mongodb.com/docs/atlas/getting-started/
- Vite Environment Variables: https://vitejs.dev/guide/env-and-mode.html

---

## ❗ Important Notes

1. **Never commit `.env` files** - They're already in `.gitignore` ✅
2. **Use different secrets** for development and production
3. **Keep JWT_SECRET secure** - Don't share it publicly
4. **Update CORS URLs** after deployment to avoid CORS errors
5. **Test locally first** before deploying

---

**You're all set!** Create your `.env` files and start coding! 🚀

