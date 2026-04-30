# ⚡ Quick Reference Card - Firebase & Render Deployment

## Render Backend (Node.js + MySQL)

### Quick Commands
```bash
# 1. Push to GitHub
cd backend && git push origin main

# 2. On Render dashboard:
# New → Web Service → Connect GitHub
# Build: npm install
# Start: npm start

# 3. Add Environment Variables:
# DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET, NODE_ENV, PORT
```

### Environment Variables Needed
```
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=CRPMS
JWT_SECRET=[generate: openssl rand -base64 32]
NODE_ENV=production
PORT=5000
```

### Verification
```bash
curl https://crpms-api-XXXXX.onrender.com
# Returns: {"message":"CRPMS API running"}
```

---

## Firebase Frontend (React + Vite)

### Quick Commands
```bash
# 1. Install Firebase CLI
npm install -g firebase-tools
firebase login

# 2. Update production config
# Edit: frontend/.env.production
# VITE_API_URL=https://crpms-api-XXXXX.onrender.com

# 3. Build and deploy
cd frontend
npm run build
firebase deploy

# OR use deployment script:
deploy.bat    # Windows
./deploy.sh   # Linux/Mac
```

### Environment Variables
```
Development (auto-used locally):
VITE_API_URL=http://localhost:5000

Production (Firebase):
VITE_API_URL=https://crpms-api-XXXXX.onrender.com
```

### Verification
- Open Firebase URL in browser
- Login works
- Check Network tab → API calls go to Render URL
- DevTools Console → No errors

---

## Database Options

### Quick Setup (Cloud MySQL - Recommended)
```
☁️ PlanetScale:    planetscale.com (free tier)
☁️ AWS RDS:        aws.amazon.com/rds
☁️ Google Cloud:   cloud.google.com/sql
☁️ Hostinger:      hostinger.com (cheap)
```

### OR Local MySQL
```
⚠️  Keep MySQL server running on your computer
⚠️  Configure for remote access
⚠️  More complex, requires port forwarding
```

---

## Timeline

| Task | Time | Status |
|------|------|--------|
| Configure database | 5 min | ⏳ TODO |
| Deploy backend | 3 min | ⏳ TODO |
| Deploy frontend | 3 min | ⏳ TODO |
| Test everything | 2 min | ⏳ TODO |
| **TOTAL** | ~15 min | ⏳ TODO |

---

## URLs After Deployment

```
Frontend: https://your-firebase-project.web.app
Backend API: https://crpms-api-XXXXX.onrender.com
Database: Your database host
```

---

## Common Issues & Quick Fixes

| Issue | Fix |
|-------|-----|
| Backend won't start | Check Render logs, npm start works? |
| Frontend blank | Check console, API URL in .env.production |
| API 404 errors | Verify Render URL in .env.production |
| DB connection error | Check credentials on Render dashboard |
| CORS errors | Already configured, check logs |

---

## Files Created for Deployment

✅ Documentation:
- SETUP_COMPLETE.md
- README_DEPLOYMENT.md
- DEPLOYMENT_GUIDE.md
- QUICK_START_DEPLOYMENT.md
- DEPLOYMENT_CHECKLIST.md

✅ Configuration:
- frontend/.env.development
- frontend/.env.production
- frontend/.env.example
- backend/.env.example
- frontend/firebase.json
- frontend/.firebaserc
- backend/render.yaml

✅ Scripts:
- frontend/deploy.sh (Linux/Mac)
- frontend/deploy.bat (Windows)

✅ Code Updates:
- frontend/src/api/axios.js (now uses environment variables)

---

## Start Here

1. Read: **SETUP_COMPLETE.md**
2. Follow: **QUICK_START_DEPLOYMENT.md**
3. Verify: **DEPLOYMENT_CHECKLIST.md**
4. Reference: **DEPLOYMENT_GUIDE.md**

---

## Dashboard Links

- Render: https://dashboard.render.com
- Firebase: https://console.firebase.google.com
- GitHub: https://github.com

---

## Generate JWT Secret

```bash
# Windows (PowerShell)
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# Mac/Linux
openssl rand -base64 32
```

Copy the output → Paste in Render environment variables

---

## Support

- Firebase Docs: https://firebase.google.com/docs/hosting
- Render Docs: https://render.com/docs
- Node.js: https://nodejs.org/docs
- Express: https://expressjs.com

---

**Print this page or save as reference! 📋**
