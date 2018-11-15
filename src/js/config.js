/**
 * 서버관련 config
 */

var backEndIp = '10.10.10.162'
var backEndPort = '8765'
var releaseUrl = 'api.swingcmms.com'
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
  backEndUrl: backEndUrl,
  backEndAuthUrl: backEndAuthUrl,
  backEndFullUrl : backEndIp + ':' + backEndPort + backEndUrl,
  backEndAuthFullUrl : backEndIp + ':' + backEndPort + backEndAuthUrl,
  defaultGapOfDate: '1y',  // 기본 prev date
  tenantId: ''
}

config.settingForDevSite = () => {
  config.backEndIp = backEndIp
  config.backEndPort = backEndPort
  config.protocol = 'http://'
  config.backEndFullUrl = config.backEndIp + ':' + config.backEndPort + config.backEndUrl
  config.backEndAuthFullUrl = config.backEndIp + ':' + config.backEndPort + config.backEndAuthUrl
}

config.settingForReleaseSite = () => {
  config.backEndIp = releaseUrl
  config.protocol = 'https://'
  config.backEndFullUrl = config.backEndIp + config.backEndUrl
  config.backEndAuthFullUrl = config.backEndIp + config.backEndAuthUrl
}

export default config;