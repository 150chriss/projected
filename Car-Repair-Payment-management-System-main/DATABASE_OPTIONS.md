# Database Migration & Setup Options

## 🚨 Critical Issue

Your database is on `localhost`. When you deploy backend to Render (cloud server), it **cannot connect to your local computer**.

### Solution: Choose One Option Below

---

## ✅ Option 1: Use PlanetScale (Fastest - 5 minutes)

PlanetScale is MySQL-compatible and has a **free tier**.

### Steps:
1. Go to https://planetscale.com
2. Sign up (free account)
3. Create new database → name it `CRPMS`
4. Get connection details (host, user, password)
5. Update Render environment variables with PlanetScale connection

### Connection Example:
```
DB_HOST=aws.connect.psdb.cloud
DB_USER=xxxxx
DB_PASSWORD=pscale_pw_xxxxx
DB_NAME=CRPMS
```

### Migrate Data from Local to PlanetScale:
```bash
# Export from local MySQL
mysqldump -u root CRPMS > crpms_backup.sql

# Import to PlanetScale
mysql -h aws.connect.psdb.cloud -u [user] -p[password] CRPMS < crpms_backup.sql
```

---

## ✅ Option 2: Use AWS RDS (Reliable - 10 minutes)

### Steps:
1. Go to https://aws.amazon.com/rds
2. Create MySQL database (free tier available)
3. Get endpoint (host), username, password
4. Update Render environment variables

### Connection Example:
```
DB_HOST=crpms-db.c1234567890.us-east-1.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=yourpassword
DB_NAME=CRPMS
```

---

## ✅ Option 3: Keep Local DB for Testing Only

If you want to deploy without changing database setup:

1. Deploy backend (knowing it won't connect to DB initially)
2. Set up cloud database later
3. Update credentials when ready
4. Render will auto-redeploy on git push

---

## 🔄 Migration Script (Local → Cloud)

### Step 1: Export Your Local Database
```bash
mysqldump -u root CRPMS > backup.sql
```

### Step 2: Create Cloud Database (PlanetScale example)
```
Go to planetscale.com → Create DB → Get credentials
```

### Step 3: Import to Cloud
```bash
mysql -h [cloud-host] -u [cloud-user] -p[cloud-password] CRPMS < backup.sql
```

### Step 4: Update Render
```
DB_HOST = [cloud-host]
DB_USER = [cloud-user]
DB_PASSWORD = [cloud-password]
```

### Step 5: Redeploy Backend
```bash
git push origin main
# Render auto-redeploys with new credentials
```

---

## Recommendation

**For This Deployment: Use PlanetScale** ✅
- Free tier (good for testing)
- MySQL-compatible
- Quick setup (5 minutes)
- Can scale up later

---

## Proceed Without Cloud DB? ⚠️

If you just want to deploy and test the UI:

1. **Acknowledge**: Backend won't work without DB
2. **Deploy anyway**: You'll see the Render service is live
3. **Set up DB later**: Add cloud database when ready
4. **Update and redeploy**: Push to GitHub with new DB credentials

This is fine for **testing the deployment process**, but not for **actual use**.

---

## Choose Your Path:

- ✅ **Quick Path**: Use PlanetScale (free, 5 min setup)
- ✅ **Professional Path**: Use AWS RDS (reliable, 10 min setup)  
- ⚠️ **Test Path**: Deploy without DB, add database later

Which one would you like to proceed with?
