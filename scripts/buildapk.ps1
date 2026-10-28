Set-Location D:\Repos\ScalesViewer
pnpm exec cap sync android
Start-Process -FilePath "android\gradlew.bat" -ArgumentList "assembleDebug" -WorkingDirectory "D:\Repos\ScalesViewer\android"
Start-Sleep -Seconds 90
$p = "android\app\build\outputs\apk\debug\app-debug.apk"
if (Test-Path $p) { $f = Get-Item $p; Write-Output ("APK-OK " + $f.FullName + " " + [math]::Round($f.Length/1MB,1) + "MB") } else { Write-Output "APK-NOTYET" }