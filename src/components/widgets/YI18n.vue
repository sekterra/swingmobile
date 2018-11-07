<!--
목적 : 다국어 지원 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <!-- <span>
    <span 
      v-for="item in nationList"
      :key="item"
      @click.prevent="changeLocale(item)" >
      <country-flag :country='item' :size='size' />
    </span>
  </span> -->
  <!-- 아래 소스는 메뉴 형식의 다국어 선택인데 ios에서 작동하지 않음 -->
    <span>
      <v-menu 
        lazy
        bottom
        origin="center center"
        transition="scale-transition"
        v-model="isOpen">
        <v-btn
          slot="activator"
          small
          dark
          color="indigo"
         >
          <v-icon>
            language
          </v-icon>
           {{locale}}
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="item in nationList"
            :key="item"
            class="ma-0 pa-0"
          >
            <v-list-tile-content @click.prevent="changeLocale(item)">
              <country-flag :country="item" :size='size' />
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
      </v-menu>
    </span>
</template>

<script>
import CountryFlag from 'vue-country-flag'
export default {
  /* attributes: name, components, props, data */
  name: 'y-i18n',
  components: {
    'country-flag': CountryFlag
  },
  props: {
    size: {
      type: String,
      default: 'normal'
    }
  },
  data: () => ({
    nationList: [],
    locale: '',
    isOpen: false
  }),
  watch: {
    locale() {
      window.getApp.$emit('LOCALE_CHANGE', this.locale)
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount() {
     this.nationList = [] 
     for(var key in this.$i18n.messages) {
       this.nationList.push(key)
     }
    //  this.locale = localStorage.locale
    this.locale = window.localStorage.getItem('locale')
  },
  /* methods */
  methods: {
    changeLocale(_locale) {
      window.getApp.$emit('LOCALE_CHANGE', _locale)
      localStorage.locale = _locale
      this.locale = _locale
      window.localStorage.setItem('locale', _locale)
    }
  }
}
</script>

<style>
.border {
  border-color: #3949AB;
}
</style>

