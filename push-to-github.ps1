param()

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host " Eptain Core Platform - GitHub Deployment" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

$repoUrl = Read-Host "Enter your empty GitHub Repository URL (e.g., https://github.com/username/repo.git)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "Deployment aborted: No Repository URL provided." -ForegroundColor Red
    exit
}

Write-Host "Configuring remote..." -ForegroundColor Yellow
git remote add origin $repoUrl
git branch -M main

Write-Host "Pushing architecture to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "✅ Upload Complete! The codebase is now securely hosted." -ForegroundColor Green
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Go to Vercel.com and import the /frontend folder"
Write-Host "2. Go to Render.com and import the /backend folder"
