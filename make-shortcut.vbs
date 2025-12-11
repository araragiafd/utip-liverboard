Set WshShell = CreateObject("WScript.Shell")
Set oShellLink = WshShell.CreateShortcut(WshShell.SpecialFolders("Desktop") & "\utip ライバー掲示板.lnk")
oShellLink.TargetPath = WshShell.CurrentDirectory & "\quick-start.bat"
oShellLink.WorkingDirectory = WshShell.CurrentDirectory
oShellLink.Description = "utip ライバー掲示板を起動"
oShellLink.Save

WScript.Echo "✅ デスクトップにショートカットを作成しました！"
WScript.Echo "🖱️ ダブルクリックでサイトを起動できます"