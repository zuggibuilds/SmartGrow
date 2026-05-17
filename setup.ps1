# SmartGrow Quick Start Script for Windows PowerShell

Write-Host "🌱 SmartGrow - Precision Agriculture Platform" -ForegroundColor Green
Write-Host "=============================================="
Write-Host ""

# Check if Node.js is installed
$nodeCheck = node --version 2>$null
if ($null -eq $nodeCheck) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 14+ first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js found: $nodeCheck" -ForegroundColor Green

# Check if Python is installed
$pythonCheck = python --version 2>$null
if ($null -eq $pythonCheck) {
    $pythonCheck = python3 --version 2>$null
    if ($null -eq $pythonCheck) {
        Write-Host "❌ Python is not installed. Please install Python 3." -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Python found" -ForegroundColor Green
Write-Host ""

# Install backend dependencies
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install
Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
Write-Host ""

# Create backend .env if not exists
if (-not (Test-Path .env)) {
    "PORT=5000" | Out-File -FilePath .env -Encoding UTF8
    "NODE_ENV=development" | Add-Content -Path .env
    Write-Host "✅ Backend .env created" -ForegroundColor Green
}

Set-Location ..
Write-Host ""

# Instructions
Write-Host "🚀 Ready to start SmartGrow!" -ForegroundColor Green
Write-Host ""
Write-Host "Terminal 1 - Start Backend API:" -ForegroundColor Cyan
Write-Host "  cd backend && npm start"
Write-Host ""
Write-Host "Terminal 2 - Start Frontend:" -ForegroundColor Cyan
Write-Host "  cd frontend && python -m http.server 3000"
Write-Host ""
Write-Host "Then open browser: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "📖 Documentation: See README.md" -ForegroundColor Cyan
