# Quick Start: Deploy with Firebase & Render

## Step 1: Prepare Backend (Render)

### 1.1 Push to GitHub
```bash
cd backend
git add .
git commit -m "Prepare backend for Render deployment"
git push origin main
```

### 1.2 Create Render Account & Service
1. Go to https://render.com and sign up
2. Click **New** → **Web Service**
3. Connect your GitHub account and select your repository
4. Fill in service details:
   - **Name**: crpms-api
   - **Region**: Choose nearest to your location
   - **Branch**: main
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 1.3 Add Environment Variables
Before deploying, add these to Render dashboard:
```
DB_HOST=your_database_host
DB_USER=your_database_user  
DB_PASSWORD=your_database_password
DB_NAME=CRPMS
JWT_SECRET=generate-a-random-string-here
NODE_ENV=production
PORT=5000
```

**⚠️ Important Database Options:**
- **Option A (Recommended)**: Use cloud database (MySQL Hostinger, AWS RDS, PlanetScale)
- **Option B**: Keep local MySQL and expose it (complex)
- **Option C**: Deploy later after setting up cloud database

### 1.4 Deploy
- Click **Create Web Service**
- Render will automatically deploy
- Your URL will be like: `https://crpms-api.onrender.com`

---

## Step 2: Prepare Frontend (Firebase)

### 2.1 Install Firebase CLI
```bash
npm install -g firebase-tools
firebase --version  # Verify installation
```

### 2.2 Authenticate with Firebase
```bash
firebase login
```
This opens browser to authenticate with Google

### 2.3 Update Backend URL
Edit `frontend/.env.production`:
```
VITE_API_URL=https://crpms-api.onrender.com
```
(Replace with your actual Render URL)

### 2.4 Build Frontend
```bash
cd frontend
npm install
npm run build
```
Check that `dist` folder is created

### 2.5 Deploy to Firebase
```bash
firebase deploy
```

---

## Step 3: Verify Deployments

### Test Frontend
- Visit your Firebase hosting URL
- Should see login page
- Check browser console for any API errors

### Test Backend API
```bash
curl https://crpms-api.onrender.com
# Should return: {"message":"CRPMS API running"}
```

### Test Authentication Flow
1. Login with credentials
2. Check Network tab to verify API calls go to Render URL
3. Verify tokens are being sent correctly

---

## Troubleshooting

### Backend won't deploy
- Check build logs in Render dashboard
- Verify `npm start` works locally
- Check database connection in environment variables

### Frontend shows blank page
- Check browser console for errors
- Verify API URL in Network tab
- Check Firebase deployment logs

### API calls failing
- Verify Render URL in `.env.production`
- Check CORS settings (already enabled)
- Verify backend environment variables
- Check database is accessible

### Database connection errors
- Verify credentials are correct
- If local MySQL, ensure remote access is enabled
- Test connection locally first

---

## Update Workflow

After initial deployment, updates are automatic:
- **Backend**: Push to GitHub → Render auto-deploys
- **Frontend**: Push to GitHub → Run `npm run build && firebase deploy`

---

## Monitoring

**Render Dashboard**: https://dashboard.render.com
- View logs
- Restart service
- Modify environment variables

**Firebase Console**: https://console.firebase.google.com
- Monitor hosting
- View analytics
- Add custom domain

---

## Next Steps

1. Set up custom domain (optional)
2. Add database backups
3. Configure error monitoring
4. Set up CI/CD pipeline for testing
