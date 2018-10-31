/**
 * 서버관련 config
 */

var backEndIp = '10.10.10.162'
var backEndPort = '8765'
var backEndAuthUrl = '/api/swingauth-service/api/'
var backEndUrl = '/api/swing-service/api/'

var config = {
  themeClasses: {
    search: "blue lighten-5"
  },
  port: 9999, // current server port
  backEndIp: backEndIp,  // backend url
  backEndPort: backEndPort, // backend port
  protocol: 'http://',
  backEndFullUrl : backEndIp + ':' + backEndPort + backEndUrl,
  backEndAuthFullUrl : backEndIp + ':' + backEndPort + backEndAuthUrl,
  defaultGapOfDate: '1y'  // 기본 prev date
}

export default config;