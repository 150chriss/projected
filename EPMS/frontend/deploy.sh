#!/bin/bash
# Quick deployment script for frontend to Firebase

echo "🚀 CRPMS Frontend Deployment Script"
echo "===================================="
echo ""

# Check if we're in the frontend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this from the frontend directory."
    exit 1
fi

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "📦 Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

echo "✅ Building frontend..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build failed! dist folder not created."
    exit 1
fi

echo ""
echo "📋 Pre-deployment checklist:"
echo "  ✓ dist folder created"
echo "  ✓ firebase.json exists"
echo "  ✓ .firebaserc configured"
echo ""
echo "⚠️  IMPORTANT: Make sure you've updated .env.production with your Render URL!"
echo "   Set: VITE_API_URL=https://your-render-url.onrender.com"
echo ""

read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 1
fi

echo ""
echo "🚀 Deploying to Firebase..."
firebase deploy

echo ""
echo "✅ Deployment complete!"
echo "Your app is now live at the Firebase URL shown above."
