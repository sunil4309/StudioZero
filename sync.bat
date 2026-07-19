@echo off
echo =======================================================
echo pikslnet Portfolio & Playlist Auto-Sync Tool
echo =======================================================
echo Checking system environments...
echo.

where node >nul 2>nul
if %errorlevel%==0 (
    echo [Node.js found] Running sync.js...
    node sync.js
    goto end
)

where python >nul 2>nul
if %errorlevel%==0 (
    echo [Python found] Running sync.py...
    python sync.py
    goto end
)

where py >nul 2>nul
if %errorlevel%==0 (
    echo [Python Launcher found] Running sync.py...
    py sync.py
    goto end
)

echo.
echo ERROR: Neither Node.js nor Python was found on your system PATH.
echo Please install Node.js or Python to run this automation script.
echo Alternatively, you can manually update tracks inside 'js/tracks.js' or projects inside 'js/projects.js' using any text editor.
echo.

:end
echo.
echo Process complete. Press any key to exit.
pause >nul
