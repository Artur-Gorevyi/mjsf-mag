# Prepare package for npm publishing
Write-Host "Preparing package for npm publishing..." -ForegroundColor Green

# Copy the library package.json to replace the current one
Copy-Item -Path "package-lib.json" -Destination "package.json" -Force
Write-Host "✓ Updated package.json for publishing" -ForegroundColor Green

# Create .npmignore if it doesn't exist
if (-not (Test-Path ".npmignore")) {
    Write-Host "Creating .npmignore..." -ForegroundColor Yellow
    Set-Content -Path ".npmignore" -Value @"
node_modules
src
*.config.js
*.config.ts
index.html
public
.vscode
.gitignore
prepare-publish.ps1
package-lib.json
"@
    Write-Host "✓ Created .npmignore" -ForegroundColor Green
}

Write-Host "`nPackage is ready for publishing!" -ForegroundColor Cyan
Write-Host "Run: npm publish" -ForegroundColor Yellow

