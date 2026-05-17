#!/bin/bash

# SmartGrow Quick Start Script

echo "🌱 SmartGrow - Precision Agriculture Platform"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 14+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3."
    exit 1
fi

echo "✅ Dependencies found"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
echo "✅ Backend dependencies installed"
echo ""

# Create backend .env if not exists
if [ ! -f .env ]; then
    echo "PORT=5000" > .env
    echo "NODE_ENV=development" >> .env
    echo "✅ Backend .env created"
fi

cd ..
echo ""

# Instructions
echo "🚀 Ready to start SmartGrow!"
echo ""
echo "Terminal 1 - Start Backend API:"
echo "  cd backend && npm start"
echo ""
echo "Terminal 2 - Start Frontend:"
echo "  cd frontend && python -m http.server 3000"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "📖 Documentation: See README.md"
