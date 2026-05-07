@echo off
REM Quick deployment script for frontend to Firebase (Windows)

echo 🚀 CRPMS Frontend Deployment Script
echo ====================================
echo.

REM Check if we're in the frontend directory
if not exist package.json (
    echo ❌ Error: package.json not found. Please run this from the frontend directory.
    exit /b 1
)

REM Check if Firebase CLI is installed
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Firebase CLI not found. Installing...
    npm install -g firebase-tools
)

echo ✅ Building frontend...
call npm run build

if not exist dist (
    echo ❌ Build failed! dist folder not created.
    exit /b 1
)

echo.
echo 📋 Pre-deployment checklist:
echo   ✓ dist folder created
echo   ✓ firebase.json exists
echo   ✓ .firebaserc configured
echo.
echo ⚠️  IMPORTANT: Make sure you've updated .env.production with your Render URL!
echo    Set: VITE_API_URL=https://your-render-url.onrender.com
echo.

set /p response="Continue with deployment? (y/n) "
if /i not "%response%"=="y" (
    echo Deployment cancelled.
    exit /b 1
)

echo.
echo 🚀 Deploying to Firebase...
firebase deploy

echo.
echo ✅ Deployment complete!
echo Your app is now live at the Firebase URL shown above.
