# Switch to publish package.json
Write-Host "Switching to PUBLISH mode..." -ForegroundColor Green
Copy-Item -Path "package-lib.json" -Destination "package.json" -Force
Write-Host "Publish mode enabled" -ForegroundColor Green
Write-Host "Run: npm publish" -ForegroundColor Yellow

