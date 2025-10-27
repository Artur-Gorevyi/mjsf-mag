# Switch to development package.json
Write-Host "Switching to DEV mode..." -ForegroundColor Green
Copy-Item -Path "package.dev.json" -Destination "package.json" -Force
Write-Host "✓ Development mode enabled" -ForegroundColor Green
Write-Host "Run: npm run dev" -ForegroundColor Yellow

