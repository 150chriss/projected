# 🚀 Deploy Backend to Render (5 minutes)

## Step-by-Step Instructions

### 1. Sign Up/Login to Render
- **If new user**: Click "Sign up" → Choose "Continue with GitHub"
- **If existing**: Click "Log in" → Use your credentials

### 2. Connect Your GitHub Repository
- Render will ask to connect GitHub
- Click "Authorize Render" to give access
- Select your repository: `150chriss/projected`

### 3. Create Web Service
- Click **"New +"** → **"Web Service"**
- Select your GitHub repository
- Fill in service details:
  - **Name**: `crpms-api`
  - **Region**: Choose closest to you (e.g., Oregon, Virginia)
  - **Branch**: `main`
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`

### 4. Add Environment Variables
**IMPORTANT**: Before clicking "Create", go to **Environment** section and add these:

```
DB_HOST=localhost
DB_USER=Admin
DB_PASSWORD=admin12
DB_NAME=CRPMS
JWT_SECRET=generate-this-below
NODE_ENV=production
PORT=5000
```

### Generate JWT_SECRET
Open PowerShell and run:
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```
Copy the output → Paste in JWT_SECRET field

### 5. Deploy
- Click **"Create Web Service"**
- Wait 2-3 minutes for deployment
- You'll get a URL like: `https://crpms-api-xxxxx.onrender.com`

### 6. Test Backend
Once deployed, test it:
```bash
curl https://crpms-api-xxxxx.onrender.com
```
Should return: `{"message":"CRPMS API running"}`

---

## ⚠️ Expected Issue

**Database won't work yet** (that's expected):
- Render can't connect to your local `localhost` MySQL
- Backend will deploy but API calls will fail with DB errors
- This is normal - you'll fix database later

---

## Next Steps

Once backend is deployed:
1. **Copy the Render URL** (you'll need it for frontend)
2. **Deploy frontend to Firebase**
3. **Later**: Set up cloud database and update credentials

---

## If You Get Stuck

**Can't find repository?**
- Make sure you authorized GitHub properly
- Repository should be: `150chriss/projected`

**Build fails?**
- Check Render logs for errors
- Make sure `npm start` works locally

**Environment variables?**
- Double-check all are added correctly
- JWT_SECRET must be generated (not copied from here)

---

**Ready? Go to https://render.com and follow the steps above!**
