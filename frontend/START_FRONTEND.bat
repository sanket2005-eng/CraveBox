@echo off
REM Frontend Quick Start Script
REM Run this to start the frontend dev server

echo ========================================
echo Starting Pizza O Cafe Frontend
echo ========================================

cd /d "c:\Users\sntgp\OneDrive\Desktop\project\frontend"

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo.
echo ✓ Starting dev server on http://localhost:3000
echo ✓ Press Ctrl+C to stop the server
echo.

call npm run dev

pause
