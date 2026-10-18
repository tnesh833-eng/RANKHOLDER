@echo off
title Rank-Holder Backend Server
echo ====================================================
echo Starting Rank-Holder Server on http://localhost:3000
echo ====================================================
cd /d "%~dp0Rank-No-1-main"
:loop
node support/server.js
echo.
echo Server stopped. Restarting in 3 seconds...
timeout /t 3 /nobreak > nul
goto loop
