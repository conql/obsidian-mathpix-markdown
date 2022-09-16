npm run build
$modName = Split-Path -Path $pwd -Leaf

if (Test-Path -Path ./release) {
    Remove-Item -Path ./release -Recurse
}

mkdir release

Copy-Item main.js ./release
Copy-Item manifest.json ./release
Compress-Archive -Path ./release -DestinationPath ./$modName.zip -Force

$modFolder = "D:/seadrive_root/sptcs/我的资料库/Storage/notes/.obsidian/plugins/" + $modName
if (!(Test-Path -Path $modFolder)) {
    New-Item -ItemType Directory -Path $modFolder
}

Copy-Item .\release\* -Destination $modFolder -Force -Recurse
