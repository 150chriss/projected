# 🚀 Deploy Frontend to Firebase (5 minutes)

## Prerequisites
- Backend deployed to Render (get the URL)
- Firebase CLI installed: `npm install -g firebase-tools`

## Step-by-Step Instructions

### 1. Install Firebase CLI (if not already)
```bash
npm install -g firebase-tools
firebase --version  # Should show version
```

### 2. Authenticate with Firebase
```bash
firebase login
```
- Opens browser to authenticate with Google
- Sign in with your Google account
- Close browser when done

### 3. Update Frontend Configuration
**IMPORTANT**: Update `frontend/.env.production` with your Render URL:

```
VITE_API_URL=https://crpms-api-xxxxx.onrender.com
```

(Replace `xxxxx` with your actual Render URL)

### 4. Build Frontend
```bash
cd frontend
npm run build
```

Check that `dist` folder is created.

### 5. Deploy to Firebase
```bash
firebase deploy
```

Firebase will show your live URL like: `https://your-project.web.app`

---

## Alternative: Use Deployment Script

Instead of manual commands, you can use the deployment script:

```bash
cd frontend
# Windows
deploy.bat

# Linux/Mac
chmod +x deploy.sh
./deploy.sh
```

---

## Test Your Deployment

1. **Open Firebase URL** in browser
2. **Should see login page**
3. **Open DevTools** (F12) → **Console**
4. **Check Network tab** - API calls should go to your Render URL
5. **Try logging in** - will fail due to database, but shows API is working

---

## Expected Issues

**API calls fail?**
- Database not connected yet (expected)
- Backend deployed but can't connect to local MySQL
- This is normal - you'll fix database later

**Blank page?**
- Check console for errors
- Verify VITE_API_URL is correct
- Check Firebase deployment logs

---

## Firebase Project Setup

If you don't have a Firebase project yet:

1. Go to https://console.firebase.google.com
2. Click **"Add project"**
3. Name: `crpms` (or your choice)
4. Enable Google Analytics (optional)
5. Create project

---

## Update Workflow

After initial deployment:

### Update Frontend
```bash
cd frontend
# Make changes...
npm run build
firebase deploy
```

### Update Backend
```bash
cd backend
# Make changes...
git add .
git commit -m "Update"
git push origin main
# Render auto-deploys!
```

---

**Ready? Follow the steps above to deploy your frontend!**
