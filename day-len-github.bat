@echo off
title Day code len GitHub
cd /d "%~dp0"
set "PATH=%PATH%;%LOCALAPPDATA%\Programs\Git\cmd;%LOCALAPPDATA%\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin"

echo ====================================================
echo      DANG CHUAN BI DAY DU AN LEN GITHUB
echo ====================================================
echo.

git status
git add .
git commit -m "update project" 2>nul

echo.
echo [1/2] Kiem tra dang nhap GitHub...
gh auth status 2>nul
if %errorlevel% neq 0 (
    echo Ban chua dang nhap GitHub. Hay lam theo huong dan tren man hinh de dang nhap...
    gh auth login -w -p https
)

echo.
echo [2/2] Dang tao Repository va day ma nguon len GitHub...
gh repo create quiz-sinh-hoc-a1 --public --source=. --push 2>nul
if %errorlevel% neq 0 (
    git push -u origin main
)

echo.
echo ====================================================
echo   HOAN TAT! MA NGUON DA CO TREN GITHUB CUA BAN.
echo ====================================================
pause
