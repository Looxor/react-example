@echo OFF
cls
cd android
call gradlew.bat assembleRelease
cd ..
copy .\android\app\build\outputs\apk\release\app-release-unsigned.apk .\android\app\build\outputs\apk\release\app-release-signed.apk
call jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ..\..\keys\jinnahrae.keystore .\android\app\build\outputs\apk\release\app-release-signed.apk jinnahrae_alias
call jarsigner -verify -verbose -certs android\app\build\outputs\apk\release\app-release-signed.apk

explorer .\android\app\build\outputs\apk\release
