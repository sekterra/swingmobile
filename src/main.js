// Import Vue
import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import Login from '@/pages/Login'
import router from './router'

// TODO : global node_modules
import _ from 'lodash/core'
import VueI18n from 'vue-i18n';
var krLanguages = require('@/locale/kr.json');
var usLanguages = require('@/locale/us.json');
// var localeMapper = require('@/locale/localeMapper.json');
const i18nData = Object.assign({},krLanguages, usLanguages);

// TODO : DELETE
import VueNumeric from 'vue-numeric'
import VueNumberInput from '@chenfengyuan/vue-number-input';

import VeeValidate from 'vee-validate';
import VueCordovaDevice from 'vue-cordova-device'
import Truncate from 'lodash.truncate';
import 'font-awesome/css/font-awesome.css';
import fullCalendar from "vue-full-calendar";
import "fullcalendar/dist/fullcalendar.min.css";

// TODO : global components imports
import YButton from '@/components/widgets/YButton'
import YDatepicker from '@/components/widgets/YDatepicker'
import YExpandSearch from '@/components/widgets/YExpandSearch'
import YDataTable from '@/components/widgets/YDataTable'
import YSelect from '@/components/widgets/YSelect'
import YDialog from '@/components/widgets/YDialog'
import YPopup from '@/components/widgets/popup/YPopup'
import YEquipmentCard from '@/components/widgets/YEquipmentCard'
import YChip from '@/components/widgets/YChip'
import YBadge from '@/components/widgets/YBadge'
import YText from '@/components/widgets/YText'
import YTextarea from '@/components/widgets/YTextarea'
import YTimepicker from '@/components/widgets/YTimepicker'
import YInspectionDetail from '@/components/widgets/YInspectionDetail'

// TODO : global javascript imports
import rules from '@/js/rules.js'
import ajax from '@/js/ajax.js'
import comm from '@/js/common.js'
// import 'expose-loader?$!expose-loader?jQuery!jquery'

// Vue.use(Vuetify)
Vue.config.productionTip = false

var thisLocale = window.localStorage.getItem('locale') ? window.localStorage.getItem('locale') : 'kr'
// var datepickerLocale = localeMapper[thisLocale]

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: thisLocale, // 기본언어는 ko로 유지하지만 브라우저 언어를 체크해서 변경
  messages: i18nData
});

Vue.use(VueNumeric)
// Vue.use(CountryFlag)
Vue.component(VueNumberInput.name, VueNumberInput);

Vue.use(fullCalendar);
// TODO : Set the first page
let component = App

Vue.use(VueCordovaDevice)

console.log(Vue.cordova.device);

// TODO : Global filters
Vue.filter('truncate', Truncate);

// TODO: Global Custom Component
Vue.component(YDatepicker.name, YDatepicker);
Vue.component(YButton.name, YButton);
Vue.component(YExpandSearch.name, YExpandSearch);
Vue.component(YDataTable.name, YDataTable);
Vue.component(YSelect.name, YSelect);
Vue.component(YDialog.name, YDialog);
Vue.component(YPopup.name, YPopup);
Vue.component(YEquipmentCard.name, YEquipmentCard);
Vue.component(YChip.name, YChip);
Vue.component(YBadge.name, YBadge);
Vue.component(YText.name, YText);
Vue.component(YTextarea.name, YTextarea);
Vue.component(YTimepicker.name, YTimepicker);
Vue.component(YInspectionDetail.name, YInspectionDetail);


// TODO : Global
Vue.use(VeeValidate, { fieldsBagName: 'formFields' });
Vue.use(Vuetify, {
  // theme: {
  //   primary: colors.indigo.base, // #E53935
  //   secondary: colors.indigo.lighten4, // #FFCDD2
  //   accent: colors.indigo.base // #3F51B5
  // },
  options: {
    themeVariations: ['primary', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: 'primary',
      },
      sideToolbar: {
      },
      sideNav: 'primary',
      mainNav: 'primary lighten-1',
      bodyBg: '',
    }
  }
});
// Bootstrap application components

// 전역 js 변수 추가
Vue.prototype.$rules = rules
Vue.prototype.$ajax = ajax
Vue.prototype.$comm = comm

// Import App Custom Styles
//import AppStyles from './assets/sass/main.scss'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n: i18n,
  // localeMapper: localeMapper,
  router, // short for 'router: router'
  template: '<App/>',
  components: { 
    'App': component
  }
})

// document.addEventListener("deviceready", onDeviceReady, false);
// function onDeviceReady() {
//     console.log(navigator.globalization);
// }