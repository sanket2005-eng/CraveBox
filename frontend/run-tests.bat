@echo off
REM Quick Start Script for Running Tests (Windows)
REM Usage: run-tests.bat

echo.
echo 🚀 Food Ordering App - Playwright Test Suite
echo ==============================================
echo.

REM Check if Node is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

echo ✅ Node.js is installed

echo.
echo 🔍 Checking backend and frontend servers...
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

echo.
echo ⚠️  IMPORTANT: Make sure these services are running:
echo    1. Backend: cd backend && npm run dev (on port 5000)
echo    2. Frontend: cd frontend && npm run dev (on port 5173)
echo    3. MongoDB Atlas: Connection configured in .env
echo.
echo Press ENTER to continue with tests, or Ctrl+C to cancel...
pause

echo.
echo 🎯 Running Playwright tests...
echo.

REM Run tests
call npm test

if %errorlevel% neq 0 (
    echo ❌ Some tests failed
    echo 📊 View detailed report with: npx playwright show-report
    pause
    exit /b 1
)

echo.
echo ✅ All tests passed!
echo 📊 View detailed report with: npx playwright show-report
echo.
pause
