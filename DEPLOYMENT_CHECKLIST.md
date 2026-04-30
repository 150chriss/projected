# Deployment Checklist

## Pre-Deployment Checklist

### Backend (.env variables set?)
- [ ] `DB_HOST` - Database host address
- [ ] `DB_USER` - Database username
- [ ] `DB_PASSWORD` - Database password
- [ ] `DB_NAME` - Database name (CRPMS)
- [ ] `JWT_SECRET` - Generate random string: `openssl rand -base64 32`
- [ ] `PORT` - Set to 5000
- [ ] `NODE_ENV` - Set to production

### Frontend (.env.production ready?)
- [ ] `VITE_API_URL` - Set to your Render backend URL
- [ ] Build works locally: `npm run build`

### GitHub Repository
- [ ] Pushed all latest code
- [ ] `.env` files are in `.gitignore` (never commit secrets!)
- [ ] `node_modules` in `.gitignore`
- [ ] `dist` folder in `.gitignore`

---

## Deployment Steps

### Part 1: Deploy Backend to Render

1. **Create Render Account**
   - [ ] Go to render.com
   - [ ] Sign up with GitHub

2. **Create Web Service**
   - [ ] Click "New" → "Web Service"
   - [ ] Connect your GitHub repository
   - [ ] Name: `crpms-api`
   - [ ] Build Command: `npm install`
   - [ ] Start Command: `npm start`

3. **Set Environment Variables**
   - [ ] DB_HOST
   - [ ] DB_USER
   - [ ] DB_PASSWORD
   - [ ] DB_NAME
   - [ ] JWT_SECRET
   - [ ] NODE_ENV=production
   - [ ] PORT=5000

4. **Deploy**
   - [ ] Click "Create Web Service"
   - [ ] Wait for deployment (2-3 minutes)
   - [ ] Get your URL: https://crpms-api-XXXX.onrender.com
   - [ ] Test: curl https://crpms-api-XXXX.onrender.com

### Part 2: Deploy Frontend to Firebase

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Firebase**
   ```bash
   cd frontend
   firebase init hosting
   ```
   - Select your Firebase project
   - Public directory: `dist`
   - Single-page app: Yes
   - Overwrite config: No

3. **Update Production URL**
   - [ ] Edit `frontend/.env.production`
   - [ ] Set `VITE_API_URL=` to your Render URL

4. **Build & Deploy**
   ```bash
   npm run build
   firebase deploy
   ```
   - [ ] Get Firebase URL from output

### Part 3: Verify Deployments

- [ ] Test Frontend URL in browser
- [ ] Check login page loads
- [ ] Test login functionality
- [ ] Check API calls in Network tab
- [ ] Verify API is talking to Render backend

---

## After Deployment

### Monitor Applications
- [ ] Check Render dashboard for errors
- [ ] Check Firebase console for traffic
- [ ] Monitor database for connection issues

### Update Workflow
- Backend updates: Push to GitHub → Render auto-deploys
- Frontend updates: 
  ```bash
  npm run build
  firebase deploy
  ```

### Add Custom Domain (Optional)
- Firebase: Connect domain in Hosting settings
- Render: Add domain to service settings (need to update DNS)

---

## Common Issues

| Issue | Solution |
|-------|----------|
| Backend won't start | Check env vars, verify npm start works locally |
| Frontend blank page | Check console errors, verify VITE_API_URL |
| API calls fail | Verify Render URL in .env.production |
| Database connection error | Check credentials, ensure remote access enabled |
| CORS errors | Already configured, check frontend URL in CORS |

---

## Support Resources

- Firebase Docs: https://firebase.google.com/docs/hosting
- Render Docs: https://render.com/docs
- Node.js on Render: https://render.com/docs/native-runtimes/node
- MySQL: https://dev.mysql.com/doc/
