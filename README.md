# swingmobile
cordova + vuetify admin template

# References
- vuetify admin template : https://github.com/tookit/vue-material-admin
- Cordova(8.0.0) : https://cordova.apache.org/docs/en/latest/

# Build for Chrome test
1. cordova build android
2. cordova run android -- --lr

# Build for Android studio's emulator
1. cordova build android --debug
2. AVD emulator 실행
3. cordova run android

# cordova port 변경
hooks/hookers.js startWebpackDevServer()에서 변경가능