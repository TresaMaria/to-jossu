# GitHub and Vercel Deployment Script for to-jossu
# PowerShell version

Write-Host "🚀 Deploying to-jossu to GitHub..." -ForegroundColor Cyan

# Step 1: Rename branch to main
Write-Host "📝 Renaming branch to main..." -ForegroundColor Yellow
git branch -M main

# Step 2: Check if repository exists
Write-Host "`n🔗 Setting up GitHub remote..." -ForegroundColor Yellow
Write-Host "Please create the repository first at: https://github.com/new" -ForegroundColor White
Write-Host "Repository name: to-jossu" -ForegroundColor White
Write-Host "Make it public and don't initialize with README`n" -ForegroundColor White

$created = Read-Host "Have you created the GitHub repository 'to-jossu'? (y/n)"

if ($created -ne "y") {
    Write-Host "❌ Please create the repository first" -ForegroundColor Red
    exit 1
}

# Add remote
Write-Host "`nAdding remote..." -ForegroundColor Yellow
git remote add origin https://github.com/TresaMaria/to-jossu.git

# Step 3: Push to GitHub
Write-Host "`n⬆️ Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
Write-Host "`n📦 Next steps for Vercel deployment:" -ForegroundColor Cyan
Write-Host "1. Go to https://vercel.com" -ForegroundColor White
Write-Host "2. Sign in with GitHub" -ForegroundColor White
Write-Host "3. Click 'Add New' → 'Project'" -ForegroundColor White
Write-Host "4. Import 'to-jossu' repository" -ForegroundColor White
Write-Host "5. Click 'Deploy'" -ForegroundColor White
Write-Host "`n🎉 Your romantic scrapbook will be live in ~2 minutes!" -ForegroundColor Magenta
