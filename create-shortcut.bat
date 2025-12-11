@echo off
echo 🖥️ デスクトップショートカットを作成します...

REM 現在のディレクトリを取得
set CURRENT_DIR=%~dp0

REM PowerShellでショートカットを作成
powershell -Command "& {$WshShell = New-Object -comObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%USERPROFILE%\Desktop\utip ライバー掲示板.lnk'); $Shortcut.TargetPath = '%CURRENT_DIR%build-and-serve.bat'; $Shortcut.WorkingDirectory = '%CURRENT_DIR%'; $Shortcut.IconLocation = '%SystemRoot%\System32\shell32.dll,13'; $Shortcut.Description = 'utip ライバー掲示板を起動'; $Shortcut.Save()}"

echo ✅ デスクトップショートカットを作成しました！
echo 🖱️ デスクトップの「utip ライバー掲示板」をダブルクリックで起動
echo 🌐 起動後は http://localhost:5000 でアクセス
pause