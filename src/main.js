// Import Vue
import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import Login from './Login'
import router from './router'

// TODO : DELETE
import VueNumeric from 'vue-numeric'
import VueNumberInput from '@chenfengyuan/vue-number-input';

import VeeValidate from 'vee-validate';
import VueCordovaDevice from 'vue-cordova-device'
import Truncate from 'lodash.truncate';
import Datepicker from '@/components/Datepicker'
import Ybutton from '@/components/Ybutton'
import 'font-awesome/css/font-awesome.css';

// TODO : global javascript 
import rules from '@/js/rules.js'
import ajax from '@/js/ajax.js'
import 'expose-loader?$!expose-loader?jQuery!jquery'

// Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.use(VueNumeric)
Vue.component(VueNumberInput.name, VueNumberInput);
let component = App

Vue.use(VueCordovaDevice)

console.log(Vue.cordova.device);

// TODO : Global filters
Vue.filter('truncate', Truncate);

// TODO: Global Component
Vue.component(Datepicker.name, Datepicker);
Vue.component(Ybutton.name, Ybutton);

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

// Import App Custom Styles
//import AppStyles from './assets/sass/main.scss'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // short for 'router: router'
  template: '<App/>',
  components: { 
    'App': component
  }
})
