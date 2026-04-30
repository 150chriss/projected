# Deployment Guide: Firebase + Render

## Frontend Deployment (Firebase)

### Prerequisites
- Node.js and npm installed
- Firebase account (https://firebase.google.com)
- Firebase CLI installed: `npm install -g firebase-tools`

### Steps

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase project**
   ```bash
   cd frontend
   firebase login
   firebase init
   ```
   - Select "Hosting"
   - Choose your Firebase project (or create a new one)
   - Public directory: `dist`
   - Single page app: `Yes`

3. **Set Production API URL**
   - Get your Render backend URL after deploying (e.g., https://your-app.onrender.com)
   - Update `frontend/.env.production`
   ```
   VITE_API_URL=https://your-app.onrender.com
   ```

4. **Build Frontend**
   ```bash
   npm run build
   ```

5. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

---

## Backend Deployment (Render)

### Prerequisites
- GitHub repository with your code pushed
- Render account (https://render.com)
- MySQL database connection string (or create new MySQL database)

### Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Create Render Web Service**
   - Go to https://dashboard.render.com
   - New → Web Service
   - Connect your GitHub repository
   - Configure:
     - **Name**: crpms-api (or your choice)
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Region**: Select closest to your users

3. **Set Environment Variables on Render**
   - In Render dashboard → Service → Environment
   - Add variables:
     ```
     PORT=5000
     DB_HOST=your-database-host
     DB_USER=your-database-user
     DB_PASSWORD=your-database-password
     DB_NAME=CRPMS
     JWT_SECRET=your-secure-random-string
     NODE_ENV=production
     ```

4. **Deploy**
   - Render automatically deploys on push to main
   - Monitor deployment in Render dashboard

---

## Update Frontend API Configuration

### Create .env files

**frontend/.env.development**
```
VITE_API_URL=http://localhost:5000
```

**frontend/.env.production**
```
VITE_API_URL=https://your-render-url.onrender.com
```

### Update axios.js
Frontend API client automatically uses correct URL based on environment.

---

## Database Setup

### Option 1: Use Existing MySQL Database
- Ensure database is accessible remotely
- Update connection string in Render environment variables
- Note: Use MySQL 5.7+ compatible syntax

### Option 2: Use Cloud MySQL (Recommended)
- AWS RDS
- Google Cloud SQL
- MySQL Hostinger
- Planet Scale (MySQL-compatible)

### Option 3: Local MySQL with Tunnel (Testing Only)
- Not recommended for production

---

## Troubleshooting

### Frontend Build Issues
```bash
cd frontend
npm install
npm run build
```

### Backend Connection Issues
- Check environment variables on Render
- Test database connection locally first
- Verify firewall rules allow Render IP

### CORS Issues
- Backend CORS is already configured for any origin
- If needed, update `backend/index.js` CORS settings

---

## Monitoring & Updates

- **Firebase**: Monitor in Firebase Console
- **Render**: Monitor in Render Dashboard
- Update code by pushing to GitHub (auto-deploys)

---

## Domain Setup

### Firebase Hosting
1. Go to Firebase Console → Hosting
2. Connect custom domain (free SSL included)

### Render Backend
1. Go to Render Dashboard → Service
2. Add custom domain to Service URL
3. Follow DNS instructions

