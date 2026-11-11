# PowerShell Startup Script for KalaKriti
Write-Host "========================================================" -ForegroundColor DarkYellow
Write-Host "  Starting KalaKriti - Local Artisan Marketplace" -ForegroundColor Yellow
Write-Host "  Inspired by Jaypore, Okhai, and iTokri" -ForegroundColor DarkYellow
Write-Host "========================================================" -ForegroundColor DarkYellow
Write-Host ""
Write-Host "Serving Full-Stack App at: http://localhost:5000" -ForegroundColor Green
Write-Host "Press Ctrl+C to terminate." -ForegroundColor Gray
Write-Host ""
node server/server.js
