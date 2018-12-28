<template>
  <!-- <v-app id="login" class="primary"> -->
  <v-app id="login">
    <v-content>
      <v-container id="login_container" fluid fill-height class="background">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <!-- <img src="static/v.png" alt="Vue Material Admin"> -->
                  <h1 class="flex my-4 primary--text">swing CMMS mobile</h1>
                </div>                
                <v-form>
                  <v-text-field 
                    append-icon="web" 
                    name="login" 
                    :label="$t('title.tenantId')"
                    :hint="$t('message.tenantHint')"
                    persistent-hint
                    type="text" 
                    clearable
                    v-model="loginInfo.tenantId">
                  </v-text-field>
                  <v-text-field 
                    append-icon="person" 
                    name="login" 
                    :label="$t('title.id')"
                    type="text" 
                    clearable
                    v-model="loginInfo.username">
                  </v-text-field>
                  <v-text-field 
                    append-icon="lock" 
                    name="password" 
                    :label="$t('title.password')" 
                    id="password" 
                    type="password" 
                    clearable
                    v-model="loginInfo.password">
                  </v-text-field>
                  <v-switch
                    :label="cloudLabel"
                    v-model="isCloudAccess"
                  ></v-switch>
                  <v-btn @click.prevent="btnAutoIdSet">
                    테스트 ID 세팅
                  </v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-layout align-center justify-space-between row fill-height>
                  <y-i18n></y-i18n>
                  <v-spacer></v-spacer>
                  <v-btn 
                    block
                    color="success"
                    :disabled="!isConnected" 
                    @click.prevent="login" 
                    :loading="loading">
                    Login
                  </v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import jwt from '@/js/jwtToken'
import YI18n from '@/components/widgets/YI18n'
import config from '@/js/config'
import selectConfig from '@/js/selectConfig'
// https://vuejsexamples.com/vue-component-for-country-flags/

export default {
  components: {
    'y-i18n': YI18n
  },
  data: () => ({
    loading: false,
    loginInfo: {
      tenantId: '',
      username: '',
      password: ''
    },
    locale: null,
    isCloudAccess: true,
    cloudLabel: 'cloud 접속',
    isConnected: true
  }),
  beforeMount() {
    window.getApp.$on('NETWORK_STATUS_CHANGED', (_isConnected) => {
      this.isConnected = _isConnected
    })
  },
  beforeDestroy () {
    // TODO : remove event listener, 삭제 하지 않으면 이벤트가 중복 발생됨
    window.getApp.$off('NETWORK_STATUS_CHANGED')
 },
  mounted() {
    window.getApp.isLogin = false;
    this.locale = localStorage.locale
    this.loginInfo.tenantId = localStorage.tenantId ? localStorage.tenantId : ''
    this.isCloudAccess = localStorage.isCloudAccess ? localStorage.isCloudAccess : true
    if (localStorage.isCloudAccess) this.isCloudAccess = localStorage.isCloudAccess === 'true' ? true : false
    else this.isCloudAccess = true

    if (this.isCloudAccess) config.settingForReleaseSite()
    else config.settingForDevSite()

    localStorage.isCloudAccess = this.isCloudAccess;

    // App.vue에서 현재 연결 상태를 가져온다.
    this.isConnected = window.getApp.getNetworkConnection();
  },
  watch: {
    'loginInfo.tenantId': function() {
      if (!this.loginInfo.tenantId) return;
      localStorage.tenantId = this.loginInfo.tenantId
      config.tenantId = this.loginInfo.tenantId
    },
    isCloudAccess() {
      // this.cloudLabel = this.isCloudAccess ? 'cloud 접속' : '테스트 사이트 접속'
      if (this.isCloudAccess) {
        config.settingForReleaseSite()
        this.$set(this, 'cloudLabel', 'cloud 접속')
      } else {
        config.settingForDevSite()
        this.$set(this, 'cloudLabel', '테스트 사이트 접속')
      }
      localStorage.isCloudAccess = Boolean(this.isCloudAccess)
    }
  },
  methods: {
    login () {
      this.$ajax.isSetHeader = false
      this.$ajax.url = selectConfig.login.url; // '/auth/login'
      this.$ajax.isAuthCheck = true
      this.$ajax.param = this.loginInfo
      let self = this
      this.loading = true
      this.$ajax.requestPost((_result) => {
        self.$ajax.isSetHeader = true;
        jwt.setJwtToken(_result.token);
        // 발급 받은 토큰 유효성 검사
        jwt.checkValidToken((data) => {
          if (data === '' || data === 'undefined') {
            comm.movePage('/');
            return;
          }
          // TODO : 로컬 스토리지에 로그인 사용자 정보 저장(snapshot)
          localStorage.loginInfo = JSON.stringify(this.loginInfo);
          self.getUserInfo(data.userpk);
          // localStorage.userPk = data.userpk
          // window.getApp.$emit('USER_LOGIN', data.userpk)
          // window.getApp.setUserPk(data.userpk)
        });
        // setTimeout(() => { 
        //   this.loading = false
        //   this.$ajax.isAuthCheck = false
        //   this.$ajax.isSetHeader = true
        //   this.$comm.movePage(self.$router, '/dashboard')
        // }, 1000);
      }, (_error) => {
        this.loading = false
        this.$ajax.isAuthCheck = true
        this.$ajax.isSetHeader = false
      })
    },
    btnAutoIdSet() {
      if (this.isCloudAccess) {
        this.loginInfo.tenantId = 'cmmstest'
        this.loginInfo.username = 'cmms1234'
        this.loginInfo.password = 'cmms1234'
      } else {
        this.loginInfo.tenantId = 'yullin'
        this.loginInfo.username = 'cmms'
        this.loginInfo.password = 'yullin@7033'
      }
    },
    /**
     * 사용자 정보를 조회하고 권한 별로 페이지 이동 처리
     */
    getUserInfo(_userPk) {
      if (!_userPk) return;
      this.$ajax.url = selectConfig.userInfo.url + _userPk;
      let self = this;
      this.$ajax.requestGet((_result) => {
        this.loading = false;
        this.$ajax.isAuthCheck = false;
        this.$ajax.isSetHeader = true;
        window.getApp.$emit('USER_LOGIN', _result);
        localStorage.userInfo = JSON.stringify(_result);
        
        // TODO : 사용자 권한에 따라 기본 페이지 표시를 다르게 처리
        if (_result.hasOwnProperty('userTypeCd')) {
          if (_result.userTypeCd === 'UC') this.$comm.movePage(self.$router, '/woList');
          else this.$comm.movePage(self.$router, '/dashboard');
        } else window.alert('[개발자용] 권한 정보가 정상적이지 않습니다. 관리자에게 문의바랍니다.');
      });
    },
  },
  

};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
  .background::after {
    background-image: url('../static/background.jpg');
    background-repeat: no-repeat;
    opacity:0.3!important;
    content:"";
    width:100%;
    height:100%;
    z-index:-1;
    position:absolute;
    top: 0;
    left: 0;
    background-position:center;
    background-origin:content-box;
  }
  .border {
    border: 1px solid #0000ff;
  }
</style>
