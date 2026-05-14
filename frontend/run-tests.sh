#!/bin/bash
# Quick Start Script for Running Tests
# Usage: ./run-tests.sh

echo "🚀 Food Ordering App - Playwright Test Suite"
echo "=============================================="
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"
echo ""

# Check if backend is running
echo "🔍 Checking if backend is running on port 5000..."
if curl -s http://localhost:5000/api/health > /dev/null; then
    echo "✅ Backend is running"
else
    echo "⚠️  Backend is not running on port 5000"
    echo "Start it with: cd backend && npm run dev"
    echo ""
fi

# Check if frontend dev server is running
echo "🔍 Checking if frontend dev server is running on port 5173..."
if curl -s http://localhost:5173 > /dev/null; then
    echo "✅ Frontend dev server is running"
else
    echo "⚠️  Frontend dev server is not running on port 5173"
    echo "Start it with: cd frontend && npm run dev"
    echo ""
fi

# Install dependencies if needed
echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🎯 Running Playwright tests..."
echo ""

# Run tests
npm test

echo ""
echo "✅ Test suite complete!"
echo "📊 View detailed report with: npx playwright show-report"
