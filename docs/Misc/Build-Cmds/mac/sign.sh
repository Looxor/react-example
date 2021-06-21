cp ./android/app/build/outputs/apk/release/app-release-unsigned.apk ./android/app/build/outputs/apk/release/app-release-signed.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /Users/christian/Desktop/SmartCreative\ Srl/Tutti\ i\ file/File\ Importanti/Certificati\ Google/key_store_application.jks  ./android/app/build/outputs/apk/release/app-release-signed.apk key0
jarsigner -verify -verbose -certs android/app/build/outputs/apk/release/app-release-signed.apk

