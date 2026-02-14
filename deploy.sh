#!/bin/bash
# GitHub and Vercel Deployment Script for to-jossu

echo "🚀 Deploying to-jossu to GitHub..."

# Step 1: Rename branch to main
echo "📝 Renaming branch to main..."
git branch -M main

# Step 2: Add GitHub remote
echo "🔗 Adding GitHub remote..."
# You need to create the repository first at: https://github.com/new
# Repository name: to-jossu
read -p "Have you created the GitHub repository 'to-jossu'? (y/n): " created

if [ "$created" != "y" ]; then
    echo "❌ Please create the repository first at https://github.com/new"
    echo "Repository name: to-jossu"
    echo "Make it public and don't initialize with README"
    exit 1
fi

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/TresaMaria/to-jossu.git

# Step 3: Push to GitHub
echo "⬆️ Pushing to GitHub..."
git push -u origin main

echo "✅ Successfully pushed to GitHub!"
echo ""
echo "📦 Next steps for Vercel deployment:"
echo "1. Go to https://vercel.com"
echo "2. Sign in with GitHub"
echo "3. Click 'Add New' → 'Project'"
echo "4. Import 'to-jossu' repository"
echo "5. Click 'Deploy'"
echo ""
echo "🎉 Your romantic scrapbook will be live in ~2 minutes!"
