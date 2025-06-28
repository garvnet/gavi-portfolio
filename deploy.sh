#!/bin/bash

# WEB3 PORTFOLIO Deployment Script

echo "🚀 Deploying WEB3 PORTFOLIO..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Add all changes
    git add .
    
    # Commit changes
    git commit -m "Deploy: Update WEB3 PORTFOLIO"
    
    # Push to GitHub
    git push origin main
    
    echo "🎉 Deployment completed!"
    echo "🌐 Live site: https://garvnet.github.io/gavi-portfolio/"
    echo "📁 Repository: https://github.com/garvnet/gavi-portfolio"
else
    echo "❌ Build failed!"
    exit 1
fi 