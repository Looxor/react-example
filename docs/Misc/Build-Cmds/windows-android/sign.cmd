copy .\android\app\build\outputs\apk\release\app-release-unsigned.apk .\android\app\build\outputs\apk\release\app-release-signed.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ..\..\keys\jinnahrae.keystore .\android\app\build\outputs\apk\release\app-release-signed.apk jinnahrae_alias
jarsigner -verify -verbose -certs android\app\build\outputs\apk\release\app-release-signed.apk

explorer .\android\app\build\outputs\apk\release
