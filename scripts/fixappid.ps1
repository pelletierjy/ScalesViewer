Set-Location D:\Repos\ScalesViewer
# Replace appId in AndroidManifest.xml
(Get-Content android\app\src\main\AndroidManifest.xml) -replace 'com\.gscale\.app', 'com.jeanyves.scalesviewer' | Set-Content android\app\src\main\AndroidManifest.xml
# Replace applicationId in build.gradle
(Get-Content android\app\build.gradle) -replace 'com\.gscale\.app', 'com.jeanyves.scalesviewer' | Set-Content android\app\build.gradle
# Replace namespace in build.gradle
(Get-Content android\app\build.gradle) -replace 'namespace com\.gscale\.app', 'namespace com.jeanyves.scalesviewer' | Set-Content android\app\build.gradle
# Move MainActivity.java to new package
$oldPath = "android\app\src\main\java\com\gscale\app\MainActivity.java"
$newPath = "android\app\src\main\java\com\jeanyves\scalesviewer\MainActivity.java"
if (Test-Path $oldPath) {
    $newDir = Split-Path $newPath -Parent
    if (-not (Test-Path $newDir)) { mkdir $newDir }
    Move-Item -Path $oldPath -Destination $newPath
    (Get-Content $newPath) -replace 'package com\.gscale\.app', 'package com.jeanyves.scalesviewer' | Set-Content $newPath
}
# Delete the old package tree (keep the new dir)
$oldDir = "android\app\src\main\java\com\gscale"
if (Test-Path $oldDir) {
    Remove-Item -Recurse -Force $oldDir -Exclude $newPath
}
# Delete legacy capacitor.config.json
if (Test-Path "capacitor.config.json") { Remove-Item capacitor.config.json }
Write-Output "APPID-ALIGNED"