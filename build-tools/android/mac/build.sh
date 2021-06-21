cd android
./gradlew assembleRelease
cd ..
cp ./android/app/build/outputs/apk/release/app-release-unsigned.apk ./android/app/build/outputs/apk/release/app-release-signed.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /Users/christian/Library/Mobile\ Documents/com\~apple\~CloudDocs/SmartCreative/Tutti\ i\ file/File\ Importanti/Certificati\ Google/key_store_application.jks ./android/app/build/outputs/apk/release/app-release-signed.apk key0
jarsigner -verify -verbose -certs android/app/build/outputs/apk/release/app-release-signed.apk
./android/zipalign 4 ./android/app/build/outputs/apk/release/app-release-signed.apk ./android/app/build/outputs/apk/release/app-google-play.apk

keytool -list -v -alias key0 -keystore -keystore /Users/christian/Library/Mobile\ Documents/com\~apple\~CloudDocs/SmartCreative/Tutti\ i\ file/File\ Importanti/Certificati\ Google/key_store_application.jks
keytool -exportcert -list -v \-alias key0 -keystore /Users/christian/Library/Mobile\ Documents/com\~apple\~CloudDocs/SmartCreative/Tutti\ i\ file/File\ Importanti/Certificati\ Google/key_store_application.jks