@echo off
title Geosintel Dashboard
echo ===================================================
echo Starting Geosintel Dashboard...
echo ===================================================
echo.

:: Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 goto install_node

:continue_setup
if not exist node_modules\ (
    echo First time setup: Installing dependencies...
    call npm install
    echo.
)

echo The Vite development server is starting up.
echo Once started, you can view the dashboard in your web browser.
echo.
echo Press Ctrl+C and type 'Y' if you wish to stop the server.
echo.
call npm run dev
pause
exit /b

:install_node
echo [INFO] Node.js is not installed or not in your system PATH.
echo [INFO] Node.js is required to run the Vite development server.
echo.
echo Let's try to install Node.js automatically using Windows Package Manager (winget)...
echo.
winget install -e --id OpenJS.NodeJS --accept-package-agreements --accept-source-agreements

if errorlevel 1 (
    echo.
    echo [ERROR] Failed to install Node.js automatically using winget.
    echo Please download and install Node.js manually from: https://nodejs.org/
    pause
    exit /b
)

echo.
echo [SUCCESS] Node.js should now be installed! 
echo ===================================================
echo IMPORTANT: You MUST close this window and double-click 'Alpha Launch.bat' again
echo so that the newly installed Node.js can be recognized.
echo ===================================================
pause
exit /b
