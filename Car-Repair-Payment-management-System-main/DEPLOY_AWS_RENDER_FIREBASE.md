# 🚀 DEPLOYMENT GUIDE - AWS RDS + Render + Firebase

## Complete Step-by-Step Deployment

Follow these steps in order. Each section is ~5-10 minutes.

---

## Step 1: Set Up Git & Push to GitHub (5 min) 

### 1a. Create GitHub Repository
1. Go to https://github.com/new
2. Fill in:
   - **Repository name**: `Car-Repair-Management-System`
   - **Description**: CRPMS Production Deployment
   - **Public** (so Render can access)
3. Click **Create repository**
4. Copy the URL (like `https://github.com/yourusername/Car-Repair-Management-System.git`)

### 1b. Push Local Code to GitHub
```bash
cd c:\Users\user\OneDrive\Videos\Car-Repair-Payment-management-System-main

git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git branch -M main
git push -u origin main
```

**Status**: ✅ Your code is on GitHub

---

## Step 2: Set Up AWS RDS Database (10 min)

### 2a. Create AWS Account (if needed)
- Go to https://aws.amazon.com
- Click **Sign Up**
- Follow instructions
- Select **Free Tier** if eligible

### 2b. Create RDS Database
1. Go to AWS Console → Search "RDS"
2. Click **Create database**
3. Choose:
   - **Engine**: MySQL
   - **Version**: MySQL 8.0 (or latest compatible)
   - **Template**: Free tier
   - **DB instance identifier**: `crpms-db`
   - **Master username**: `admin`
   - **Master password**: (choose strong password)
4. **Connectivity**:
   - **Public accessibility**: YES (so Render can access)
5. Click **Create database**
6. Wait 5-10 minutes for creation...

### 2c. Get Connection Details
Once created:
1. Click your database instance
2. Copy **Endpoint** (looks like: `crpms-db.xxxxx.us-east-1.rds.amazonaws.com`)
3. Copy **Port** (usually 3306)
4. Note your **Username** (admin)
5. Remember your **Password**

### 2d. Import Your Data
Once database is ready:
```bash
# Export from local
mysqldump -u root CRPMS > backup.sql

# Import to AWS RDS
mysql -h crpms-db.xxxxx.us-east-1.rds.amazonaws.com -u admin -p CRPMS < backup.sql

# Enter password when prompted
```

**Status**: ✅ Database is on AWS RDS with your data

---

## Step 3: Deploy Backend to Render (5 min)

### 3a. Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize GitHub connection

### 3b. Create Web Service
1. Go to Render Dashboard
2. Click **New +** → **Web Service**
3. Select your GitHub repository
4. Fill in:
   - **Name**: `crpms-api`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Region**: Select closest to your location (e.g., N. Virginia)

### 3c. Add Environment Variables
Before clicking "Create", go to **Environment** section and add:

```
DB_HOST=crpms-db.xxxxx.us-east-1.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=your-password
DB_NAME=CRPMS
JWT_SECRET=use-this-generator-below
NODE_ENV=production
PORT=5000
```

### Generate JWT_SECRET
Open PowerShell and run:
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

Copy the output → Paste in JWT_SECRET field

### 3d. Deploy
1. Click **Create Web Service**
2. Wait for deployment (2-3 minutes)
3. Once deployed, you'll see a URL like: `https://crpms-api-xxxxx.onrender.com`
4. **Copy this URL** - you'll need it next!

### 3e. Test Backend
```bash
curl https://crpms-api-xxxxx.onrender.com
```
Should return: `{"message":"CRPMS API running"}`

**Status**: ✅ Backend is deployed on Render

---

## Step 4: Deploy Frontend to Firebase (5 min)

### 4a. Install Firebase CLI (if not already)
```bash
npm install -g firebase-tools
firebase login
```

### 4b. Update Frontend Configuration
Edit `frontend/.env.production`:
```
VITE_API_URL=https://crpms-api-xxxxx.onrender.com
```
(Replace with your actual Render URL from Step 3d)

### 4c. Build & Deploy
```bash
cd frontend
npm run build
firebase deploy
```

Firebase will show your live URL like: `https://your-project.web.app`

**Status**: ✅ Frontend is deployed on Firebase

---

## Step 5: Test Everything (2 min)

### Test Frontend
1. Open Firebase URL in browser
2. You should see login page
3. Try logging in with test credentials
4. Open DevTools (F12) → **Network** tab
5. Check that API calls go to your Render URL
6. Verify no 404 or CORS errors

### Full Test Checklist
- [ ] Frontend loads
- [ ] Login page shows
- [ ] Can login
- [ ] Dashboard loads
- [ ] Can see cars
- [ ] Can see payments
- [ ] Can add records
- [ ] Network shows calls to Render

---

## 📊 Your Deployed Architecture

```
https://your-project.web.app (React + Firebase)
    ↓ (API calls)
https://crpms-api-xxxxx.onrender.com (Node.js + Render)
    ↓ (Database queries)
crpms-db.xxxxx.us-east-1.rds.amazonaws.com (MySQL + AWS)
```

---

## 🔄 Update Workflow

### Update Backend
```bash
cd backend
# Make your changes...
git add .
git commit -m "Update: your changes"
git push origin main
# Render auto-deploys!
```

### Update Frontend
```bash
cd frontend
# Make your changes...
npm run build
firebase deploy
```

---

## Dashboard Links

- **Render**: https://dashboard.render.com
- **Firebase**: https://console.firebase.google.com
- **AWS**: https://console.aws.amazon.com
- **GitHub**: https://github.com

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check Render logs, verify AWS RDS is accessible |
| Can't connect to DB | Check AWS RDS security group allows inbound on port 3306 |
| Frontend shows blank | Check console for errors, verify VITE_API_URL |
| API returns 500 | Check Render logs for database connection errors |
| CORS errors | Already configured, check browser console |

---

## Summary

✅ **Total Time**: ~30-40 minutes
- GitHub setup: 5 min
- AWS RDS: 15 min (mostly waiting)
- Render: 5 min
- Firebase: 5 min  
- Testing: 2 min

✅ **What You Get**:
- Production-grade database (AWS RDS)
- Scalable backend (Render)
- Fast frontend hosting (Firebase)
- Automatic deployments
- HTTPS everywhere
- 99.9% uptime SLA

---

**Ready to start? Go to Step 1! 🚀**
