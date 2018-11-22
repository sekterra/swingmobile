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
           <v-btn small fab dark falt fixed top="top" right="right" class="setting-fab" color="red" @click="openThemeSettings">
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
    <y-dialog 
      title="test"
      :message="dialog.text"
      :is-open-dialog="dialog.show"
      :type="dialog.type"
      @dialogResult="dialogResult"
      >
    </y-dialog>
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
    isLogin: false,
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
  }),
  watch: {
    userPk() {
      this.setUserInfo(this.userPk)
    }
  },
  computed: {
  },
  beforeCreate() {
    // TODO : 앱 실행하기 전에 android / ios status bar 숨김
    StatusBar.hide()
  },
  created () {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
    this.$ajax.isAuthCheck = false;
    // this.userPk = localStorage.userPk
  },
  beforeMount () {
    this.changeLocale(this.$i18n.locale);
    this.$on('LOCALE_CHANGE', (_localeCode) => {
      this.changeLocale(_localeCode);
    });
    this.$on('USER_LOGIN', (_userPk) => {
      this.userPk = _userPk;
      this.isLogin = true
    });
    this.$on('APP_KEYBOARD_HIDE', () => {
      this.hideKeyboard()
    })

    this.document.addEventListener('offline', () => {
      // window.alert(':::::::::::::: network information offline ::::::::::::::::')
    })
    this.document.addEventListener('online', () => {
      // window.alert(':::::::::::::: network information online ::::::::::::::::')
    })
  },
  mounted() {
    this.$vuetify.goTo(0);
    // this.userPk = localStorage.userPk;
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
      this.$emit('APP_CONFIRM_REPLY', _result);
      // TODO : 반드시 추가할 것(추가하지 않으면 팝업창이 다시 활성화 되지 않음)
      this.dialog.show = false
    },
    setUserPk(_userPk) {
      this.userPk = _userPk
    },
    setUserInfo() {
      console.log('this.userPk:' + this.userPk)
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
    swipeAtEnd() {
      this.$emit('APP_REQUEST_SUCCESS', 'Swipe!!! Reach End');
    },
    swipeUp() {
      this.$emit('APP_REQUEST_SUCCESS', 'Swipe!!! Up');
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
