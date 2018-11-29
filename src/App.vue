<!--
파일명 : App.vue
목적 : app 메인 화면
-->
<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app">
        <app-drawer class="app--drawer"></app-drawer>
        <app-toolbar 
          class="app--toolbar" 
          :is-login="isLogin"
          :is-connected="networkInfo.isConnected"
          @openThemeSettings="openThemeSettings">
        </app-toolbar>
        <v-content>
          <!-- Page Header -->
          <!-- TODO : Current Page Direction -->
          <page-header v-if="$route.meta.breadcrumb"></page-header>
          <div class="page-wrapper">      
            <router-view></router-view>
          </div>
           <!-- App Footer -->
          <v-footer height="auto" class="white pa-3 app--footer">
            <span class="caption">swing cmms &copy; {{ new Date().getFullYear() }}</span>
            <v-spacer></v-spacer>
            <span class="caption mr-1"> Yullin Technologies </span>
          </v-footer>
        </v-content>
        
        <!-- Go to top Button-->
        <app-fab></app-fab>
        <!-- theme setting -->
        <!--
          TODO : Floating Theme Setting Icon
           <v-btn small fab dark falt fixed top="top" right="right" class="setting-fab" color="red" @click.prevent="openThemeSettings">
            <v-icon>settings</v-icon>
           </v-btn> 
        -->
        <!--TODO : 테마 설정 -->
        <v-navigation-drawer
          class="setting-drawer"
          temporary
          right
          v-model="rightDrawer"
          hide-overlay
          fixed
          >
          <theme-settings v-if="!isSearchPopup"></theme-settings>
          <y-right-popup v-else></y-right-popup>
        </v-navigation-drawer>
        <!-- 다이얼로그 팝업 등록 -->
        <y-dialog 
          title="test"
          :message="dialog.text"
          :is-open-dialog="dialog.show"
          :type="dialog.type"
          @dialogResult="dialogResult"
          >
        </y-dialog>
        <!-- test -->
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>

    <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon> 
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    
  </div>
</template>

<script>
import AppDrawer from '@/components/AppDrawer';
import AppToolbar from '@/components/AppToolbar';
import AppFab from '@/components/AppFab';
import PageHeader from '@/components/PageHeader';
import menu from '@/api/menu';
import ThemeSettings from '@/components/ThemeSettings';
import AppEvents from  './event';
import CountryFlag from 'vue-country-flag'
import selectConfig from '@/js/selectConfig'
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import $ from 'jquery'
import { setTimeout } from 'timers';
let localeMapper = require('@/locale/localeMapper.json');

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
    ThemeSettings
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,  // right slide popup 오픈 여부
    isSearchPopup: false,  // rightDrawer 구분자, true : 검색용 팝업, false : Theme 설정
    locale: null, // 현재 설정된 언어 locale
    userPk: null,
    userInfo: null,
    document: document,
    snackbar: {
      show: false,
      text: '',
      color: '',
    },
    dialog: {
      show: false,
      text: '',
      type: ''
    },
    needToEmitForConfirm: true, // 사용자의 입력확인 창을 child 컴포넌트로 전달 해야 할지 여부(true: child로 전달, false: App.vue 자체 처리)
    networkInfo: {  // 현재 네트워크 정보
      isConnected: true,
      type: null  // 네트워크 접속 방식(wifi, 4g 등)
    },
    ajaxRequestList: [],  // 백업용 요청 목록
    ajaxFileRequestList: [] // 백업용 파일 요청 목록
  }),
  watch: {
    userPk() {
      this.setUserInfo(this.userPk)
    },
    // 네트워크 상태가 변경되면 상황에 따라 백업 또는 복원처리 한다.
    'networkInfo.isConnected': function () {
      this.networkStatusIsChanged()
    }
  },
  computed: {
    isRetry() {
      return localStorage.ajaxRequestList || localStorage.ajaxFileRequestList
    },
    isLogin() {
      return this.userPk !== null || this.userPk !== ''
    }
  },
  beforeCreate() {
    // TODO : 앱 실행하기 전에 android status bar 숨김, IOS는 xcode의 project 세팅과 info.plist에서 별도 수정줘야 함
    // 참고 url
    // - https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-statusbar/
    // - http://blog.eedler.com/5
    try {
      if (StatusBar) StatusBar.hide()
    } catch (e) {
    }
  },
  created () {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
    this.$ajax.isAuthCheck = false;
    // this.userPk = localStorage.userPk
    window.addEventListener('beforeunload', this.beforeAppClose)
  },
  beforeMount () {
    this.changeLocale(this.$i18n.locale);
    this.$on('LOCALE_CHANGE', (_localeCode) => {
      this.changeLocale(_localeCode);
    });
    this.$on('USER_LOGIN', (_userPk) => {
      console.log(':::::: USER_LOGIN : ' + _userPk)
      this.userPk = _userPk;
      // this.isLogin = true
      // 재 전송할 정보(request 또는 파일)가 남아 있으면 사용자의 처리를 입력 받는다.
      setTimeout(() => {
        // App.vue 자체적으로 사용자의 확인을 받기 위해 false
        this.checkRemainedRequest();
      }, 1000)
    });
    this.$on('APP_KEYBOARD_HIDE', this.hideKeyboard);

    this.document.addEventListener('offline', () => {
      this.networkInfo.isConnected = false
      this.networkInfo.type = null
    })
    this.document.addEventListener('online', () => {
      this.networkInfo.isConnected = true
      this.networkInfo.type = navigator.connection.type
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.$vuetify.goTo(0);
    })

    // 화면이 다시 렌더링 되었을 경우 로그인 유저 처리
    if (localStorage.getItem('userPk')) {
      console.log(':::::: emit USER_LOGIN : ' + localStorage.getItem('userPk'))
      this.$emit('USER_LOGIN', localStorage.getItem('userPk'))
    }
  },
  beforeDestroy () {
    // TODO : remove event listener, 삭제 하지 않으면 이벤트가 중복 발생됨
    // 모든 이벤트 제거:확인필요
    this.$off()
 },
  methods: {
    /**
     *  테마 설정용 right 팝업 오픈
     */
    openThemeSettings () {
      // TODO : scroll top
      this.isSearchPopup = false;
      this.$vuetify.goTo(0);
      this.rightDrawer = (!this.rightDrawer);
    },
    /**
     * 검색용 우측 팝업 오픈
     */
    openRightPopup() {
      this.isSearchPopup = true;
      // this.$vuetify.goTo(0);
      this.rightDrawer = (!this.rightDrawer);
    },
    closeRightPopup() {
      this.isSearchPopup = false;
      // this.$vuetify.goTo(0);
      this.rightDrawer = false;
    },
    /**
     * 언어 설정에 따른 관련 언어들 설정
     */
    changeLocale(_localeCode) {
      var localJson = localeMapper[_localeCode]
      this.locale = localJson
      // moment.js 언어설정
      this.$comm.moment.locale(localJson.moment)
      // locale json 언어설정
      this.$i18n.locale = localJson.language
    },
    dialogResult(_result) {
      if (this.needToEmitForConfirm) this.$emit('APP_CONFIRM_REPLY', _result);
      else {
        // 재 전송 상태인지 여부
        if (localStorage.ajaxRequestList || localStorage.ajaxFileRequestList) {
          if (_result) this.allRequestRetry()
          else this.initAllReqest()
        }
      }
      // 사용자의 입력을 부모값으로 전달할 수 있도록 초기화(true)
      this.needToEmitForConfirm = true;
      // TODO : 반드시 추가할 것(추가하지 않으면 팝업창이 다시 활성화 되지 않음)
      this.dialog.show = false
    },
    setUserPk(_userPk) {
      this.userPk = _userPk
    },
    setUserInfo() {
      if (!this.userPk) return
      this.$ajax.url = selectConfig.userInfo.url + this.userPk
      let self = this
      this.$ajax.requestGet((_result) => {
        self.userInfo = _result
      })
    },
    getUserInfo() {
      return this.userInfo
    },
    hideKeyboard() {
      // IOS, Android 둘 다 정상적으로 동작
      if (Keyboard && typeof Keyboard.hide === 'function') Keyboard.hide()
    },
    // TEST
    // swipeAtEnd() {
    //   this.$emit('APP_REQUEST_SUCCESS', 'Swipe!!! Reach End');
    // },
    // swipeUp() {
    //   this.$emit('APP_REQUEST_SUCCESS', 'Swipe!!! Up');
    // },
    // 현재의 네트워크 상태를 반환
    getNetworkConnection() {
      return this.networkInfo.isConnected
    },
    // ajax 요청을 백업해둔다.
    addAjaxRequest(_ajaxInfo) {
      if (!this.isLogin) return
      this.ajaxRequestList.push(_ajaxInfo)
    },
    // 파일 업로드 요청을 백업해둔다.
    addAjaxFileRequest(_ajaxInfo) {
      if (!this.isLogin) return
      this.ajaxFileRequestList.push(_ajaxInfo)
    },
    // ajax 요청 성공시 백업해둔 요청을 삭제
    removeAjaxRequest(_ajaxPid) {
      var filter = this.ajaxRequestList.filter((_item) => {
        return _item.ajaxPid !== _ajaxPid
      })
      this.ajaxRequestList = filter
    },
    // 파일 업로드 성공시 백업해둔 파일 정보 삭제
    removeAjaxFileRequest(_pid) {
      var filter = this.ajaxFileRequestList.filter((_item) => {
        return _item.pid !== _pid
      })
      this.ajaxFileRequestList = filter
    },
    /**
     * 네트워크 상태가 변경되면 상황에 따라 업로드 또는 백업처리
     */
    networkStatusIsChanged() {
      // 툴바에 네트워크 변경 사항을 알림(icon 변경)
      this.$emit('NETWORK_STATUS_CHANGED', this.networkInfo.isConnected)

      // 네트워크가 다시 연결될 경우, request, fileupload 처리
      if (this.networkInfo.isConnected) {
        var test = (localStorage.ajaxRequestList || localStorage.ajaxFileRequestList)
        this.$emit('APP_REQUEST_SUCCESS', this.$t('message.internetConnected')  + ' : ' + test);
        // 재 전송할 정보(request 또는 파일)가 남아 있으면 사용자의 처리를 입력 받는다.
        if (this.userPk) {
          this.checkRemainedRequest();
          // App.vue 자체적으로 사용자의 확인을 받기 위해 false 처리
          // this.needToEmitForConfirm = false;
          // this.$emit('APP_CONFIRM', this.$t('message.requestsRemained'));
        }
      // 네트워크가 연결이 끊어졌을 경우 로컬 스토리지에 백업
      } else {
        this.$emit('APP_REQUEST_ERROR', this.$t('message.internetDisconnected'));
        this.backupAjaxRequest()
        this.backupAjaxFileRequest()
      }
    },
    /**
     * 업무/파일 업로드 요청이 있는지 확인하고,
     * 있을 경우 사용자의 입력을 통해 처리한다.
     */
    checkRemainedRequest() {
       // App.vue 자체적으로 사용자의 확인을 받기 위해 false
      if (localStorage.ajaxRequestList || localStorage.ajaxFileRequestList) {
        try {
          this.needToEmitForConfirm = false;
          var ajaxRequestList = []
          var ajaxFileRequestList = []
          var msg = this.$t('message.requestsRemained')
          if (localStorage.ajaxRequestList) {
            ajaxRequestList = JSON.parse(localStorage.ajaxRequestList);
            msg += '<br/>' + this.$('title.workRequestCount') + ': ' + ajaxRequestList.length;
          }
          if (localStorage.ajaxFileRequestList) {
            ajaxFileRequestList = JSON.parse(localStorage.ajaxFileRequestList);
            msg += '<br/>' + this.$t('title.fileRequestCount') + ': ' + ajaxFileRequestList.length;
          }          
          this.$emit('APP_CONFIRM', msg);
        } catch(e) {
          window.alert(e.message)
        }
      }
    },
    /**
     * ajax 요청 / 파일 업로드 요청을 재 전송 처리
     */
    allRequestRetry() {
      this.retryAjaxRequest()
      this.retryAjaxFileRequest()
    },
    /**
     * 사용자가 재 처리를 원하지 않거나, 재 처리 완료 후
     * ajax 요청 / 파일 업로드 요청을 초기화
     */
    initAllReqest() {
      this.ajaxRequestList = [];
      this.ajaxFileRequestList = [];
      localStorage.removeItem('ajaxRequestList');
      localStorage.removeItem('ajaxFileRequestList');
    },
    /**
     * 네트워크 재연결시 ajax 요청 재실시
     */
    retryAjaxRequest() {
      try {
        if (!localStorage.ajaxRequestList) return
          var ajaxRequestList = JSON.parse(localStorage.ajaxRequestList)
          $.each(ajaxRequestList, (_i, _item) => {
            this.$ajax.url = _item.url
            this.$ajax.param = _item.param
            this.$ajax.isRetry = true

            if (_item.type === 'POST') this.$ajax.requestPost()
            else if (_item.type === 'PUT') this.$ajax.requestPut()
          })
          // 재요청은 1회만 한다.
          this.ajaxRequestList = []
          localStorage.removeItem('ajaxRequestList');
        } catch (e) {
          window.alert(e.message)
        }
    },
    /**
     * 네트워크 연결이 끊어졌을 경우 ajax 요청 재실시
     */
    backupAjaxRequest() {
      localStorage.removeItem('ajaxRequestList');
      if (this.ajaxRequestList.length > 0) localStorage.ajaxRequestList = JSON.stringify(this.ajaxRequestList)
    },
    /**
     * 네트워크 연결시 파일업로드 요청 재실시
     */
    retryAjaxFileRequest() {
      try {
        if (!localStorage.ajaxFileRequestList) return
          var ajaxRequestList = JSON.parse(localStorage.ajaxFileRequestList)
          $.each(ajaxRequestList, (_i, _item) => {
            _item.fileInfo.isRetry = true
            this.$emit('APP_IMAGE_UPLOAD', _item.fileInfo);
          })
          // 재요청은 1회만 한다.
          this.ajaxFileRequestList = []
          localStorage.removeItem('ajaxFileRequestList');
        } catch (e) {
          window.alert(e.message)
        }
    },
    /**
     * 네트워크 연결이 끊어졌을 경우 파일업로드 정보 백업
     */
    backupAjaxFileRequest() {
      localStorage.removeItem('ajaxFileRequestList');
      if (this.ajaxFileRequestList.length > 0) localStorage.ajaxFileRequestList = JSON.stringify(this.ajaxFileRequestList)
    },
    /**
     * 앱 또는 브라우저가 종료되기 전에 해야할 작업
     */
    beforeAppClose() {
      localStorage.removeItem('userPk');
    }
  },
};
</script>

<style lang="stylus" scoped>
  .setting-fab 
    top:50%!important; 
    right:0;
    border-radius:0  
  .page-wrapper
    min-height:calc(100vh - 64px - 50px - 81px );
  .border
    border: 1px solid #0000ff;
</style>
